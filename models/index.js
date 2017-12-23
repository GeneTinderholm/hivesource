let mongoose = require('mongoose');
let bluebird = require('bluebird');

mongoose.Promise = bluebird;

let models = {};

models.User = require('./User');
models.Project = require('./Project');
models.Task = require('./Task');

module.exports = models;

