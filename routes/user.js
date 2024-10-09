const express = require("express");

const router = express.Router();

const User = require("./user.model");

router.post("/sign-in", function (request, response) {
  console.log(request.body);

  User
    .findOne({ email: request.body.email })
    .then(function () {
      return (
        response
          .status()
          .json({
            success: true
          })
      );
  });
});

module.exports = router;