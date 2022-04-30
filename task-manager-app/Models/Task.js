const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must Provide a name"],
    trim: true,
    maxlength: [20, "Name can NOT be more than 20 Characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("AllTasks", TaskSchema);
// In Json, a DB contains many models/Collections/documents
// and each model/collection has its own schema

// Here, AllTasks is the name of the model/collection and TaskSchema is its Schema Design we created here.
