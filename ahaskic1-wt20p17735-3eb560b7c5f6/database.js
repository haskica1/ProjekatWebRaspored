const Sequelize = require('sequelize');
const sequelize = new Sequelize('wt2017735', 'root', 'root', {
   host: '127.0.0.1',
   dialect: 'mysql'
   
});
 
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

db.Aktivnost = require(__dirname+'/Aktivnost.js')(sequelize, Sequelize.DataTypes);
db.Dan = require(__dirname+'/Dan.js')(sequelize, Sequelize.DataTypes);
db.Grupa = require(__dirname+'/Grupa.js')(sequelize, Sequelize.DataTypes);
db.Predmet = require(__dirname+'/Predmet.js')(sequelize, Sequelize.DataTypes);
db.Student = require(__dirname+'/Student.js')(sequelize, Sequelize.DataTypes);
db.Tip = require(__dirname+'/Tip.js')(sequelize, Sequelize.DataTypes);
db.GrupaStudent = require(__dirname+'/GrupaStudent.js')(sequelize, Sequelize.DataTypes);

db.Student.belongsToMany(db.Grupa,{
    through:'student_grupa',
    as:'Grupa',
    foreignKey:'studentID'
});

db.Grupa.belongsToMany(db.Student,{
    through:'student_grupa',
    as:'Student',
    foreignKey:'grupaID'
});

module.exports=db;