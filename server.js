const mongoose = require("mongoose");

require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(function () {
    console.log(`The MongoDB database connection has been established successfully.`);
  })
  .catch(function (error) {
    throw (error);
  });

mongoose
  .connection
    .once("open", function () {
      const express = require("express");
      const app = express();

      const cors = require("cors");
      app.use(cors());

      const user_router = require("./routes/user");
      app.use("/user", user_router);

      const path = require("path");

      app.use(express.static(path.join(__dirname, "client/dist")));

      app.get("*", function (_request, response) {
        response.sendFile(path.join(__dirname, "/client/dist/index.html"));
      });

      app.listen(process.env.PORT, function () {
        console.log(`The server is running on port: ${ process.env.PORT }.`);
      });
    });

// mongoose
//   .disconnect()
//   .then(function () {
//     console.log(`The MongoDB database connection has been terminated successfully.`);
//   })
//   .catch(function (error) {
//     throw (error);
//   });