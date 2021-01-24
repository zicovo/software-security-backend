require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const PORT = process.env.port || 4000

//middleware to require jwt token in requests 
const jwtCheck = require('./Middleware/jwtCheck')

//middlewares to handle json en urlencoded messages + overcome cors policy
app.use(bodyParser.json());
// app.use(cors());
app.use(express.urlencoded({ extended: true }));

//import product related routes
const products = require('./Routes/Products')
app.use('/api/products', products)


//import product related routes
const users = require('./Routes/Users')
app.use('/api/users', users)

//root
app.get('/', async (req, res) => {
    res.send("Welcome to zaci's api for software security")
})


//listen on the port
app.listen(PORT, () => {console.log(`api listening on port ${PORT}`)})
