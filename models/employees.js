'use strict';
module.exports = function(sequelize, DataTypes) {
  var Employees = sequelize.define('Employees', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    telephone: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Employees;
};