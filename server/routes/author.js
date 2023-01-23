const express = require('express')
const router = express.Router()
const authorController = require('../controllers/authors')

//Get all the authors
router.get('/', (req, res) => {
    authorController.getAllAuthors(req,res);
})

//Get author by id
router.get('/:id', (req, res) => {
    authorController.getAuthorByID(req,res);
})

//Get authors bio
router.get('/:id/bio', (req, res) => {
    authorController.getAuthorsBio(req,res);
})


module.exports = router