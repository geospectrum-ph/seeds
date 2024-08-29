// 18 Sept 2021
// Forgot password 
// Source: https://dev.to/jahangeer/how-to-implement-password-reset-via-email-in-node-js-132m

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});

module.exports = mongoose.model("token", tokenSchema);