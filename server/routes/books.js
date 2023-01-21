const express = require('express')
const router = express.Router()

//Get all the books
router.get('/', (req, res) => {
    const { title, author} = req.query;
    let query = {};
    // Perform logic based on the query parameters
    if (title) {
        // Get books by title
        query.title = title
        res.send(`Get books by title: ${query.title}`)
    } 
    if (author) {
        // Get books by author
        query.author = author
        res.send(`Get books by author: ${query.author}`)
    }

    const user = req.user;
    
    res.send(`Get all books`)

    /*Books.find(query, (err, books) => {
        if (err) {
            return res.status(500).send({ error: 'Error while retrieving books' });
        }
        res.status(200).send(books);
    });*/
})

//Get book by id
router.get('/:id', (req, res) => {
    res.send('Get book by id')

})

//Get book author bio
router.get('/:id/authorbio', (req, res) => {
    res.send('get book author bio')

})

module.exports = router