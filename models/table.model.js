const mongoose = require('mongoose');
// eto yung package na ginagamit natin sa paggawa ng mga Models (si DB STRUCTURE essentially)

const Schema = mongoose.Schema;

const tableSchema = new Schema({
    "type":{type: String, default: 'Feature'},
    "properties": {type: Object}
});

// Pangalanan natin yung Schema na ginawa mo
const Table = mongoose.model('Table', tableSchema, 'tables');

module.exports = Table;