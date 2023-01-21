const express = require('express');
var { expressjwt: jwt } = require("express-jwt");
const bodyParser = require('body-parser');
const authorsRouter = require('../routes/author');
const booksRouter = require('../routes/books');
const bookwormsRouter = require('../routes/bookworms');
const loansRouter = require('../routes/loans');
const authorizationRouter = require('../routes/authorization');

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true })); //:(:(:(:(

    app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ['sha1', 'RS256', 'HS256'] }).unless({ path: ['/auth/login', '/auth/register'] }));


    app.use('/authors',authorsRouter)
    app.use('/books',booksRouter)
    app.use('/bookworms',bookwormsRouter)
    app.use('/loans',loansRouter)
    app.use('/auth',authorizationRouter)
    //Use JSON 
    app.use(express.json())
}