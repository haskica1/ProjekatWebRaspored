function  getGrupeAjax()  
{
   var gr;
   var ajax = new XMLHttpRequest();
   ajax.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200)   
       {
           gr = JSON.parse(this.responseText);
           var gr2 = document.getElementById('grupa');  
           var i = 1;
           for (var g in gr) {
               gr2.options[i++] = new Option(gr[g].naziv);   
           }
       }
   };
   ajax.open("GET","http://localhost:3000/v2/Grupa",true); 
   ajax.setRequestHeader("Content-Type", "application/json");
   ajax.send();
}

function dodajStudentaAjax(tekst,grupa)
{
    var student = csvJSON(tekst);
    document.getElementById('unosStudenta').value = student;
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) 
        {
            document.getElementById('unosStudenta').value = this.response.replaceAll("\"", "");   
        }   
    };
    ajax.open("POST","http://localhost:3000/v2/studentGrupa",true); 
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify({studenti: student, grupa:grupa}));
}

function parseCSV(tekst)
{
   var redovi = tekst.split("\n");
   var vratiti = [];
   for(var i in redovi)
   {
       var naziv = redovi[i].split(",")[0];
       var indeks = redovi[i]. split(",")[1];
       vratiti.push([naziv,indeks]);
   }
   return vratiti;
}

function csvJSON(csv){
    var redovi=csv.split("\n");
    var vratiti = [];
    var zaglavlje=["ime","index"];
    for(var i=0;i<redovi.length;i++){
        var obj = {};
        var red=redovi[i].split(",");
        for(var j=0;j<zaglavlje.length;j++){
            obj[zaglavlje[j]] = red[j];
        }
        vratiti.push(obj);
    }
    return JSON.stringify(vratiti);
 }