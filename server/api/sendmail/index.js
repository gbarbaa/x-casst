'use strict';

var express = require('express');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var router = express.Router();
router.post('/', function(req, res){
  // create reusable transporter object using the default SMTP transport
//   var mailer = nodemailer.createTransport('smtps://'+process.env.EMAIL_ID+':'+process.env.EMAIL_PASSWORD+'@smtp.gmail.com');
    var options = {
        auth: {
            // api_user: process.env.SENDGRID_USERNAME,
            // api_key: process.env.SENDGRID_PASSWORD
            api_key: process.env.SENDGRID_APIKEY
        }
    }

    var mailer = nodemailer.createTransport(sgTransport(options));
    mailer.sendMail(req.body, function(error, info){
        if(error){
            res.status('401').json({err: info});
        }else{
            res.status('200').json({success: true});
        }
    });
});

module.exports = router;
