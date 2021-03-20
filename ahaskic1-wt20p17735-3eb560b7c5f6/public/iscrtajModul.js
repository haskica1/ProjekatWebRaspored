var Modul = (function (){
    
    var iscrtajRaspored = function(div,dani,satPocetak,satKraj){

        if(div == null){
             alert("Greska, nije moguuce napraviti raspored u proslijedjenom parametru!!!");
             return false;
        }
        if(satPocetak>=satKraj || !Number.isInteger(satPocetak) || !Number.isInteger(satKraj) || (satKraj < 0 || satKraj > 24) || (satPocetak < 0 || satPocetak >24)){
            div.innerHTML = "Greska";
            return false;
        }
        var sati = [0,2,4,6,8,10,12,15,17,19,21,23];
        var table = document.createElement('table');
        for(var row = 1; row <= dani.length + 1; row +=1){
            var rowTable = document.createElement('tr');
            if(row == 1 ){
                for(var col = 0 ; col <= satKraj; col+=1){
                    if(col >= satPocetak && col < satKraj)
                    {
                        var colTable = document.createElement('td');
                        var p = document.createElement('p');
                        if(sati.indexOf(col)>0 || col == 0){
                            if(col < 10){
                                p.innerHTML = "0" + col + ":00";
                            }else{
    
                                p.innerHTML =  col + ":00";
                            }
                        }
                        colTable.setAttribute("class","sati");
                        colTable.style.borderTop = 'none';
                        colTable.style.borderBottom = 'none';
                        colTable.style.borderLeft = 'none';
                        colTable.style.borderRight = 'none';
                        colTable.style.height = '10px';
                        colTable.style.verticalAlign = 'bottom';
                        colTable.setAttribute("colspan","2");   
                        p.style.textAlign = 'center';
                        colTable.appendChild(document.createTextNode('\u0020'));
                        colTable.appendChild(p);
                        rowTable.appendChild(colTable);
                    }else{
                        continue;
                    }
                }
            }else {
                for(var col = 1 ; col <= ((satKraj-satPocetak) * 2 ) + 1; col+=1)
                {
                    
                        var colTable = document.createElement('td');
                        var p = document.createElement('p');
                        
                        colTable.style.backgroundColor = '#d9d9d9';
                        if(col % 2 == 0){
                            colTable.setAttribute("class","prazna");
                            colTable.style.borderRight = '1px dashed black';
                        }else if(col % 2 == 1){
                            colTable.setAttribute("class","prazna");
                            colTable.style.borderRight = '1px solid black';
                        }
                        if(col == 1){
                            
                            colTable.style.borderTop = 'none';
                            colTable.style.borderBottom = 'none';
                            if(row != 1){
                                colTable.setAttribute("class","dani");
                                p.innerHTML =  dani[row-2];
                                colTable.style.textAlign= 'right';
                                colTable.style.backgroundColor = 'white';
                            }else colTable.setAttribute("class","prazna");
                        }
                    colTable.appendChild(document.createTextNode('\u0020'));
                    colTable.appendChild(p);
                    rowTable.appendChild(colTable); 
                }
            }
            table.appendChild(rowTable);
        }
        div.appendChild(table);
        return true;
    }

    var dodajAktivnost = function(raspored, naziv, tip, vrijemePocetak, vrijemeKraj,dan){

            if(raspored == null){
                alert("Greška - raspored nije kreiran");
                return false;
            }

            var ras = document.getElementById(raspored.id).children;
            var stringPocetnogVremena = ras[0].rows[0].cells[0].children[0].textContent;
            if(stringPocetnogVremena == ""){
                stringPocetnogVremena = ras[0].rows[0].cells[1].children[0].textContent;
                var pocetakRasporeda = parseInt(stringPocetnogVremena);
                pocetakRasporeda -= 1;
            }
            else 
                var pocetakRasporeda = parseInt(stringPocetnogVremena);

            var krajRasporeda = Number.parseInt(ras[0].rows[0].cells.length) + pocetakRasporeda;
            var trajanjeRasporeda = krajRasporeda-pocetakRasporeda;
            var stanjeDan = false;
            var stanjeVrijeme = true;
            var trajenje = vrijemeKraj - vrijemePocetak;
            trajenje *= 2;

            var temp = 0;

            for (var r = 0, n = ras[0].rows.length; r < n; r+=1) {
                if(ras[0].rows[r].cells[0].children[0].textContent == dan){
                    stanjeDan = true;

                    for (var c = 0, m = ras[0].rows[r].cells.length; c < m; c+=1) {


                        if(ras[0].rows[r].cells[c].style.backgroundColor == 'lavender')
                        {
                            temp += Number.parseInt(ras[0].rows[r].cells[c].getAttribute("colspan"));
                            temp--;
                        }
                        
                        if((vrijemePocetak*2)-(pocetakRasporeda*2)+1 -temp == c )
                        {
                            for(var k = c; k < c+trajenje; k+=1){
                            
                                if(ras[0].rows[r].cells[k].style.backgroundColor == 'lavender'){
                                    stanjeVrijeme = false;
                                    break;
                                }
                            }
                            if(!stanjeVrijeme){
                                alert("Greška - već postoji termin u rasporedu u zadanom vremenu");
                                return false;
                            } else {

                                ras[0].rows[r].cells[c].setAttribute("colspan",trajenje);
                                ras[0].rows[r].cells[c].style.backgroundColor = 'lavender';
                                ras[0].rows[r].cells[c].innerHTML = naziv + "<br>" + tip;
                                ras[0].rows[r].cells[c].style.textAlign = 'center';
                                ras[0].rows[r].cells[c].setAttribute("class","puna");
                                for(var k = c + 1 ; k < c + trajenje; k+=1){
                                    ras[0].rows[r].deleteCell(c+1);
                                }
                                if(Number.isInteger(vrijemeKraj) && Number.isInteger(vrijemePocetak)){
                                    ras[0].rows[r].cells[c].setAttribute("class","punapuna");
                                    ras[0].rows[r].cells[c].style.borderRight = '1px solid black';
                                    ras[0].rows[r].cells[c].style.borderLeft = '1px solid black';
                                }else if(Number.isInteger(vrijemePocetak) && !Number.isInteger(vrijemeKraj)){
                                    ras[0].rows[r].cells[c].setAttribute("class","punaiscrtana");
                                    ras[0].rows[r].cells[c].style.borderLeft = '1px solid black';
                                    ras[0].rows[r].cells[c].style.borderRight = '1px dashed black';
                                }else if(!Number.isInteger(vrijemePocetak) && Number.isInteger(vrijemeKraj)){
                                    ras[0].rows[r].cells[c].setAttribute("class","iscrtanapuna");
                                    ras[0].rows[r].cells[c].style.borderLeft = '1px dashed black';
                                    ras[0].rows[r].cells[c].style.borderRight = '1px solid black';
                                }else if(!Number.isInteger(vrijemePocetak) && !Number.isInteger(vrijemeKraj)){
                                    ras[0].rows[r].cells[c].setAttribute("class","iscrtanaiscrtana");
                                    ras[0].rows[r].cells[c].style.borderLeft = '1px dashed black';
                                    ras[0].rows[r].cells[c].style.borderRight = '1px dashed black';
                                }
                                stanjeVrijeme= false;
                                break;
                            }             
                        }
                    }
                    if(stanjeVrijeme){
                        alert("Greška - već postoji termin u rasporedu u zadanom vremenu");
                        return false;
                    }else   break;
                }
            }
            if(!stanjeDan){
                alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
                return false;
            }
            return true;
        }

    return {
        iscrtajRaspored : iscrtajRaspored,
        dodajAktivnost : dodajAktivnost
    }
}());

