//handle all user related routes
const express = require('express')
const router = express.Router()
const jwtCheck = require('../Middleware/jwtCheck')

const userController = require('../Controllers/user.controller')

//get all users
router.get('/', userController.findAll)

//create a user
router.post('/', userController.create)

//find one user by id
router.get('/:id',jwtCheck,  userController.findOne)

//initialise a user in de db
router.post('/init',jwtCheck, userController.init)

//check if a user profile is completed

router.get('/isCompleted/:id', jwtCheck, userController.isCompleted)

//update one user by id
router.put('/:id',jwtCheck, userController.update)

//delete one user by id
router.delete('/:id', userController.delete)


module.exports = router