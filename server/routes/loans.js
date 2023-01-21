const express = require('express')
const router = express.Router()

//Get not returned books
router.get('/non-returned', (req, res) => {
    res.send('loans/non-returned')
})


//Ask if a book was borrowed (history)
router.get('/', (req, res) => {
    res.send('loans/all')
})

//Ask if a book was borrowed
router.get('/:bookId/borrowed', (req, res) => {
    res.send('loans/get if was borrowed')
})

//to borrow a book, where I would send the book and user ID in the request body
//the books should be validate before?
router.post('/', (req, res) => {
    res.send('[POST]loans/')
})

//to indicate that a book is returned by the user
router.patch('/', (req, res) => {
    //Check if the user has the book
    res.send('[PATCH]loans/')

})

module.exports = router