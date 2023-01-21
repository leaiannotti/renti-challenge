const express = require('express')
const mongoose = require('mongoose')
const app = express()

//Import env configuration
require('dotenv').config()

//Supress warning
mongoose.set('strictQuery',true)
//Connect to the database
mongoose.connect(process.env.DB_URL)

const db = mongoose.connection
db.on('error', (err) => console.error(err))

db.once('open',()=> {

    //Check if we have the collections in the database.
    //Otherwise add them
    //Create an account for a librarian

})

const authorsRouter = require('./routes/author')
const booksRouter = require('./routes/books')
const bookwormsRouter = require('./routes/bookworms')
const loansRouter = require('./routes/loans')

app.use('/authors',authorsRouter)
app.use('/books',booksRouter)
app.use('/bookworms',bookwormsRouter)
app.use('/loans',loansRouter)

//Use JSON 
app.use(express.json())
app.listen(3000, () => console.log('Server started')) 
