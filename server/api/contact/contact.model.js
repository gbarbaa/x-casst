'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ContactSchema = new mongoose.Schema({
  name: String,
  photo: String,
  email: String,
  phone: String,
  category: String,
  active: Boolean,
  updatedAt: String,
  createdAt: String,
  modifiedBy: String
});

export default mongoose.model('Contact', ContactSchema);
