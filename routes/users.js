const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = mongoose.model("users", new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
}));


router.post("/sign-in", function (request, response) {
  console.log(request.body);

  User
    .findOne({ email: request.body.email })
    .then(function (test) {
      console.log(test);
      
      return (
        response
          .status(404)
          .json({
            success: true
          })
      );
  });
});

module.exports = router;