function handleAktivnost(predmet, _tip, _pocetak, _kraj, _dan) {
  var predmeti; 
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) 
    {
      predmeti = JSON.parse(this.responseText); 
      var daLiPostojiPredmet = 0;
      for(i in predmeti)
      {
        if(predmeti[i].naziv == predmet) daLiPostojiPredmet = 1;
      }
      if(daLiPostojiPredmet == 0)
      {
        var ajaxDodajPredmet = new XMLHttpRequest;
        ajaxDodajPredmet.onreadystatechange = function() 
        {
        
          if (this.readyState == 4 && this.status == 200) 
          {
            var dodajAktivnost = new XMLHttpRequest;
            dodajAktivnost.onreadystatechange = function() 
            {
              document.getElementById("demo").innerHTML = "Uspješno dodani predmet i aktivnost!";
            }
            dodajAktivnost.open("POST", "http://localhost:3000/aktivnost", true);
            dodajAktivnost.setRequestHeader("Content-Type", "application/json");
            dodajAktivnost.send(JSON.stringify({naziv:predmet,tip:_tip,pocetak:_pocetak,kraj:_kraj,dan:_dan}));
          }
        }
        ajaxDodajPredmet.open("POST", "http://localhost:3000/predmet",true);
        ajaxDodajPredmet.setRequestHeader("Content-Type", "application/json");
        ajaxDodajPredmet.send(JSON.stringify({naziv:predmet}));
      }
      else 
      {
        var dodajAktivnost = new XMLHttpRequest;
        dodajAktivnost.onreadystatechange = function() 
        {
            document.getElementById("demo").innerHTML = "Predmet postoji, aktivnost uspješno dodana!";
        }
        dodajAktivnost.open("POST", "http://localhost:3000/aktivnost", true);
        dodajAktivnost.setRequestHeader("Content-Type", "application/json");
        dodajAktivnost.send(JSON.stringify({naziv:predmet,tip:_tip,pocetak:_pocetak,kraj:_kraj,dan:_dan}));
      }					
    }
  };

  ajax.open("GET","http://localhost:3000/predmeti",true);
  ajax.setRequestHeader("Content-Type", "application/json");
  ajax.send();
}