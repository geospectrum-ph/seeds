const mongoose = require('mongoose');
// eto yung package na ginagamit natin sa paggawa ng mga Models (si DB STRUCTURE essentially)

const Schema = mongoose.Schema;

const sessionfileSchema = new Schema({
    userId: String,
    filename: String,
    fileId: String
});

// Pangalanan natin yung Schema na ginawa mo
const Sessionfile = mongoose.model('sessionfile', sessionfileSchema);

module.exports = Sessionfile;