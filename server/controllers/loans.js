const Book = require('../models/book');
const Loan = require('../models/loan');
const User = require('../models/user');

//History
exports.getAllLoans =  (req, res) => {
    Loan.find({}, (err, loans) => {
        if (err) {
            return res.status(500).send({ error: 'Error while retrieving loans' });
        }
        const loansFullData = loans.map((loan) => {
            return new Promise((resolve, reject) => {
                Book.findOne({ bookID: loan.bookID }, (err, book) => {
                    if (err) {
                        reject(err);
                    }
                    User.findOne({username: loan.username}, (err, user) => {
                        if (err) {
                            reject(err);
                        }
                        if (book)
                            loan.book = book
                        if (user)
                            loan.user = user
                        resolve(loan)
                    })
                })
            });
        });

        Promise.all(loansFullData)
            .then((results) => {
                res.status(200).json(results);
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ error: 'Error while retrieving books Loan' });
            });
    })
}

//Get not returned books
exports.getNonReturned =  (req, res) => {
    Loan.find({returned:false}, (err, loans) => {
        if (err) {
            return res.status(500).send({ error: 'Error while retrieving non returned loans' });
        }
        const loansFullData = loans.map((loan) => {
            return new Promise((resolve, reject) => {
                Book.findOne({ bookID: loan.bookID }, (err, book) => {
                    if (err) {
                        reject(err);
                    }
                    User.findOne({username: loan.username}, (err, user) => {
                        if (err) {
                            reject(err);
                        }
                        if (book)
                            loan.book = book
                        if (user)
                            loan.user = user
                        resolve(loan)
                    })
                })
            });
        });

        Promise.all(loansFullData)
            .then((results) => {
                res.status(200).json(results);
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ error: 'Error while retrieving books Loan' });
            });
    })
}

// //Ask if a book was borrowed (history)
// exports.getLoanHistoryByBookID = (req, res) =>{
//     res.send('loans/all')
// }

//Ask if a book was borrowed
exports.isBookBorrowed = (req, res) => {
    const { bookId } = req.query;
    var ret = false
    Loan.find({bookID:bookId, returned: false}, (err, loan) => {
        if (err) {
            return res.status(500).send({ error: 'Error while retrieving isBookBorrowed loans' });
        }
        if(loan)
            ret = true;
    })
    res.status(200).send(ret);
}

exports.lendBooks = async (req, res) => {
    const {booksID, returnDate } = req.body;
    try {
        const username = req.user.username;
        //Check if the return date is valid
        if(isNaN(Date.parse(returnDate)))
            return res.status(400).send({ error: 'Invalid date' });

        //Create an array of promises to lend each book
        const lendPromises = booksID.map(async bookID => {
            //Check if the book exists
            const book = await Book.findOne({ bookID: bookID });
            if (!book) return res.status(400).send({ error: `Invalid bookID ${bookID}` });

            //Create a new loan item
            const loanItem = new Loan({
                bookID: bookID,
                username:username,
                returnDate: Date.parse(returnDate)
            });
            //Save the loan item
            await loanItem.save();
            return loanItem;
        });

        //Wait for all the promises to resolve
        const results = await Promise.all(lendPromises);
        res.status(200).json(results);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Error while lendBooks' });
    }
}


//to indicate that a book is returned by the user
exports.returnBook = async (req, res) => {
    const { bookID } = req.body;
    try {
        const book = await Book.findOne({ bookID: bookID });
        if (!book) return res.status(400).send({ error: `Invalid bookID ${bookID}` });

        const loan = await Loan.findOne({bookID: bookID, returned : false});
        if (!loan) return res.status(400).send({ error: `The bookID ${bookID} It was not borrowed or has already been returned` });

        Loan.updateOne({bookID: bookID, returned : false}, { $set: { returnDate: Date.now(), returned:true } }, (err) => {
            if (err) { console.log(err); return res.status(500).send({ error: 'Error while updating loan' })};
            return res.status(201).send();
          });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Error while lendBooks' });
    }
}
