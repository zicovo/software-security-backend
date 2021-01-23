//handle all product related routes
const express = require('express')
const router = express.Router()

const productController = require('../Controllers/product.controller')
const jwtCheck = require('../Middleware/jwtCheck')

//get all products
router.get('/', productController.findAll)

//create a product
router.post('/',jwtCheck, productController.create)

//find products linked to user
router.get('/:userId',jwtCheck, productController.findMyProducts)

//find one product by id
router.get('/:id', productController.findOne)

//update one product by id
router.put('/:id',jwtCheck,  productController.update)

//delete one product by id
router.delete('/:id',jwtCheck, productController.delete)





module.exports = router