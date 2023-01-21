const express = require('express')
const app = express()

//Import env configuration
require('dotenv').config()

//Import the database connection and setup function
const setupDb = require('./config/db')
setupDb()

//Import the routing setup function
const setupRoutes = require('./config/routes')
setupRoutes(app)

app.listen(3000, () => console.log('Server started'))