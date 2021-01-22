'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_roles.belongsTo(models.Users, {foreignKey: 'userId'})
      User_roles.belongsTo(models.Roles, {foreignKey: 'roleId'})
    }
  };
  User_roles.init({
    userId: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_roles',
  });
  return User_roles;
};