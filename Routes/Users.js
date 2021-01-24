//handle all user related routes
const express = require('express')
const router = express.Router()
const jwtCheck = require('../Middleware/jwtCheck')
const isAdmin = require('../Middleware/isAdmin')
const cors = require('cors')

const userController = require('../Controllers/user.controller')

//cors options

const corsOptions = {
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, CSRF-Token, X-CSRF-Token",
    credentials: true,
  };

//get all users
router.get('/', cors(corsOptions), jwtCheck, userController.findAll)

//create a user
router.post('/', cors(corsOptions), userController.create)

router.options(
    "/",
    cors({ ...corsOptions, methods: "GET, POST, OPTIONS" })
  );


//initialise a user in de db
router.post('/init', cors(corsOptions), jwtCheck, userController.init)

router.options(
    "/init",
    cors({ ...corsOptions, methods: "POST, OPTIONS" })
  );


//check if a user profile is completed

router.get('/isCompleted/:id',cors(corsOptions), jwtCheck, userController.isCompleted)

router.options(
    "/isCompleted/:id",
    cors({ ...corsOptions, methods: "GET, OPTIONS" })
  );


//find one user by id
router.get('/:id', cors(corsOptions),jwtCheck, userController.findOne)

//update one user by id
router.put('/:id', cors(corsOptions), jwtCheck, userController.update)

//delete one user by id
router.delete('/:id',cors(corsOptions), jwtCheck, userController.delete)

router.options(
    "/:id",
    cors({ ...corsOptions, methods: "GET, PUT, DELETE, OPTIONS" })
  );

router.get('/withRoles/:id',cors(corsOptions), jwtCheck, userController.findUserAndRoles)

router.options(
  "/withRoles/:id",
  cors({ ...corsOptions, methods: "GET, PUT, DELETE, OPTIONS" })
);

router.get('/getAllUserData/:id', cors(corsOptions), jwtCheck, userController.getAllUserData)

router.options(
  "/getAllUserData/:id",
  cors({ ...corsOptions, methods: "GET, OPTIONS" })
);


module.exports = router