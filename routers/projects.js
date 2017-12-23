var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let models = require('./../models');
let Project = mongoose.model('Project');

router.get('/', function(req, res) {
  Project.find({})
    .then(projects => {
      res.render('projects/index', {projects});
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get('/new', (req, res) => {
  res.render('projects/new');
});

router.get('/:id', (req, res) => {
  const user = req.user;
  Project.findById(req.params.id).populate({path:"tasks",populate: {path:"users", model:"User"}}).populate("users")
    .then(project => {
      console.log(project);
      
      res.render('projects/show', {project, user});
    })
    .catch(e => res.status(500).send(e.stack));
});

router.post('/', (req, res) => {
  console.log(req.body);
  var user = req.user;
  const project = new Project({
    name: req.body.project.name,
    users: [user.id],
    tasks: []
  });

  project
    .save()
    .then(user => {
      res.redirect(`/projects/${project.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

router.delete('/:id', (req, res) => {
  Project.findByIdAndRemove(req.params.id)
    .then(() => {
      req.method = 'GET';
      res.redirect('/projects');
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get('/:id/edit', (req, res) => {
  Project.findById(req.params.id)
    .then(project => {
      res.render('projects/edit', {project});
    })
    .catch(e => res.status(500).send(e.stack));
});

router.put('/:id', (req, res) => {
  var projectParams = {
    name: req.body.project.name,
  };

  Project.findByIdAndUpdate(req.params.id, projectParams)
    .then(project => {
      req.method = 'GET';
      res.redirect(`/projects/${project.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});



module.exports = router;
