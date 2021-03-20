const Sequelize = require('sequelize');   
const sequelize = require("./database.js");  

module.exports = function(sequelize,DataTypes){
    const Student = sequelize.define('Student', {
        
            ime: Sequelize.STRING,
            index: Sequelize.STRING
        
     })
    return Student;
};