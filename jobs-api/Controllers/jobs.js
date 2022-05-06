const { StatusCodes } = require("http-status-codes");
const Jobs = require("../Models/Jobs");
const { BadRequest, notFound } = require("../Errors");

const getAllJobs = async (req, res) => {
  const jobs = await Jobs.find({ createdBy: req.user.userID }).sort(
    "createdBy"
  );
  res.status(StatusCodes.OK).json({ Jobs_Count: jobs.length, jobs });
};

// ---------------------------------------------------------------------------------

const getSingleJob = async (req, res) => {
  const {
    user: { userID },
    params: { id: jobId },
  } = req; // nested destructuring

  const job = await Jobs.findOne({
    _id: jobId,
    createdBy: userID,
  });

  if (!job) {
    throw new notFound(`Job with id : ${jobId} not found !!`);
  }

  res.status(StatusCodes.OK).json({ job });
};

// ---------------------------------------------------------------------------------

const CreateJob = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const job = await Jobs.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// ---------------------------------------------------------------------------------

const UpdateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userID },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequest("Please provide valid company and position");
  }

  const job = await Jobs.findByIdAndUpdate(
    { _id: jobId, createdBy: userID },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new notFound(`Job with id : ${jobId} not found !!`);
  }

  res.status(StatusCodes.OK).json({ success: true, job });
};

// ---------------------------------------------------------------------------------

const DeleteJob = async (req, res) => {
  const {
    user: { userID },
    params: { id: jobId },
  } = req;
  const job = await Jobs.findByIdAndRemove({ _id: jobId, createdBy: userID });
  if (!job) {
    throw new notFound(`Job with id : ${jobId} not found !!`);
  }

  res.status(StatusCodes.OK).json({ success: true, job });
};

module.exports = { getAllJobs, getSingleJob, CreateJob, UpdateJob, DeleteJob };
