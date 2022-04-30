require("dotenv").config();
const express = require("express");
const ConnectDB = require("./DB/connect");
const app = express();
const router = require("./Routes/Tasks");
const notFound = require("./Middlewares/notFound");
const errorHandlerMiddleware = require("./Middlewares/errorHandler");

const port = process.env.PORT || 3000;

// Middlewares
app.use(express.static("./public"));
app.use(express.json());
// routes
app.use("/api/v1/tasks", router);
// invalid route middleware
app.use(notFound);
// Middleware for catch block of asyncWrapper
app.use(errorHandlerMiddleware);

// app.get("/hello", (req, res) => {
//   res.send("Task Manager App");
// });

const start = async () => {
  try {
    await ConnectDB(process.env.MONGO_URI); // server starts only when we gets connected to databse.
    app.listen(port, () =>
      console.log(`Server is Listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
