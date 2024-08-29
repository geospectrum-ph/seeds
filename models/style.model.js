const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sldSchema = new Schema({
    "name": {type: String},
    "metadataID": {type: String},
    "style": {type: [Object]},
    "text": {type: String}
});

// SLD Schema are saved in styles collection
const Style = mongoose.model('SLD', sldSchema, 'styles');

module.exports = Style;