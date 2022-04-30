const Tasks = require("../Models/Task");
const asyncWrapper = require("../Middlewares/async");
const { createCustomError } = require("../Errors/CustomError");

// *****************************************************************

const getAllTasks = asyncWrapper(async (req, res) => {
  //using asyncwrapper to make code less redundant
  const tasks = await Tasks.find();
  res.status(201).json({ nbHits: tasks.length, tasks });
});

// *****************************************************************

const createTask = asyncWrapper(async (req, res) => {
  //function should be async
  const task = await Tasks.create(req.body);
  // Task.create(req.body) create a document in collection with the given data in body.
  res.status(201).json({ task });
});

// *****************************************************************

const getTask = asyncWrapper(async (req, res, next) => {
  const ID = req.params.id;
  const task = await Tasks.findOne({ _id: ID });

  if (!task) {
    return next(createCustomError(`No Task with Id : ${ID}`, 404));
    // return res.status(404).json({ msg: `No Task with Id : ${ID}` });
  }

  res.status(201).json(task);
});

// *****************************************************************

const deleteTask = asyncWrapper(async (req, res, next) => {
  const ID = req.params.id;
  const task = await Tasks.findOneAndDelete({ _id: ID });

  if (!task) {
    return next(createCustomError(`No Task with Id : ${ID}`, 404));
  }

  res.status(201).json({ task, status: "success" });
});

// *****************************************************************

const updateTask = asyncWrapper(async (req, res, next) => {
  const ID = req.params.id;
  const body = req.body;

  const task = await Tasks.findOneAndUpdate({ _id: ID }, body, {
    new: true, //returns new updated data
    runValidators: true, // makes validators work after update
  });

  if (!task) {
    return next(createCustomError(`No Task with Id : ${ID}`, 404));
  }

  res.status(201).json({ status: "success", task });
});

// Contains old try-catch code for reference
const editTask = async (req, res) => {
  try {
    const ID = req.params.id;
    const body = req.body;
    const task = await Tasks.findOneAndUpdate({ _id: ID }, body, {
      new: true,
      runValidators: true,
      overwrite: true,
    });

    if (!task) {
      return res.status(404).json({ msg: `No task exist with id : ${ID}` });
    }

    res.status(201).json({ status: "success", task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
};
