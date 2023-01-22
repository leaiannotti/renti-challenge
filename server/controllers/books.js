const Book = require('../models/book');
const Loan = require('../models/loan');

exports.getAllBooks = (req, res) => {
    const { title, author} = req.query;
    let query = {};
    if (title) {
        query.title = {'$regex': title}
    } 
    if (author) {
        query.author = {'$regex': author}
    }

    Book.find(query, (err, books) => {
        if (err) {
            return res.status(500).send({ error: 'Error while retrieving books' });
        }
        const booksWithStatus = books.map((book) => {
            return new Promise((resolve, reject) => {
                // Find loan with this book's ID and returned flag is false
                Loan.findOne({ bookID: book.bookID, returned: false }, (err, loan) => {
                    if (err) {
                        reject(err);
                    }
                    if (!loan) {
                        book.borrowed = false
                    } else {
                        book.borrowed = true
                    }
                    resolve(book);
                });
            });
        });

        Promise.all(booksWithStatus)
            .then((results) => {
                res.status(200).json(results);
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ error: 'Error while retrieving books Loan' });
            });
    });
};

exports.getBookByID = (req, res) => {
    const id = req.params.id;
    Book.findOne({bookid: id}, (err, book) => {
        if (err) {
            return res.status(500).send({ error: 'Error while retrieving book by id' });
        }
        if(book.length == 0){
            return res.status(400).send({ error: 'No book with that ID' });
        }

        Loan.findOne({ bookID: book.bookID, returned: false }, (err, loan) => {
            if (err) {
                reject(err);
            }
            if (!loan) {
                book.borrowed = false
            } else {
                book.borrowed = true
            }
        });

        res.status(200).send(book);
    });
};