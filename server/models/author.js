const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    authorid: Number,
    title: String,
    slug:String,
    biography:String
});

module.exports = mongoose.model('Author', AuthorSchema);