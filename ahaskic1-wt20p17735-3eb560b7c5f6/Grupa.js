const Sequelize = require('sequelize');
const sequelize = require("./database.js");

module.exports = function(sequelize,DataTypes){
    const Grupa = sequelize.define('Grupa', {
        naziv: {
            type: Sequelize.STRING
        }
     })
    return Grupa;
};