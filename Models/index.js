//get the client
const { Sequelize } = require('sequelize')
const products = require('./product.model')

//create the connection to the database

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
})


const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

//assign models
db.products = products(sequelize, Sequelize)



module.exports = db