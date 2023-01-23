const express = require('express')
const router = express.Router()
const bookController = require('../controllers/books')

//Get all the books
router.get('/', (req, res) => {
    bookController.getAllBooks(req,res);
})

//Get book by id
router.get('/:id', (req, res) => {
    bookController.getBookByID(req,res);
})


module.exports = router