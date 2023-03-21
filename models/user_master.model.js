const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserMasterSchema = new Schema({
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
  user_type: {
    type: mongoose.Schema.Types.ObjectId, ref: 'usergroups',
    required: true
  },
  createdby_userid : {
    type: String,
    required: true
  },
  date: { 
    type: Date,
    default: Date.now
  }
});
// module.exports = User = mongoose.model("users", UserSchema);
const UserMaster = mongoose.model("usersmaster", UserMasterSchema);
module.exports = UserMaster;