const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const app = express()
const PORT = process.env.port || 4000

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-rlt7-zh1.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://software-sec-zico-api',
  issuer: 'https://dev-rlt7-zh1.eu.auth0.com/',
  algorithms: ['RS256']
});

const products = [ 
{
    id: 1,
    name: "Adidas Stan Smith",
    description: "De mooiste stappers van het land",
    src: 'adidas.jpg'
},
{
    id: 2,
    name: "Vans old school",
    description: "De mooiste stappers van het land",
    src: 'vans.jpg'

},
{
    id: 3,
    name: "Nike Air force 1",
    description: "De mooiste stappers van het land",
    src: 'nike.jpg'

},
{
    id: 4,
    name: "Puma classic suede",
    description: "De mooiste stappers van het land",
    src: 'puma.jpg'

}
]


app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {res.send("Welcome to zaci's api for software security")})

app.get('/products', jwtCheck, (req, res) => {
    console.log('products requested')
    res.send(products)
})

//listen on the port
app.listen(PORT, () => {console.log(`api listening on port ${PORT}`)})
