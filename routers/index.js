var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let models = require('./../models');
let Project = mongoose.model('Project');

router.get('/', async (req, res, next) => {
  const user = req.user;
  console.log('user projects --> ', user.projects)
  const projects = await Project.find( {_id: {$in: user.projects}} );
  console.log("projects -->  \n", projects);
  res.render('welcome/index', {user, projects});
});

module.exports = router;

