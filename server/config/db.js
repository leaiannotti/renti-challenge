const mongoose = require('mongoose');
const utils = require('./utils')
const Book = require('../models/book');
const Author = require('../models/author');
const User = require('../models/user');
const Loan = require('../models/loan');
const path = require('path');

async function createLibrarianUser(collections){
    const userCount = await User.countDocuments();
    if(!collections.includes("User") || userCount == 0)
    {
        const user = new User({
            username:"librarian",
            password:"librarian123",
            role: "Librarian"
        })
        await user.save();
    }
}

async function createFirstLoan(collections){
    const loanCount = await Loan.countDocuments();
    if(!collections.includes("Loan") || loanCount == 0)
    {
        const loan = new Loan({
            bookID:-1,
            username:"null"
        })
        await loan.save();
    }
}

module.exports = () => {
    //Supress warning
    mongoose.set('strictQuery',true)
    //Connect to the database
    mongoose.connect(process.env.DB_URL)

    const db = mongoose.connection
    db.on('error', (err) => console.error(err))

    db.once('open', async ()=> {
        //Check if we have the collections in the database.
        const collections = mongoose.modelNames();
        const bookCount = await Book.countDocuments();
        const authorCount = await Author.countDocuments();
        if (!collections.includes("Book") || bookCount == 0)
        {
            utils.importCSV(path.resolve('./server/assets/book.csv'), Book)
        }
        if (!collections.includes("Author") || authorCount == 0)
        {
            utils.importCSV(path.resolve('./server/assets/author.csv'), Author)
        }

        //Create an account for a librarian
        createLibrarianUser(collections)
        createFirstLoan(collections)
    })
}