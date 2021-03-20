
window.onload=function(){


    let okvir=document.getElementById("tabela");
    iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],8,21);

    dodajAktivnost(okvir,"WT","predavanje",8,12,"Ponedjeljak");
    dodajAktivnost(okvir,"WT","vježbe",17,21,"Ponedjeljak");

    dodajAktivnost(okvir,"RG","predavanja",12,15,"Utorak");
    dodajAktivnost(okvir,"RG","vježbe",15,17,"Utorak");

    dodajAktivnost(okvir,"OIS","predavanja",10.5,12,"Srijeda");
    dodajAktivnost(okvir,"OIS","vježbe",12.5,17.5,"Srijeda");
    dodajAktivnost(okvir,"DM","predavanja",18,20.5,"Srijeda");
    
    dodajAktivnost(okvir,"OOI","predavanja",8,21,"Četvrtak");

    dodajAktivnost(okvir,"VVS","predavanja",12,15,"Petak");
    //termin ispisuje gresku u alertu
    dodajAktivnost(okvir,"VVS","vježbe",13,17,"Petak");
    
    var body = document.getElementsByTagName('body');
    body.innerHTML = "<br>";

    let okvir2=document.getElementById("tabela2");
    iscrtajRaspored(okvir2,["Ponedjeljak","Utorak","Srijeda"],6,24);

    dodajAktivnost(okvir2,"WT","predavanje",6,9,"Ponedjeljak");
    dodajAktivnost(okvir2,"WT","vježbe",9,12,"Ponedjeljak");
    dodajAktivnost(okvir2,"VVS","predavanje",12,15,"Ponedjeljak");
    dodajAktivnost(okvir2,"VVS","vježbe",15,18,"Ponedjeljak");
    dodajAktivnost(okvir2,"OOI","predavanje",18,21,"Ponedjeljak");
    dodajAktivnost(okvir2,"OOI","vježbe",21,24,"Ponedjeljak");

    dodajAktivnost(okvir2,"RG","predavanja",12,15,"Utorak");
    dodajAktivnost(okvir2,"RG","vježbe",15,17,"Utorak");

    dodajAktivnost(okvir2,"PWS","predavanja",10.5,12,"Srijeda");
    dodajAktivnost(okvir2,"OIS","predavanja",11,13,"Srijeda");


    }