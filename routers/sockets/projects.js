let mongoose = require('mongoose');
let models = require('../../models');
let Project = mongoose.model('Project');
let Task = mongoose.model('Task');
let User = mongoose.model('User');

//----------------------------------------
//Websockets for products
//----------------------------------------

module.exports = io => {

  const projectsIo = io.of('/projects');

  projectsIo.on('connection', socket => {
    console.log('a user connected with id %s', socket.id);
    socket.emit('success', 'success');
    socket.on('room', room => {
      console.log(room);
      socket.join(room);
      socket.emit('roomSuccess', room);
    });
    socket.on('newTask', async newTask => {
      let project = await Project.findById(newTask.projectId);
      let task = new Task();
      task.name = newTask.name;
      task.project = newTask.projectId;
      task.users = [];
      if(newTask.includeUser){
        task.users.push(newTask.userId);
      }
      project.tasks.push(task.id);
      await task.save();
      popTask = await Task.findById(task.id).populate("users");
      await Project.findByIdAndUpdate(newTask.projectId, project);
      projectsIo.in(newTask.projectId).emit('taskUpdate', popTask); 

    });
    socket.on('volunteer', async volunteer => {
      console.log(volunteer);
      let task = await Task.findById(volunteer.taskId);
      let project = await Project.findById(task.project);
      let userCheck = 0;
      for(let i=0; i<task.users.length; i++){
        if(task.users[i].toString() === volunteer.userId){
          userCheck = 1;
        }
      }
      if(!userCheck){
        let user = await User.findById(volunteer.userId);
        task.users.push(user._id);
        await Task.findByIdAndUpdate(task.id, task);
        let projectCheck = 0;
        for(let i=0; i<project.users.length; i++){
          if(project.users[i].toString() === volunteer.userId){
            projectCheck = 1;
          }
        }
        if(!projectCheck){
          project.users.push
          await Project.findByIdAndUpdate(project.id, project);
        }
        let newVolunteer = {
          taskId: task.id,
          user: user
        }
        projectsIo.in(project.id).emit('newVolunteer', user)
      }


      // if(task.users.includes(user._id)){
      //   console.log('1');
      // }
    });
  });
};
