const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const GroupPrivilegeSchema = new Schema({
  privilege_name: {
    type: String,
    required: true
  }
});
// module.exports = User = mongoose.model("users", UserSchema);
const GroupPrivilege = mongoose.model("groupprivileges", GroupPrivilegeSchema);
module.exports = GroupPrivilege;