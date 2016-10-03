'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TaskSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  image: String,
  category: String,
  updatedAt: String,
  createdAt: String,
  modifiedBy: String
});

export default mongoose.model('Task', TaskSchema);
