const express = require('express')
const router = express.Router()
const {authenticateJWT,checkRole} = require('../config/middleware')
const { LIBRARIAN_ROLE } = require('../config/constants');
const bookwormController = require('../controllers/bookworms')

//Get all the bookworms
router.get('/', authenticateJWT, checkRole(LIBRARIAN_ROLE), (req, res) => {
    bookwormController.getAllBookworms(req,res);
})

module.exports = router