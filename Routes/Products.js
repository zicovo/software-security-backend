//handle all product related routes
const express = require('express')
const router = express.Router()
const cors = require('cors')

const productController = require('../Controllers/product.controller')
const jwtCheck = require('../Middleware/jwtCheck')


//cors options

const corsOptions = {
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, CSRF-Token, X-CSRF-Token",
    credentials: true,
  };

//get all products
router.get('/',cors(corsOptions), productController.findAll)

//create a product
router.post('/',cors(corsOptions),jwtCheck, productController.create)

router.options(
    "/",
    cors({ ...corsOptions, methods: "GET, POST, OPTIONS" })
  );

// router.all("/", (req, res) => {
//     res.set("Allow", "GET, POST, OPTIONS");
//     res.status(405).end();
//   });

//find products linked to user
router.get('/:userId', cors(corsOptions),jwtCheck, productController.findMyProducts)

router.options(
    "/:userId",
    cors({ ...corsOptions, methods: "GET, OPTIONS, PUT, DELETE" })
  );

// router.all("/:userId", (req, res) => {
//     res.set("Allow", "GET, PUT, DELETE, OPTIONS");
//     res.status(405).end();
//   });

//find one product by id
router.get('/:id', cors(corsOptions),productController.findOne)

//update one product by id
router.put('/:id',cors(corsOptions),jwtCheck,  productController.update)

//delete one product by id
router.delete('/:id',cors(corsOptions),jwtCheck, productController.delete)

router.options(
    "/:id",
    cors({ ...corsOptions, methods: "GET, PUT, DELETE, OPTIONS" })
  );

// router.all("/:id", (req, res) => {
//     res.set("Allow", "GET, PUT, DELETE, OPTIONS");
//     res.status(405).end();
//   });


module.exports = router