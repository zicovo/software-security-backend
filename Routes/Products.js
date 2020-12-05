//handle all product related routes
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => { res.send('products requested!')})

router.get('/schoenen', (req, res) => { res.send('schoenen requested!')})

module.exports = router