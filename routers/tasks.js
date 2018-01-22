var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let models = require('./../models');
let Project = mongoose.model('Project');
let User = mongoose.model('User');
let Task = mongoose.model('Task');

router.get('/', function(req, res) {
  res.redirect('/projects');
});

router.get('/:id', (req, res) => {
    const user = req.user;
    Task.findById(req.params.id).populate("users")
      .then(task => {
              console.log(task);
              
              res.render('tasks/show', {task, user});
            })
      .catch(e => res.status(500).send(e.stack));
});

module.exports = router;
