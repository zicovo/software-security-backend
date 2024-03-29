const models = require('../Models/index');
const Product = models.Products
const User = models.Users


// Create and Save a new Product
exports.create = async (req, res) => {

  //validate request
    console.log
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
      userId: req.body.user_id
  }

  console.log(product)
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

exports.findMyProducts = async (req, res) => {
    try {
        const data = await Product.findAll({include: ['User'], where: {userId: req.params.userId}})
        res.status(200).send(data)
        
    } catch (error) {
        res.status(500).send({message: error.message || 'Something went wrong while fetching the products.'})
        
    }
}

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

    const _userId = req.user.sub

    try {

         //verify ownership of record

        const { userId } = await Product.findByPk(id) 


        if(userId == _userId){

        const data = await Product.update(req.body.product, {where: {id: id}})
        
        //data will be 1 if succesfully updated

        if(data == 1){res.send(data)}
        
        else{res.status(500).send({message: `No records where updated, there are no products with the id of ${id}`})}

        }
        else {
            res.status(401).send({message: `Method not allowed, you are not allowed to update this record`})
        }

    } catch (error) {
        res.status(500).send({message: `An error occured while updating!`})
    }
  
};

// Delete a product with the specified id in the request
exports.delete = async (req, res) => {


    const id = req.params.id

    const _userId = req.user.sub

    try {
    
    //verify ownership of record

    const { userId } = await Product.findByPk(id) 
    
    console.log(userId)


    if(userId == _userId){

    //data will be the number of destroyed rows
    const data = await Product.destroy({where: {id: id}})
    
    if(data == 1){res.send({message: `The product with the id of ${id}, was succesfully deleted!`})}
        
        else{res.status(500).send({message: `No records where deleted, there are no products with the id of ${id}`})}

    }
    else {
        res.status(401).send({message: `Method not allowed, you are not allowed to delete this record.`})
    }

    } catch (error) {
        res.status(500).send({message: `An error occured while deleting!`})
    }

}

exports.deleteProductAdmin = async (req, res) => {

    const id = req.params.id

    try {

    //data will be the number of destroyed rows
    const data = await Product.destroy({where: {id: id}})
    
    if(data == 1){res.send({message: `The product with the id of ${id}, was succesfully deleted!`})}
        
        else{res.status(500).send({message: `No records where deleted, there are no products with the id of ${id}`})}

    } catch (error) {
        res.status(500).send({message: `An error occured while deleting!`})
    }
    
}



