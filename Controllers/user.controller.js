const models = require('../models/index')
const User = models.Users


// Create and Save a new User
exports.create = async (req, res) => {

  //validate request

  if(!req.body.sub) {
      res.status(400).send({message: 'Can not be empty!'})
      return
  }

  //get properties out of the request object
  const user = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      img: req.body.img,
  }

  try {
     const data = await User.create(user)
     res.status(201).send(data)
  } catch (error) {
      res.status(500).send({
          message: `An error occured while creating a user! ${error}`
      })
  }


};

exports.init = async(req, res) => {

    //validate request

    if(!req.body.id) {
        res.status(400).send({message: 'Can not be empty!'})
        return
    }

    const user = {
        id: req.body.id,
        email: req.body.email,
        completedProfile: false
    }

    console.log('HIERE')
    console.log(user)

    try {
        const check = await User.findByPk(user.id)
        console.log(check)
        if (!check) {
          console.log(user)
          const data = await User.create(user)
          res.send(true)
        } else {
          res.send(false)
        }
      } catch (error) {
        res.status(500).send({
          message: `An error occured while creating a user!, ${error}`
        })
      }

}

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    
    try {
        const data = await User.findAll()
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({message: error.message || 'Something went wrong while fetching the users.'})
    }

};

// Find a single user with an id
exports.findOne = async (req, res) => {
  const id  = req.params.id
  
  try {
    const data = await User.findByPk(id) 
    console.log(data)
    if(!data){
        res.status(200).send(false)
    }
    else{
       res.status(200).send(data) 
    }
    

  } catch (error) {
    res.status(500).send({
        message: error.message || `Something went wrong while retreiving the user with id: ${id}`
      })
  }

};

//check isCompleted prop

exports.isCompleted = async (req, res) => {

    console.log('HALLO NIFFAUW')

    const id = req.params.id

    try {
        const user = await User.findByPk(id)
        console.log(user.completedProfile)
        if(user.completedProfile === true){
            res.send(true)
        }
        else{
            res.send(false)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

// Update a user by the id in the request
exports.update = async (req, res) => {

    const id  = req.params.id

    try {
        const data = await User.update(req.body, {where: {id: id}})
        
        //data will be 1 if succesfully updated

        if(data == 1){res.status(200).send({message: `The user with the id of ${id}, was succesfully updated!`})}
        
        else{res.send({message: `No records where updated, there are no users with the id of ${id}`})}

    } catch (error) {
        res.status(500).send({message: `An error occured while updating!`})
    }
  
};

// Delete a user with the specified id in the request
exports.delete = async (req, res) => {
  
    const id = req.body.id

    try {
    //data will be the number of destroyed rows
    const data = await User.destroy({where: {id: id}})
    
    if(data == 1){res.send({message: `The user with the id of ${id}, was succesfully deleted!`})}
        
        else{res.status(200).send({message: `No records where deleted, there are no users with the id of ${id}`})}

    } catch (error) {
        res.status(500).send({message: `An error occured while deleting!`})
    }

};
