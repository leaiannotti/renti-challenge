const express = require('express')
const router = express.Router()

//Get all the authors
router.get('/', (req, res) => {
    
    res.send('Get all the authors')
})

//Get book by id
router.get('/:id', (req, res) => {
    res.send('Get book by id')

})

module.exports = router