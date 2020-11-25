const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Todo = new Schema({
  todo_description: {
    type: String,
  },
  todo_responsable: {
    type: String,
  },
  todo_priorite: {
    type: String,
  },
  todo_completed: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Todo", Todo);