//treba izbrisati komentar ako se ne koriste testovi i ako zelimo da koristimo modul
/*
let okvir=document.getElementById("tabela");
Modul.iscrtajRaspored(okvir,["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"],8,21);
Modul.dodajAktivnost(okvir,"WT","predavanje",8,12,"Ponedjeljak");
Modul.dodajAktivnost(okvir,"WT","vježbe",17,21,"Ponedjeljak");
Modul.dodajAktivnost(okvir,"RG","predavanja",12,15,"Utorak");
Modul.dodajAktivnost(okvir,"RG","vježbe",15,17,"Utorak");
Modul.dodajAktivnost(okvir,"OIS","predavanja",10.5,12,"Srijeda");
Modul.dodajAktivnost(okvir,"OIS","vježbe",12.5,17.5,"Srijeda");
Modul.dodajAktivnost(okvir,"DM","predavanja",18,20.5,"Srijeda");
Modul.dodajAktivnost(okvir,"OOI","predavanja",8,21,"Četvrtak");
Modul.dodajAktivnost(okvir,"VVS","predavanja",12,15,"Petak");
Modul.dodajAktivnost(okvir,"VVS","vježbe",13,17,"Petak");

let okvir2 = document.getElementById("tabela2");
Modul.iscrtajRaspored(okvir2,["Ponedjeljak","Utorak","Srijeda"],6,24);
Modul.dodajAktivnost(okvir2,"WT","predavanje",6,9,"Ponedjeljak");
Modul.dodajAktivnost(okvir2,"WT","vježbe",9,12,"Ponedjeljak");
Modul.dodajAktivnost(okvir2,"VVS","predavanje",12,15,"Ponedjeljak");
Modul.dodajAktivnost(okvir2,"VVS","vježbe",15,18,"Ponedjeljak");
Modul.dodajAktivnost(okvir2,"OOI","predavanje",18,21,"Ponedjeljak");
Modul.dodajAktivnost(okvir2,"OOI","vježbe",21,24,"Ponedjeljak");
Modul.dodajAktivnost(okvir2,"RG","predavanja",12,15,"Utorak");
Modul.dodajAktivnost(okvir2,"RG","vježbe",15,17,"Utorak");
Modul.dodajAktivnost(okvir2,"PWS","predavanja",10.5,12,"Srijeda");
Modul.dodajAktivnost(okvir2,"OIS","predavanja",11,13,"Srijeda");

*/
