const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserGroupPermissionSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'users',
    required: true
  },
  privileges: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'userprivileges',
    required: true
  }]
});
// module.exports = User = mongoose.model("users", UserSchema);
const UserGroupPermission = mongoose.model("usergrouppermissions", UserGroupPermissionSchema);
module.exports = UserGroupPermission;