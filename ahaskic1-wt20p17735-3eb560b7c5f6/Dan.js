const Sequelize = require('sequelize');
const sequelize = require("./database.js");

module.exports = function(sequelize,DataTypes){
    const Dan = sequelize.define('Dan', {
        naziv: {
            type: Sequelize.STRING
        }
     })
    return Dan;
};