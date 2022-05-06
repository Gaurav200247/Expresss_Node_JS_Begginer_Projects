const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getSingleJob,
  CreateJob,
  UpdateJob,
  DeleteJob,
} = require("../Controllers/jobs");

router.route("/").get(getAllJobs).post(CreateJob);
router.route("/:id").get(getSingleJob).patch(UpdateJob).delete(DeleteJob);

module.exports = router;
