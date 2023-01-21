const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const authorsRouter = require('../routes/author');
const booksRouter = require('../routes/books');
const bookwormsRouter = require('../routes/bookworms');
const loansRouter = require('../routes/loans');
const authorizationRouter = require('../routes/authorization');

function init(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); //:(:(:(:(

  app.use('/authors',authorsRouter)
  app.use('/books',booksRouter)
  app.use('/bookworms',bookwormsRouter)
  app.use('/loans',loansRouter)
  app.use('/auth',authorizationRouter)
  //Use JSON 
  app.use(express.json())
}

module.exports = {
    init
}