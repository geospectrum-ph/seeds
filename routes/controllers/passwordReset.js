// 18 Sept 2021
// Source: https://dev.to/jahangeer/how-to-implement-password-reset-via-email-in-node-js-132m
const User = require('../../models/user.model');
const Token = require('../../models/token.model');
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send("user with given email doesn't exist");

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
    }
    const link = `${process.env.BASE_URL}/passwordreset/${user._id}/${token.token}`; // for AWS // NOTE: CHANGE THIS WHEN PUSHING TO AWS CLOUD (STAGING)

    await sendEmail(user.email, "Password reset", link);

    res.send("password reset link sent to your email account");
  } catch (error) {
    res.send("An error occured");
    // console.log(error);
  }
});

router.post("/:userId/:token", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("invalid link or expired");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link or expired");

    let password = req.body.password;

    bcrypt.genSalt(10, function(err, salt) { 
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) throw err;
        user.password = hash;
        token.delete();
        user.save().then(response => {
          res.status(200).json({
            success: true,
            result: response
          })
        }).catch(err => {
          res.status(500).json({
            errors: [{ error: err }]
          });
        });
      });
    });
        
  } catch (error) {
    res.send("An error occured");
    // console.log(error);
  }
});

module.exports = router;