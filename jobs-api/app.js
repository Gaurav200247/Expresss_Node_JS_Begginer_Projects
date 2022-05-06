require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// security packages
const cors = require("cors");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
const xss = require("xss-clean");

// swagger
// const swaggerUI = require('swagger-ui-express')
// const YAML = require('yamljs');

// imports
const connectDB = require("./DB/connect");
const notFoundMiddleware = require("./Middlewares/notFound");
const errorHandlerMiddleware = require("./Middlewares/errorHandler");
const authRouter = require("./Routes/auth");
const jobsRouter = require("./Routes/jobs");
const auth = require("./Middlewares/auth");

// setting proxy to 1
app.set("trust proxy", 1);
// rate limitter
app.use(
  rateLimiter({
    windowMS: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
// Middlewares
app.use(express.json());

// Extra Packages for api security
app.use(cors());
app.use(helmet());
app.use(xss());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", auth, jobsRouter);

// Our Middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`Listening on Port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
