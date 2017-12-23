const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const ProjectSchema = Schema({
  name: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

ProjectSchema.plugin(uniqueValidator);

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;

