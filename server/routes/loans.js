const express = require('express')
const router = express.Router()
const loansController = require('../controllers/loans')
const {authenticateJWT,checkRole} = require('../config/middleware')
const { LIBRARIAN_ROLE, BOOKWORM_ROLE } = require('../config/constants');


//Get not returned books
router.get('/non-returned', (req, res) => {
    loansController.getNonReturned(req,res)
})

//Ask if a book was borrowed (history)
router.get('/', authenticateJWT, checkRole(LIBRARIAN_ROLE), (req, res) => {
    loansController.getAllLoans(req,res)
})

//Ask if a book was borrowed
router.get('/borrowed', (req, res) => {
    loansController.isBookBorrowed(req,res)
})

//to borrow a book, where I would send the book and user ID in the request body
//the books should be validate before?
router.post('/', authenticateJWT, checkRole(BOOKWORM_ROLE),(req, res) => {
    loansController.lendBooks(req,res)
})

//to indicate that a book is returned by the user
router.patch('/',authenticateJWT, checkRole(LIBRARIAN_ROLE), (req, res) => {
    //Check if the user has the book
    loansController.returnBook(req,res)
})

module.exports = router