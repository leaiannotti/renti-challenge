const express = require('express')
const router = express.Router()

//Get all the bookworms
router.get('/', (req, res) => {
    const { name } = req.query;
    let query = {};
    // Perform logic based on the query parameters
    if (name) {
        // Get books by title
        query.name = name
        res.send(`Get bookworm by name: ${query.name}`)
    } 

    res.send(`Get all bookworms`)
})

//Create a new bookworm
router.post('/', (req, res) => {
    res.send('Create a new bookworm')
})

module.exports = router