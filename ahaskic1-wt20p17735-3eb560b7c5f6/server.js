const fs = require('fs');
const csv = require('csv-parser');
const express = require('express');
const bodyParser = require('body-parser');
const { Console } = require('console');
const app = express();
const Sequelize = require('sequelize');
const db = require("./database.js");
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/v2/Predmet',function(req,res){
    db.Predmet.create({naziv: req.body.naziv}).then(function(r){   
        res.writeHead(200, {'Content-Type': 'application/json'}); 
        res.end();
    })
});

app.get('/v2/Predmet',function(req,res){
    db.Predmet.findAll().then(function(r){
        res.write(JSON.stringify(r))
        res.end();        
    }); 
});

app.delete('/v2/Predmet/:id',function(req,res){ 
    db.Predmet.findAll({where:{id:req.params.id}}).then(function(r){
        r.forEach(el => {el.destroy();});
        res.end();        
    });
});

app.put('/v2/Predmet/:id',function(req,res){  
    db.Predmet.update({naziv: req.body.naziv},{where: {id:req.params.id}});
    res.end();          
});

app.post('/v2/Aktivnost',function(req,res){
    db.Aktivnost.create({naziv: req.body.naziv, pocetak:req.body.pocetak, kraj:req.body.kraj}).then(function(r){   
        res.writeHead(200, {'Content-Type': 'application/json'}); 
        res.end();
    })
});

app.get('/v2/Aktivnost',function(req,res){
    db.Aktivnost.findAll().then(function(r){
        res.write(JSON.stringify(r));
        res.end();        
    }); 
});

app.delete('/v2/Aktivnost/:id',function(req,res){ 
    db.Aktivnost.findAll({where:{id:req.params.id}}).then(function(r){
            r.forEach(el => {el.destroy();});
        res.end();        
    });
});

app.put('/v2/Aktivnost/:id',function(req,res){ 
    db.Aktivnost.update({naziv: req.body.naziv, pocetak:req.body.pocetak, kraj:req.body.kraj},{where: {id:req.params.id}});
    res.end();          
});

app.post('/v2/Student',function(req,res){
    db.Student.findAll({where:{index:req.body.index}}).then(function(r){   
        var rezultat;
        if(r.length > 0)   
        {
            rezultat = "Student sa imenom " + req.body.ime + " i indexom " + req.body.index + " nije kreniran, jer postoji takav student!!!";
            res.writeHead(200, {'Content-Type': 'application/json'});  
            res.write(JSON.stringify(rezultat));
            res.end();  
        }
        else db.Student.create({ime: req.body.ime, index:req.body.index}).then(function(r){    
            res.writeHead(200, {'Content-Type': 'application/json'});  
            res.write(JSON.stringify(""));
            res.end();  
        })   
    });  
});

app.get('/v2/Student',function(req,res){
    db.Student.findAll().then(function(r){
        res.write(JSON.stringify(r))
        res.end();        
    }); 
});

app.delete('/v2/Student/:id',function(req,res){
    db.Student.findAll({where:{id:req.params.id}}).then(function(r){
            r.forEach(el => {el.destroy();});
        res.end();        
    });
});

app.put('/v2/Student/:id',function(req,res){ 
    db.Student.update({ime: req.body.ime, index:req.body.index},{where: {id:req.params.id}});
    res.end();          
});

app.post('/v2/Dan',function(req,res){
    db.Dan.create({naziv: req.body.naziv}).then(function(r){   
        res.writeHead(200, {'Content-Type': 'application/json'});  
        res.end();
    })
});

app.get('/v2/Dan',function(req,res){
    db.Dan.findAll().then(function(r){
        res.write(JSON.stringify(r))
        res.end();        
    }); 
});

app.delete('/v2/Dan/:id',function(req,res){  
    db.Dan.findAll({where:{id:req.params.id}}).then(function(r){
        r.forEach(el => {el.destroy();});
        res.end();        
    });
});

