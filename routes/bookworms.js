const express = require('express')
const router = express.Router()

//Get bookworm by name
router.get('/:name', (req, res) => {
    res.send('Get bookworm by name')
})

//Create a new bookworm
router.post('/', (req, res) => {
    res.send('Create a new bookworm')
})

module.exports = router