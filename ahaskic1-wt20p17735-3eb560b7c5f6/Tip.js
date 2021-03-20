const Sequelize = require('sequelize');
const sequelize = require("./database.js");

module.exports = function(sequelize,DataTypes){
    const Tip = sequelize.define('Tip', {
        naziv: {
            type: Sequelize.STRING
        }
     })
    return Tip;
};