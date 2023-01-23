const express = require('express')
const app = express()
const cors = require('cors')

//Import env configuration
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

//Import the database connection and setup function
const setupDb = require('./config/db')
setupDb()

//Import the routing setup function
const setupRoutes = require('./config/routes')
setupRoutes.init(app)

app.use(cors());

const PORT = process.env.PORT || 61535;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
