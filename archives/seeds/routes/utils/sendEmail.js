// 18 Sept 2021
// Forgot password 
// Source: https://dev.to/jahangeer/how-to-implement-password-reset-via-email-in-node-js-132m

// email services suported by nodemailer
// https://nodemailer.com/smtp/well-known/

// 535-5.7.8 Username and Password not accepted
// https://stackoverflow.com/questions/23137012/535-5-7-8-username-and-password-not-accepted
// https://www.google.com/settings/security/lesssecureapps
// less secure apps: on
// used info@geospectrum.com.ph to change seeds@geospectrum.com.ph access


////////////////////

const nodemailer = require("nodemailer")
const AWS = require("aws-sdk")

// configure AWS SDK
AWS.config.update({
  accessKeyId: "AKIA4FQ66JLRWYPEM7AD",
  secretAccessKey: "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",
  region: "us-east-1",
});


const sendEmail = async (email, subject, text) => {

  try {      
    // create Nodemailer SES transporter
    const transporter = nodemailer.createTransport({
      SES: new AWS.SES({
        apiVersion: '2010-12-01'
      })
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });

    // console.log("email sent sucessfully");

  } catch (error) {
      // console.log(error, "email not sent");
  }
};

module.exports = sendEmail;