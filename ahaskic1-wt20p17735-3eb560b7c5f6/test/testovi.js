let server = require('../sp3zad1');
let chai = require('chai');
const fs = require('fs'), readline = require('readline');
const csv = require('csv-parser');
let chaiHttp = require('chai-http');
var assert = require('assert');
const { json } = require('express');
const { debug } = require('console');
chai.should();
chai.use(chaiHttp);

let testData = class {
    constructor(metoda, url, body, output) {
      this.metoda = metoda;
      this.url = url;
      this.body = body;
      this.output = output;
    }
};
var readFile = function(filename){
    return fs.readFileSync(filename).toString();
}
var podaci = readFile("testniPodaci.txt");
var linije  = podaci.split('\n');

function runTest(obj) {
    var formatiraniPodaci = obj.split(",");
    if(formatiraniPodaci[0] == "DELETE" && formatiraniPodaci[1] == "/all")
    {
        describe("test delete",  () =>{
            describe("DELETE /all" , ()=>
            {
                it('brisanje',  ()=>
                {
                    chai.request(server)
                    .delete(formatiraniPodaci[1])
                    .end((err, res) =>
                    {
                        assert.strictEqual(JSON.stringify(res.body), formatiraniPodaci[3].replace(/\\/g,"").replace("\r",""));
                    });
                });
            });
        });
    }
    
    if(formatiraniPodaci[0] == "DELETE" && formatiraniPodaci[1].split("/")[1] == "aktivnost")
    {  
        describe("test delete",  () =>{
            describe("DELETE /aktivnost/:naziv" , ()=>
            {
                it('brisanje',  ()=>
                {
                    chai.request(server)
                    .delete(formatiraniPodaci[1])
                    .end((err, res) =>
                    {
                        assert.strictEqual(JSON.stringify(res.body), formatiraniPodaci[3].replace(/\\/g,"").replace("\r",""));
                    });
                });
            });
        });
    }

    if(formatiraniPodaci[0] == "DELETE" && formatiraniPodaci[1].split("/")[1] == "predmet")
    { 
        describe("test delete",  () =>{
            describe("DELETE /predmet/:naziv" , ()=>
            {
                it('brisanje',  ()=>
                {
                    chai.request(server)
                    .delete(formatiraniPodaci[1])
                    .end((err, res) =>
                    {
                        assert.strictEqual(JSON.stringify(res.body), formatiraniPodaci[3].replace(/\\/g,"").replace("\r",""));
                    });
                });
            });
        });
    }

    if(formatiraniPodaci[0] == "GET" && formatiraniPodaci[1] == "/predmeti")
    {
        describe("test get",  () =>{
            describe("GET /predmeti" , ()=>
            {
                it('get',  ()=>
                {
                    chai.request(server)
                    .get(formatiraniPodaci[1])
                    .end((err, res) =>
                    {
                        var rezultat ="[" + obj.split("[")[1];
                        assert.strictEqual(JSON.stringify(res.body), rezultat.replace(/\\/g,"").replace("\r",""));
                    });
                });
            });
        });
    }
    
    if(formatiraniPodaci[0] == "GET" && formatiraniPodaci[1].split("/")[1] == "predmet" && formatiraniPodaci[1].split("/")[3] =="aktivnost")
    {
        describe("test get predmet/:naziv/aktivnost",  () =>{
            describe("GET /predmet/:naziv/aktivnost" , ()=>
            {
                it('get',  ()=>
                {
                    chai.request(server)
                    .get(formatiraniPodaci[1])
                    .end((err, res) =>
                    {
                        var rezultat ="[" + obj.split("[")[1];
                        assert.strictEqual(JSON.stringify(res.body), rezultat.replace(/\\/g,"").replace("\r",""));
                    });
                });
            });
        });
    }

    if(formatiraniPodaci[0] == "GET" && formatiraniPodaci[1] == "/aktivnosti")
    {
        describe("test get",  () =>{
            describe("GET /aktivnosti" , ()=>
            {
                it('get',  ()=>
                {
                    chai.request(server)
                    .get(formatiraniPodaci[1])
                    .end((err, res) =>
                    {
                        var rezultat ="[" + obj.split("[")[1];
                        assert.strictEqual(JSON.stringify(res.body), rezultat.replace(/\\/g,"").replace("\r",""));
                    });
                });
            });
        });
    }

    if(formatiraniPodaci[0] == "POST" && formatiraniPodaci[1] == "/predmet")
    {
        describe("test post",  () =>{
            describe("POST /predmet" , ()=>
            {
                it('post',  ()=>
                {
                    chai.request(server)
                    .post(formatiraniPodaci[1])
                    .set('content-type', 'application/json')
                    .send((formatiraniPodaci[2].replace(/\\/g,"")))
                    .end((err, res) =>
                    {
                        assert.strictEqual(JSON.stringify(res.body), formatiraniPodaci[3].replace(/\\/g,"").replace("\r",""));
                    });
                });
            });
        });
    }

    if(formatiraniPodaci[0] == "POST" && formatiraniPodaci[1] == "/aktivnost")
    {
        describe("test post",  () =>{
            describe("POST /aktivnost" , ()=>
            {
                it('post',  ()=>
                {
                    var tijelo = obj.split("{")[1].split("}")[0].trim();
                    tijelo += "}";
                    var tijelo2 ="{";
                    tijelo2 += tijelo;
                    var konacnoTijelo = tijelo2.trim();
                    var rezultat = obj.split("{")[2];
                    var rez = "{" + rezultat;
                    chai.request(server)
                    .post(formatiraniPodaci[1])
                    .set('content-type', 'application/json')
                    .send(konacnoTijelo.replace(/\\/g,""))
                    .end((err, res) =>
                    {
                        assert.strictEqual(JSON.stringify(res.body), rez.replace(/\\/g,"").replace("\r",""));
                    });
                });
            });

        });
    }
}

describe("Testing routes", function () {
    for (let i = 0; i < linije.length ; i++) {
        var obj =linije[i];
        runTest(obj);
    }
});