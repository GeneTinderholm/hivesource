var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let models = require('./../models');
let Project = mongoose.model('Project');
let User = mongoose.model('User');
let Tasks = mongoose.model('Task');

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id).populate("projects").populate({path:"tasks"})
    .then(user => {
      // user.date = 
      let userMod = {
        id: user.id,
        username: user.username,
        date: user.date.toString().substring(4,15),
        projects: user.projects,
        tasks: user.tasks
      }
      res.render('users/single', {user: userMod});
    })
    .catch(error => {
      next(error);
    });

})

module.exports = router;
