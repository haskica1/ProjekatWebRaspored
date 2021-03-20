const fs = require('fs');
const csv = require('csv-parser');
const express = require('express');
const bodyParser = require('body-parser');
const { Console } = require('console');
const app = express();
const Sequelize = require('sequelize');
const db = require("./database.js");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/v1/predmeti',function(req,res){
	let results = [];
	res.writeHead(200, {'Content-Type': 'application/json'});
	fs.createReadStream('predmeti.txt') 
	.pipe(csv())
	.on('data', (data) => results.push(data))
	.on('end', () => {
		res.write(JSON.stringify(results))
		res.end();
	});   
});
		
 app.get('/v1/aktivnosti',function(req,res){   
	let results = [];
	res.writeHead(200, {'Content-Type': 'application/json'});
	fs.createReadStream('aktivnosti.txt')
	.pipe(csv())
	.on('data', (data) => results.push(data))
	.on('end', () => {
		res.write(JSON.stringify(results))
		res.end();
	});   
});
	
app.get('/v1/predmet/:naziv/aktivnost',function(req,res){   
	let results = [];  
	res.writeHead(200, {'Content-Type': 'application/json'});
	fs.createReadStream('aktivnosti.txt') 
	.pipe(csv())
	.on('data', (data) => {
		if(req.params.naziv == data['naziv']) results.push(data);
		})
	.on('end', () => {
		res.write(JSON.stringify(results))
		res.end();
	});   
});
	

 app.post('/v1/predmet',function(req,res){
	var daLiJeTu = 0;
	let res2 = [];
	let poruka ="";
	let tijeloZahtjeva = '';
	let novaLinija;
	tijeloZahtjeva = req.body['naziv'];
	novaLinija = "\n" + req.body['naziv'];

	res.writeHead(200, {'Content-Type': 'application/json'});
	fs.createReadStream('predmeti.txt') 
	.pipe(csv())
	.on('data', (data) => res2.push(data))
	.on('end', () => {
		const svi = JSON.parse(JSON.stringify(res2));                  
		for(i in svi)
		{ 	
			if(svi[i].naziv == tijeloZahtjeva)
			{
				daLiJeTu = 1; 
			}
		}
		if(daLiJeTu == 1) poruka = "Naziv predmeta postoji!";				
		else 
		{
			poruka = "Predmet je uspješno dodan!";
			fs.appendFile('predmeti.txt',novaLinija,function(err)
			{ 
				if(err) throw err;
			});	
		}
		res.write(JSON.stringify({message:poruka}));
		res.end();
	});  
});
	
	
app.post('/v1/aktivnost',function(req,res)
{
	var stanje = 1;
	let res2 = [];
	let poruka = "";
	tijeloZahtjeva = req.body;
	let novaLinija ="\n" +  req.body['naziv'] +"," + req.body['tip'] + "," + req.body['pocetak'] + "," + req.body['kraj'] + "," + req.body['dan'];

	res.writeHead(200, {'Content-Type': 'application/json'});

	if(parseFloat(req.body['pocetak']) < 0 || parseFloat(req.body['pocetak']) > 24) stanje = 0;
	else if(parseFloat(req.body['pocetak']) - parseFloat(req.body['pocetak']).toFixed(1) != 0) stanje = 0; 
	else if(parseFloat(req.body['kraj']) < 0 || parseFloat(req.body['kraj']) > 24) stanje = 0;
	else if(parseFloat(req.body['pocetak']).toFixed(1) - parseInt(req.body['pocetak']).toFixed(1) != 0 && parseFloat(req.body['pocetak']).toFixed(1) - parseInt(req.body['pocetak']).toFixed(1) != 0.5) stanje = 0;
	else if(parseFloat(req.body['kraj']).toFixed(1) - parseInt(req.body['kraj']).toFixed(1) != 0 && parseFloat(req.body['kraj']).toFixed(1) - parseInt(req.body['kraj']).toFixed(1) != 0.5) stanje = 0;
	else if(parseFloat(req.body['kraj']) < parseFloat(req.body['pocetak'])) stanje = 0;
	else if(parseFloat(req.body['kraj']) - parseFloat(req.body['kraj']).toFixed(1) != 0) stanje = 0; 

	fs.createReadStream('aktivnosti.txt') 
	.pipe(csv())
	.on('data', (data) => res2.push(data))
	.on('end', () => {
		const svi = JSON.parse(JSON.stringify(res2));                  
		for(i in svi) 
		{ 	
			if(stanje == 1 &&  svi[i].dan == req.body['dan'])  
				if( 
					(parseFloat(svi[i].pocetak) == parseFloat(req.body['pocetak']) && parseFloat(svi[i].kraj) == parseFloat(req.body['kraj'])) ||
					(parseFloat(svi[i].pocetak) < parseFloat(req.body['kraj']) && parseFloat(svi[i].kraj) > parseFloat(req.body['kraj'])) ||
					(parseFloat(svi[i].pocetak) < parseFloat(req.body['pocetak']) && parseFloat(svi[i].kraj) > parseFloat(req.body['pocetak'])) ||
					(parseFloat(svi[i].pocetak) > parseFloat(req.body['pocetak']) && parseFloat(svi[i].kraj) < parseFloat(req.body['kraj'])) ) 
				{							
					stanje = 0; 
				}
		}

		if(stanje == 1)  
		{
			poruka = "Aktivnost uspješno dodana!";
			fs.appendFile('aktivnosti.txt',novaLinija,function(err){ 
			if(err) throw err;
			
			});
		}
		else
		{
			poruka = "Aktivnost nije validna!";
		}
		res.write(JSON.stringify({message:poruka}));
		res.end(); 	
	});  	
});

