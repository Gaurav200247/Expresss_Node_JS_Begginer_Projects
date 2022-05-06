const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: {
        values: ["interview", "declined", "pending"],
        message: "{VALUE} is not valid",
      },
      default: "pending",
    },
    createdBy: {
      // this schema property is used to tell which user has this job (created / owned).
      type: mongoose.Types.ObjectId, // means that the property type is a mongoDb schema model
      // ObjectId tells us that value to stored in createdBy is _id of schema's document
      ref: "User", // "User" is the model to which we want to give reference.
      required: [true, "Please provide the User"],
    },
  },
  { timestamps: true } //When you enable timestamps, Mongoose adds createdAt and updatedAt properties to your schema. We used it here to make filters in future.
);

module.exports = mongoose.model("Jobs", JobsSchema);
