//Source: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
// Another Source: https://medium.com/swlh/user-authentication-using-mern-stack-part-1-backend-cd4d193f15b1
// Another Source: https://dev.to/salarc123/mern-stack-authentication-tutorial-part-1-the-backend-1c57
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
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
  user_type: { // admin or builder; determines permissions
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
// module.exports = User = mongoose.model("users", UserSchema);
const User = mongoose.model("users", UserSchema);
module.exports = User;