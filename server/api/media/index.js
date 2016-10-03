'use strict';
import * as auth from '../../auth/auth.service';
var express = require('express');
var controller = require('./media.controller');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var router = express.Router();
router.use(multiparty({ uploadDir: './client/uploads' }));

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), multipartyMiddleware, controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
