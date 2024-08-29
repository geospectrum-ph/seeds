const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    caption: {
        required: true,
        type: String,
        default: "test"
    },
    filename: {
        required: true,
        type: String,
        default: "test filename"
    },
    fileId: {
        required: true,
        type: String,
        default: "test fileID"
    },
    createdAt: {
        default: Date.now(),
        type: Date,
    },
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;