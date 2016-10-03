'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import async from 'async';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
var sgTransport = require('nodemailer-sendgrid-transport');
import _ from 'lodash';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    console.log(entity,updates,updated);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

// Reset password route
export function reset(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          return res.status(422).json({'message': 'Password reset token is invalid or has expired.'});
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.saveAsync()
          .then(() => {
            // res.status(204).end();
              // console.log('next async', done);
              // username + password
              var options = {
                  auth: {
                    //   api_user: process.env.SENDGRID_USERNAME,
                    //   api_key: process.env.SENDGRID_PASSWORD
                         api_key: process.env.SENDGRID_APIKEY

                  }
              }

              var mailer = nodemailer.createTransport(sgTransport(options));
            //   var mailer = nodemailer.createTransport('smtps://'+process.env.EMAIL_ID+':'+process.env.EMAIL_PASSWORD+'@smtp.gmail.com');


              var mailOptions = {
                to: user.email,
                from: 'passwordreset@codenx.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                  'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
              };
              mailer.sendMail(mailOptions, function(err) {
                return res.status(200).json({'message': 'Success! Your password has been changed.'});
              });
          })
          .catch(validationError(res));

        // user.save(function(err) {

          // return res.status(200);
          // req.logIn(user, function(err) {
          //   console.log('save err', err);
          // });
        // });
      });
    }
  ], function(err) {
    if (err) return next(err);
  });
}

// Forgot password route
export function forgot(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email })
      .then(user => {
    //   var newUser = new User(user);
        // user = user.toObject();
        if (!user) {
          return res.status(422).json({'message': 'No account with that email address exists.'});
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      // username + password
      var options = {
          auth: {
            //   api_user: process.env.SENDGRID_USERNAME,
            //   api_key: process.env.SENDGRID_PASSWORD
                 api_key: process.env.SENDGRID_APIKEY

          }
      }

      var mailer = nodemailer.createTransport(sgTransport(options));
    //   var mailer = nodemailer.createTransport('smtps://'+process.env.EMAIL_ID+':'+process.env.EMAIL_PASSWORD+'@smtp.gmail.com');

      var mailOptions = {
        to: user.email,
        from: 'passwordreset@codenx.com',
        subject: 'CRUD Table Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      mailer.sendMail(mailOptions, function(err) {
        return res.status(201).json({'message': 'An e-mail has been sent to ' + user.email + ' with further instructions.'});
      });
    }
  ], function(err) {
    if (err) return next(err);
  });
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.find({}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return User.findById(userId).exec()
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

// Updates an existing Thing in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  User.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}