app.put('/v2/Dan/:id',function(req,res){  
    db.Dan.update({naziv: req.body.naziv},{where: {id:req.params.id}});
    res.end();          
});

app.post('/v2/Grupa',function(req,res){
    db.Grupa.create({naziv: req.body.naziv}).then(function(r){   
        res.writeHead(200, {'Content-Type': 'application/json'});  
        res.end();
    })
});

app.get('/v2/Grupa',function(req,res){
    db.Grupa.findAll().then(function(r){res.write(JSON.stringify(r))
    res.end();        
    }); 
});

app.delete('/v2/Grupa/:id',function(req,res){  
    db.Grupa.findAll({where:{id:req.params.id}}).then(function(r){
            r.forEach(el => {el.destroy();});
        res.end();        
    });
});

app.put('/v2/Grupa/:id',function(req,res){  
    db.Grupa.update({naziv: req.body.naziv},{where: {id:req.params.id}});
    res.end();          
});

app.post('/v2/Tip',function(req,res){
    db.Tip.create({naziv: req.body.naziv}).then(function(r){   
        res.writeHead(200, {'Content-Type': 'application/json'});  
        res.end();
    })
});

app.get('/v2/Tip',function(req,res){
    db.Tip.findAll().then(function(r){
        res.write(JSON.stringify(r))
        res.end();        
    }); 
});

app.delete('/v2/Tip/:id',function(req,res){  
    db.Tip.findAll({where:{id:req.params.id}}).then(function(r){
            r.forEach(el => {el.destroy();});res.end();        
    });
});

app.put('/v2/Tip/:id',function(req,res){  
    db.Tip.update({naziv: req.body.naziv},{where: {id:req.params.id}});
    res.end();          
});

app.post('/v2/studentGrupa',function(req,res){
    var vratiti = "";
    var listaStudenta = JSON.stringify(req.body.studenti).replace("[","").replace("]","").replace(/\\/g,"");
    var listaStudenata2 = listaStudenta.split("},{");

    var grupa = req.body.grupa;
    var pomocna = [];
    for(var i in listaStudenata2)
    {  
        var red = JSON.parse("{" + listaStudenata2[i].replace(/"{/,"").replace(/}"/,"") + "}");
        pomocna.push(db.Student.findAll({where:{index:red.index}}).then(function(r){   
        if(r.length > 0)   
        {
            vratiti += "Student sa imenom " + req.body.ime + " i indexom " + req.body.index + " nije kreniran, jer postoji takav student!!!" + "\n";   
            pomocna.push( db.Grupa.findAll({where:{naziv:grupa}}).then(function(g){ 
                    grupaID = g[0].id;  
                    pomocna.push(db.GrupaStudent.findAll({where:{studentID:r[0].id}}).then(function(k){
                        if(k.length > 0)
                        {
                            pomocna.push(db.GrupaStudent.update({studentID: r[0].id, grupaID:grupaID},{where:{id:k[0].id}}));
                        }
                        else  pomocna.push(db.GrupaStudent.create({studentID: r[0].id, grupaID:grupaID}).then(function(r){ 
                        }));
                    }));
                }));
        }
        else pomocna.push(db.Student.create({ime: red.ime, index:red.index}).then(function(r)
        {
            pomocna.push(db.Student.findAll({where:{index:red.index}}).then(function(r){ 
                studentID = r[0].id;       
                pomocna.push(db.Grupa.findAll({where:{naziv:grupa}}).then(function(r){ 
                    grupaID = r[0].id;  
                    pomocna.push(db.GrupaStudent.create({studentID: studentID, grupaID:grupaID}).then(function(r){         
                    }))
                }));
            }));
            }))
        })
        )
    }
    Promise.all(pomocna).then(function(k)
    {
    res.writeHead(200, {'Content-Type': 'application/json'});  
    res.write(JSON.stringify(vratiti));
    res.end();
    });
});
module.exports = app.listen(3000);