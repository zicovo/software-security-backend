const models = require('../models/index')
const Product = models.Products


// Create and Save a new Product
exports.create = async (req, res) => {
  //validate request

  if(!req.body.name) {
      res.status(400).send({message: 'Can not be empty!'})
      return
  }
  
  //if request is validate, create a product in db

  //get properties out of the request object
  const product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      img: req.body.img,
  }

  try {
     const data = await Product.create(product)
     res.status(201).send(data)
  } catch (error) {
      res.status(500).send({
          message: `An error occured while creating a product! ${error}`
      })
  }


};

// Retrieve all products from the database.
exports.findAll = async (req, res) => {
    
    try {
        const data = await Product.findAll()
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({message: error.message || 'Something went wrong while fetching the products.'})
    }

};

// Find a single product with an id
exports.findOne = async (req, res) => {
  const id  = req.params.id

  try {
    const data = await Product.findByPk(id) 
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send({message: error.message || `Something went wrong while retreiving the product with id: ${id}` })
  }

};

// Update a product by the id in the request
exports.update = async (req, res) => {
    const id  = req.params.id

    try {
        const data = await Product.update(req.body, {where: {id: id}})
        
        //data will be 1 if succesfully updated

        if(data == 1){res.status(200).send({message: `The product with the id of ${id}, was succesfully updated!`})}
        
        else{res.send({message: `No records where updated, there are no products with the id of ${id}`})}

    } catch (error) {
        res.status(500).send({message: `An error occured while updating!`})
    }
  
};

// Delete a product with the specified id in the request
exports.delete = async (req, res) => {
  
    const id = req.body.id

    try {
    //data will be the number of destroyed rows
    const data = await Product.destroy({where: {id: id}})
    
    if(data == 1){res.send({message: `The product with the id of ${id}, was succesfully deleted!`})}
        
        else{res.status(200).send({message: `No records where deleted, there are no products with the id of ${id}`})}

    } catch (error) {
        res.status(500).send({message: `An error occured while deleting!`})
    }

};
