const Sequelize = require('sequelize');
const sequelize = require("./database.js");

module.exports = function(sequelize,DataTypes){
    const GrupaStudent = sequelize.define('GrupaStudent', {
        studentID: Sequelize.INTEGER,
        grupaID: Sequelize.INTEGER
        
     })
    return GrupaStudent;
};