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
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//import product related routes
const products = require('./Routes/Products')
app.use('/products', products)

//db connection
const db = require('./Models')
db.sequelize.sync()

//root
app.get('/', async (req, res) => {
    try {
        await connection.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

    res.send("Welcome to zaci's api for software security")
})


//listen on the port
app.listen(PORT, () => {console.log(`api listening on port ${PORT}`)})
