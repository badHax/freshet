'use strict';

var Employee = sequelize.define('employee', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING
  },
  city:{
      type: Sequelize.STRING
  },
  phone:{
      type: sequelize.STRING
  },
  role:{
      type: sequelize.STRING
  },
  email:{
      type : sequelize.STRING
  },
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

employee.sync({force: true}).then(function () {
  // Table created
  return employee.create({
    firstName: 'Nervous',
    lastName: 'Wreck',
    city:'Kingston',
    phone:"1876########5",
    role:"normal",
    email:"#############.com"
  }));

employee.sync({force: true}).then(function () {
  // Table created
  return employee.create({
    firstName: 'Mad',
    lastName: 'Life',
    city:'Kingston',
    phone:"18##########",
    role:"normal",
    email:"################.com"
  });
}));

module.exports.employee = employee;