const removeLines = (data, naziv) => {
	var postoji = 0;
	var linije  = data.split('\n');
	var novaLinija = "";

	for(i in linije)
	{
		if(linije[i].split(',')[0] != naziv && linije[i].split(',')[0] != '\n') 
		{
			novaLinija += (linije[i] + '\n');
		}
		else postoji++;
	}
    return [novaLinija,postoji];
}

app.delete('/v1/aktivnost/:naziv', function(req, res)
{	
	fs.readFile('aktivnosti.txt', 'utf8', (err, data) => { 
		if (err) res.json({message:"Greška - aktivnost nije obrisana!"});
		var ret = removeLines(data, req.params.naziv);
		fs.writeFile('aktivnosti.txt', ret[0], 'utf8', function(err) {
			if (ret[1] == 0) res.json({message:"Greška - aktivnost nije obrisana!"});  
			else res.json({message:"Aktivnost uspješno obrisana!"});
			res.end();
		});
	});
});

app.delete('/v1/predmet/:naziv', function(req, res)
{	
	fs.readFile('predmeti.txt', 'utf8', (err, data) => { 
		if (err)  res.json({message:"Greška - predmet nije obrisan!"});
		var ret = removeLines(data, req.params.naziv);
		fs.writeFile('predmeti.txt', ret[0], 'utf8', function(err) { 
			if (ret[1] == 0) res.json({message:"Greška - predmet nije obrisan!"});  
			else res.json({message:"Predmet uspješno obrisan!"});
		});
	});
});

app.delete('/v1/all', function(req, res)
{
	fs.writeFile('predmeti.txt', '', 'utf8', function(err) { 
		fs.writeFile('aktivnosti.txt', '', 'utf8', function(err) { 
			if (err) res.json({message:"Greška - sadržaj datoteka nije moguće obrisati!"});  
			res.json({message:"Sadržaj datoteke uspješno obrisan!"});
		});
	});
});

app.post('/v2/Aktivnost',function(req,res){
	db.Aktivnost.create({naziv: req.body.naziv, pocetak:req.body.pocetak, kraj:req.body.kraj}).then(function(r){   
		res.writeHead(200, {'Content-Type': 'application/json'});  
		res.end();
	})
});

app.get('/v2/Aktivnost',function(req,res){
	db.Aktivnost.findAll().then(function(r){
		var akt = [];
		for(var i = 0; i < r.length; i++)    akt.push(r[i].naziv); 
		res.write(JSON.stringify(akt));
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

app.post('/v2/Dan',function(req,res){
	db.Dan.create({naziv: req.body.naziv}).then(function(r){   
		res.writeHead(200, {'Content-Type': 'application/json'});  
		res.end();
	})
});
 
app.get('/v2/Dan',function(req,res){
	db.Dan.findAll().then(function(r){
		var d = [];
		for(var i = 0; i < r.length; i++)    d.push(r[i].naziv);  
		res.write(JSON.stringify(d))
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
    db.Grupa.findAll().then(function(r){
		var gr = [];
		for(var i = 0; i < r.length; i++)    gr.push(r[i].naziv);  
		res.write(JSON.stringify(gr))
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

app.post('/v2/Predmet',function(req,res){
	db.Predmet.create({naziv: req.body.naziv}).then(function(r){   
		res.writeHead(200, {'Content-Type': 'application/json'});  
		res.end();
	})
});

app.get('/v2/Predmet',function(req,res){
	db.Predmet.findAll().then(function(r){
		var pr = [];
		for(var i = 0; i < r.length; i++)    pr.push(r[i].naziv); 
		res.write(JSON.stringify(pr))
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
	
app.post('/v2/Student',function(req,res){
	db.Student.findAll({where:{index:req.body.index}}).then(function(r){
		var rez;
		if(r.length > 0) 
		{
			rez = "Student već postoji!!!";
			res.writeHead(200, {'Content-Type': 'application/json'});  
			res.write(JSON.stringify(rez));
			res.end();  
		}
		else db.Student.create({ime: req.body.ime, index:req.body.index}).then(function(r)
		{   
			rez = "Student uspješno dodan.";
			res.writeHead(200, {'Content-Type': 'application/json'}); 
			res.write(JSON.stringify(rez));
			res.end();  
		}) 
	});	
});

app.get('/v2/Student',function(req,res){
	db.Student.findAll().then(function(r){
		var pr = [];
		for(var i = 0; i < r.length; i++)    pr.push([r[i].ime,r[i].index]); 
		res.write(JSON.stringify(pr))
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

app.post('/v2/Tip',function(req,res){
    db.Tip.create({naziv: req.body.naziv}).then(function(r){   
        res.writeHead(200, {'Content-Type': 'application/json'}); 
        res.end();
    })
});

app.get('/v2/Tip',function(req,res){
    db.Tip.findAll().then(function(r){
		var tip = [];
		for(var i = 0; i < r.length; i++)    tip.push(r[i].naziv);  
		res.write(JSON.stringify(tip))
        res.end();        
    }); 
});

app.delete('/v2/Tip/:id',function(req,res){  
    db.Tip.findAll({where:{id:req.params.id}}).then(function(r){
		r.forEach(el => {el.destroy();});
        res.end();        
    });
});

app.put('/v2/Tip/:id',function(req,res){ 
    db.Tip.update({naziv: req.body.naziv},{where: {id:req.params.id}});
    res.end();          
});

module.exports = app.listen(3000);