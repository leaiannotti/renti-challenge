const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    title: String,
    slug:String,
    biography:String
});

module.exports = mongoose.model('Author', AuthorSchema);