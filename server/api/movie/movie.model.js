'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var MovieSchema = new mongoose.Schema({
  image: String,
  name: String,
  production: String,
  releaseDate: String,
  stars: String,
  rating: Number,
  genre: String,
  language: String,
  active: Boolean,
  updatedAt: String,
  createdAt: String,
  modifiedBy: String
});

export default mongoose.model('Movie', MovieSchema);
