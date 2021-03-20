let assert = chai.assert;
describe('Modul', function() {
 describe('iscrtajRaspored()', function() {
   it('tabela mora imati 6 redova', function() {
        let okvir=document.getElementById("ispis");
        okvir.innerHTML = "";
        Modul.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],8,21);
        let tabele = document.getElementsByTagName("table");
        let tabela = tabele[tabele.length-1]
        let redovi = tabela.getElementsByTagName("tr");
        assert.equal(redovi.length,6,"Broj redova treba biti 6");
        okvir.innerHTML = "";
   });

   it('iscrtati raspored ako je okvir null, rezultat test mora pasti', function() {
        let okvir = null;
        assert.equal(Modul.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],8,21),true);
        okvir.innerHTML = "";
   });

   it('ne smije se iscrtati tabela ako je vrijeme nije validno', function() {
        let okvir = document.getElementById("ispis");
        okvir.innerHTML = "";
        Modul.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],12,11);
        assert.equal(okvir.textContent ,"Greska");
        okvir.innerHTML = "";
   });

   it('vrijeme pocetka i kraja moraju biti cjelobrojne vrijednosti', function() {
        let okvir = document.getElementById("ispis");
        okvir.innerHTML = "";
        Modul.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],8.5,20.5);
        assert.equal(okvir.textContent ,"Greska");
        okvir.innerHTML = "";
   });

   it('raspored koji ima samo jedan sat', function() {
        let okvir = document.getElementById("ispis");
        okvir.innerHTML = "";
        Modul.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],8,9);
        let tabele = document.getElementsByTagName("table");
        let tabela = tabele[tabele.length-1]
        let redovi = tabela.getElementsByTagName("tr");
        let kolone = redovi[1].getElementsByTagName("td");
        assert.equal(kolone.length,3,"Broj kolona treba biti 3");
        okvir.innerHTML = "";
   });

   it('raspored koji ima samo jedan dan', function() {
        let okvir = document.getElementById("ispis");
        okvir.innerHTML = "";
        Modul.iscrtajRaspored(okvir,["Ponedjeljak"],8,9);
        let tabele = document.getElementsByTagName("table");
        let tabela = tabele[tabele.length-1]
        let redovi = tabela.getElementsByTagName("tr");
        assert.equal(redovi.length,2,"Broj redova treba biti 2");
        okvir.innerHTML = "";
   });

   it('vrijeme pocetka mora biti vece od 0', function() {
        let okvir = document.getElementById("ispis");
        okvir.innerHTML = "";
        Modul.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],-1,20);
        assert.equal(okvir.textContent ,"Greska");
        okvir.innerHTML = "";
   });

   it('vrijeme kraja mora biti manje od 24', function() {
        let okvir = document.getElementById("ispis");
        okvir.innerHTML = "";
        Modul.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],8, 26);
        assert.equal(okvir.textContent ,"Greska");
        okvir.innerHTML = "";
   });
   
   it('vrijeme pocetka i vrijeme kraja ne smiju biti isti', function() {
        let okvir = document.getElementById("ispis");
        okvir.innerHTML = "";
        Modul.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],8, 8);
        assert.equal(okvir.textContent ,"Greska");
        okvir.innerHTML = "";
   });

   it('moze se kreirati raspored za citavu sedmicu od 0 do 24', function() {
        let okvir = document.getElementById("ispis");
        okvir.innerHTML = "";
        Modul.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak", "Subota", "Nedjelja"],0,24);
        let tabele = document.getElementsByTagName("table");
        let tabela = tabele[tabele.length-1]
        let redovi = tabela.getElementsByTagName("tr");
        let kolone = redovi[1].getElementsByTagName("td");
        assert.equal(redovi.length,8,"Broj redova treba biti 8 tj. sedam dana i jedan za sate");
        assert.equal((kolone.length-1)/2,24,"Broj kolona treba biti 24");
        okvir.innerHTML = "";
   });

 });

 describe('dodajAktivnost()', function() {

    it('omogucavanje dodavanja bilo koje aktivnosti', function() {

        let okvir = document.getElementById("ispis");
        okvir.innerHTML = "";
        Modul.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],8, 20);
        Modul.dodajAktivnost(okvir,"WT","predavanje",9,12,"Ponedjeljak");
        okvir.innerHTML = "";
    });

    it('omogucavanje dodavanja aktivnosti tako da tan bude popunjen', function() {

        let okvir = document.getElementById("ispis");
        okvir.innerHTML = "";
        Modul.iscrtajRaspored(okvir,["Ponedjeljak"],8, 20);
        Modul.dodajAktivnost(okvir,"WT","predavanje",8,11,"Ponedjeljak");
        Modul.dodajAktivnost(okvir,"WT","vjezbe",11,14,"Ponedjeljak");
        Modul.dodajAktivnost(okvir,"RG","predavanje",14,17,"Ponedjeljak");
        Modul.dodajAktivnost(okvir,"RG","vjezbe",17,20,"Ponedjeljak");
        okvir.innerHTML = "";
    });

    it('omogucavanje dodavanja aktivnosti na u zauzeti termin v1, rezultat test mora pasti', function() {
        let okvir = document.getElementById("ispis");
        okvir.innerHTML = "";
        Modul.iscrtajRaspored(okvir,["Ponedjeljak"],8, 20);
        Modul.dodajAktivnost(okvir,"WT","predavanje",8,11,"Ponedjeljak");
        assert.equal(Modul.dodajAktivnost(okvir,"WT","vjezbe",9,14,"Ponedjeljak"),true);
        okvir.innerHTML = "";

    });

    it('omogucavanje dodavanja aktivnosti na u zauzeti termin v2, rezultat test mora pasti', function() {
        let okvir = document.getElementById("ispis");
        okvir.innerHTML = "";
        Modul.iscrtajRaspored(okvir,["Ponedjeljak"],8, 20);
        Modul.dodajAktivnost(okvir,"WT","predavanje",8,15,"Ponedjeljak");
        assert.equal(Modul.dodajAktivnost(okvir,"WT","vjezbe",9,14,"Ponedjeljak"),true);
        okvir.innerHTML = "";
    });

    it('omogucavanje dodavanja aktivnosti na u zauzeti termin v3, rezultat test mora pasti', function() {

        let okvir = document.getElementById("ispis");
        okvir.innerHTML = "";
        Modul.iscrtajRaspored(okvir,["Ponedjeljak"],8, 20);
        Modul.dodajAktivnost(okvir,"WT","predavanje",8,15,"Ponedjeljak");
        assert.equal(Modul.dodajAktivnost(okvir,"WT","vjezbe",9,11,"Ponedjeljak"),true);
        okvir.innerHTML = "";
    });

    it('omogucavanje dodavanja aktivnosti na termin koji ne pocinje i ne zavrsava na cjelobrojnu vrijednost sata', function() {

        let okvir = document.getElementById("ispis");
        okvir.innerHTML = "";
        Modul.iscrtajRaspored(okvir,["Ponedjeljak"],8, 20);
        Modul.dodajAktivnost(okvir,"WT","predavanje",8.5,15.5,"Ponedjeljak");
        okvir.innerHTML = "";
    });

    it('omogucavanje dodavanja aktivnosti koja traje citav dan', function() {

        let okvir = document.getElementById("ispis");
        okvir.innerHTML = "";
        Modul.iscrtajRaspored(okvir,["Ponedjeljak"],8, 20);
        Modul.dodajAktivnost(okvir,"WT","predavanje",8,20,"Ponedjeljak");
        okvir.innerHTML = "";
    });

    it('omogucavanje dodavanja aktivnosti na dan koji nema u rasoredu, rezultat test mora pasti', function() {

        let okvir = document.getElementById("ispis");
        okvir.innerHTML = "";
        Modul.iscrtajRaspored(okvir,["Ponedjeljak"],8, 20);
        assert.equal(Modul.dodajAktivnost(okvir,"WT","predavanje",8,20,"Utorak"),true);
        okvir.innerHTML = "";
    });

    it('omogucavanje dodavanja aktivnosti koje su date kao primjer na spirali 2', function() {

        let okvir = document.getElementById("ispis");
        okvir.innerHTML = "";
        Modul.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],8,21);
        Modul.dodajAktivnost(okvir,"WT","predavanje",9,12,"Ponedjeljak");
        Modul.dodajAktivnost(okvir,"WT","vježbe",12,13.5,"Ponedjeljak");
        Modul.dodajAktivnost(okvir,"RMA","predavanje",14,17,"Ponedjeljak");
        Modul.dodajAktivnost(okvir,"RMA","vježbe",12.5,14,"Utorak");
        Modul.dodajAktivnost(okvir,"DM","tutorijal",14,16,"Utorak");
        Modul.dodajAktivnost(okvir,"DM","predavanje",16,19,"Utorak");
        Modul.dodajAktivnost(okvir,"OI","predavanje",12,15,"Srijeda");
        okvir.innerHTML = "";

    });

    it('red bi trebao biti duzine 2', function() {

        let okvir = document.getElementById("ispis");
        okvir.innerHTML = "";
        Modul.iscrtajRaspored(okvir,["Ponedjeljak"],8, 20);
        Modul.dodajAktivnost(okvir,"WT","predavanje",8,20,"Ponedjeljak");
        let tabele = document.getElementsByTagName("table");
        let tabela = tabele[tabele.length-1]
        let redovi = tabela.getElementsByTagName("tr");
        let kolone = redovi[1].getElementsByTagName("td");
        assert.equal(kolone.length,2,"Broj kolona treba biti 2");
        okvir.innerHTML = "";
    });

 });
});
