import { Products, Users } from '../models/index';
const Product = Products
const User = Users


// Create and Save a new Product
export async function create(req, res) {

    console.log('wazaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
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
      res.send({
          message: `An error occured while creating a product! ${error}`
      })
  }


}

// Retrieve all products from the database.
export async function findAll(req, res) {
    
    try {
        const data = await Product.findAll()
        res.status(200).send(data)
    } catch (error) {
        res.send({message: error.message || 'Something went wrong while fetching the products.'})
    }

}

export async function findMyProducts(req, res) {
    try {
        const data = await Product.findAll({include: ['User'], where: {userId: req.params.userId}})
        res.status(200).send(data)
        
    } catch (error) {
        res.send({message: error.message || 'Something went wrong while fetching the products.'})
        
    }
}

// Find a single product with an id
export async function findOne(req, res) {
  const id  = req.params.id

  try {
    const data = await Product.findByPk(id) 
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send({message: error.message || `Something went wrong while retreiving the product with id: ${id}` })
  }

}

// Update a product by the id in the request
export async function update(req, res) {
    const id  = req.params.id

    const _userId = req.body.userId

    console.log("BODYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")

    try {

         //verify ownership of record

        const { userId } = await Product.findByPk(id) 


        if(userId == _userId){

        const data = await Product.update(req.body.product, {where: {id: id}})
        
        //data will be 1 if succesfully updated

        if(data == 1){res.send(data)}
        
        else{res.send({message: `No records where updated, there are no products with the id of ${id}`})}

        }
        else {
            res.send({message: `Method not allowed, you are not allowed to update this record`})
        }

    } catch (error) {
        res.status(500).send({message: `An error occured while updating!`})
    }
  
}

// Delete a product with the specified id in the request
const _delete = async (req, res) => {


    const id = req.params.id;

    const _userId = req.body.userId;

    try {

        //verify ownership of record
        const { userId } = await Product.findByPk(id);


        if (userId == _userId) {

            //data will be the number of destroyed rows
            const data = await Product.destroy({ where: { id: id } });

            if (data == 1) { res.send({ message: `The product with the id of ${id}, was succesfully deleted!` }); }

            else { res.send({ message: `No records where deleted, there are no products with the id of ${id}` }); }

        }
        else {
            res.send({ message: `Method not allowed, you are not allowed to delete this record.` });
        }

    } catch (error) {
        res.send({ message: `An error occured while deleting!` });
    }

};
export { _delete as delete };



