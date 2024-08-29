const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserGroupSchema = new Schema({
  user_group_type: {
    type: String,
    required: true
  },
  privileges: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'groupprivileges',
    required: true
  }]
});
// module.exports = User = mongoose.model("users", UserSchema);
const UserGroup = mongoose.model("usergroups", UserGroupSchema);
module.exports = UserGroup;