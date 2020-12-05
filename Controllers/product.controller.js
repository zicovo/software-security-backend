const db = require('../Models')
const Product = db.products
const Op = db.Sequelize.Op


// Create and Save a new Product
exports.create = async (req, res) => {
  //validate request

  if(!req.body.title) {
      res.status(400).send({message: 'Can not be empty!'})
      return
  }
  

  //if request is validate, create a product in db

  //get properties out of the request object
  const product = {
      ProductTitle: req.body.ProductTitle,
      ProductDescription: req.body.ProductDescription,
      ProductPrice: req.body.ProductPrice,
      ProductImageSrc: req.body.ProductImageSrc,
  }

  try {
     const data = await Product.create(product)
     res.send(data)
  } catch (error) {
      res.status(500).send({
          message: 'An error occured while creating a product!'
      })
  }


};

// Retrieve all products from the database.
exports.findAll = async (req, res) => {
    //find every product that matches a part of the title
    const ProductTitle = req.query.ProductTitle;
    let condition = ProductTitle ? { ProductTitle: { [Op.like]: `%${ProductTitle}%` } } : null;
  
    try {
        const data = await Product.findAll({ where: condition })
        res.send(data)
    } catch (error) {
        res.status(500).send({message: error.message || 'Something went wrong while fetching the products.'})
    }

};

// Find a single product with an id
exports.findOne = async (req, res) => {
  const id  = req.params.id

  try {
    const data = await Product.findById(id) 
    res.send(data)
  } catch (error) {
    res.status(500).send({message: `Something went wrong while retreiving the product with id: ${id}` })
  }

};

// Update a product by the id in the request
exports.update = (req, res) => {
    const id  = req.params.id

    try {
        const data = await Product.update(req.body, {where: {id: id}})
        
        //data will be 1 if succesfully updated

        if(data == 1){res.send({message: `The product with the id of ${id}, was succesfully updated!`})}
        
        else{res.send({message = `No records where updated, there are no products with the id of ${id}`})}

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
        
        else{res.send({message = `No records where deleted, there are no products with the id of ${id}`})}

    } catch (error) {
        res.status(500).send({message: `An error occured while deleting!`})
    }

};
