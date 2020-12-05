module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
        ProductTitle: {
            type: Sequelize.STRING
        },
        ProductDescription: {
            type: Sequelize.STRING
        },
        ProductPrice: {
            type: Sequelize.DOUBLE
        },
        ProductImageSrc: {
            type: Sequelize.STRING
        }
    })

    return Product
}