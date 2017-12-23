const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = Schema({
  name: { type: String, required: true},
  date: { type: Date, default: Date.now },
  project: {type: Schema.Types.ObjectId, ref: 'Project'},
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;


