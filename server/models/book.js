const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    author_id: Number,
    author_bio: String,
    authors: String,
    title_slug: String,
    author_slug: String,
    isbn13: String,
    isbn10: String,
    price: String,
    format: String,
    publisher: String,
    pubdate: String,
    edition: String, 
    subject: String,
    lexile: String,
    pages: Number,
    dimensions: String,
    overview: String,
    excerpt: String,
    synopsis: String,
    toc: String,
    editorial_reviews:String
});

module.exports = mongoose.model('Book', BookSchema);