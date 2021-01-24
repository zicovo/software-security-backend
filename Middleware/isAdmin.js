const models = require('../Models/index')
const User = models.Users

module.exports = async (req, res, next) => {

    const id = req.user.sub

    try {
        //check if user exists
        const user = await User.findByPk(id, {include: ['Roles']})

        //loop over roles and check for admin role
        for(role of user.Roles){
            if(role.admin == true){
                console.log('JE BENT ADMIN')
                next()
            }
            else{
                res.status(401).send({message: 'Method not allowed, you need admin rights for this operation'})
            }
        }

        
    } catch (error) {

        console.log(error)
        
    }

}