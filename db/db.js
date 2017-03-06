'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

var Employees = sequelize.define('Employees', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    city: Sequelize.STRING,
    country: Sequelize.STRING,
    role: Sequelize.STRING,
    email: Sequelize.STRING,
    telephone: Sequelize.STRING
  });
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//  mostly generated orm code above

//create new user 
module.exports.create_user = function(first_name,last_name,city,country,role,email,telephone){
    try{
        return Employees.create({
        first_name:first_name,
        last_name:last_name,
        city:city,
        country:country,
        role:role,
        email:email,
        telephone:telephone
        });
    }
    catch(e){ console.log(e)}
};

//find all workers in one role
//findAll is asyncronous thus only return a promise
//need to add the .then() callback to return something useful in job.js
module.exports.find_role = function(role){
    return Employees.findAll({
            where:{
                role:role
            }
        }
    )
}

//users mostly live in the same geographic region
//no need to check weather for all users
//
//return a collection of a (hopefully small) amount of cities relative to 
//number of employees

module.exports.find_cities = function(){
    return sequelize.query(
        'SELECT DISTINCT city, country FROM Employees;',{ raw: true });
    
}
sequelize.sync();// sync db