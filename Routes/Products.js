//handle all product related routes
const express = require('express')
const router = express.Router()

const productController = require('../Controllers/product.controller')
const jwtCheck = require('../Middleware/jwtCheck')

//get all products
router.get('/', productController.findAll)

//create a product
router.post('/',jwtCheck, productController.create)

//find one product by id
router.get('/:id', productController.findOne)

//update one product by id
router.put('/:id', productController.update)

//delete one product by id
router.delete('/:id', productController.delete)





module.exports = router