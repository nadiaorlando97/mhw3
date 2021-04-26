var Json;
init();

function init(){
  
  /*nascondo la sezione Preferiti all'inizio */
  if (document.querySelectorAll('#sectionPref div').length==0) {  
    let p = document.getElementById("sezionePreferiti");
    p.classList.add('hidden');
  }

  //Bottone informazioni Covid
  const btnInfocovid = document.getElementById("btnInfo");
  btnInfocovid.addEventListener('click',inforCorona);

  //Bottone informazioni Meteo
  const btnInfoMeteo = document.getElementById("btnInfoMeteo");
  btnInfoMeteo.addEventListener('click',inforMeteo);

  createGrid();
}

/*creo i vari elementi della griglia*/
function createGrid() { 

  let section = document.getElementById("grid");

  for(let i=0; i < listTitolo.length; i++) {

    const box = document.createElement('div');
    box.id = i;
    box.classList.add("visible"); 
    
    const titolo = document.createElement('h1');
    titolo.textContent = listTitolo[i];

    const immagine = document.createElement('img');
    immagine.src = listImmagine[i];

    const pref = document.createElement('img');
    pref.id = "heart";
    pref.src = listPreferiti[0];
    pref.addEventListener('click',insertPref);
  
    const descrizione = document.createElement('p');
    descrizione.textContent = listDescrizione[i];
    
    descrizione.style.visibility="hidden";

    const dettagli = document.createElement('button');
    dettagli.id = "btnDetails";
    dettagli.textContent = 'Clicca per piu dettagli';
    dettagli.addEventListener('click',mostraDettagli);

    section.appendChild(box);
    box.appendChild(titolo);
    box.appendChild(immagine);
    box.appendChild(pref);
    box.appendChild(descrizione);
    box.appendChild(dettagli);
  }
}

/*Inserisco nella sezione Preferiti*/
function insertPref(event){  

  const pref = event.currentTarget;

  /*Cambio l'immagine del cuore*/
  pref.src=listPreferiti[1]; 
  pref.removeEventListener('click', insertPref);
  pref.addEventListener('click', removePref);
  
  /*Rendo visibile la sezione Preferiti nel caso in cui quello che inserisco è il primo dei Preferiti*/
  if(document.querySelectorAll('#sectionPref div').length==0){  
    sezionePreferiti.classList.remove('hidden');
    sezionePreferiti.classList.add('visible');
  }

  /*Seleziono il nodo 'padre' e la sezione dove voglio inserire il nodo,
  Poi inserisco il nodo nella sezione Preferiti.*/ 

  var source = pref.parentNode; 
  let section = document.getElementById("sectionPref"); 

  insertIntoPref(section,source);
}

/*Rimuovo dalla sezione Preferiti*/
function removePref(event) { 
  
  const pref = event.currentTarget;
  
  /*Cambio l'immagine del cuore*/
  pref.src = listPreferiti[0]; 
  pref.removeEventListener('click', removePref);
  pref.addEventListener('click',insertPref);

  /*Seleziono il nodo 'padre' e trovo l'id. 
  Seleziono tutti i div della sezione Preferiti,
  li scorro e se trovo un div con lo stesso id lo rimuovo.*/

  var source = pref.parentNode; 
  var idSource = source.id; 
  const boxes = document.querySelectorAll('#sectionPref div'); 
  for(const box of boxes){ 
    if (box.id==idSource){ 
      box.remove();
      break;
    }
  }
  
  /*Poichè ho reso cliccabile il cuore nella sezione Preferiti, se l'utente elimina
  il preferito cioè clicca sul cuore, devo aggiornare il corrispettivo elemento della sezione
  "Tutti gli elementi".*/
  
  const griglia = document.querySelectorAll('#grid div'); 
  for(const div of griglia) {  
    if(div.id == idSource) {
      div.childNodes[2].src = listPreferiti[0];
      div.childNodes[2].removeEventListener('click',removePref); 
      div.childNodes[2].addEventListener('click',insertPref);
    }
  }
  
   /*Nascondo la sezione Preferiti*/
  if (document.querySelectorAll('#sectionPref div').length==0) {  
    let p = document.getElementById("sezionePreferiti");
    p.classList.add('hidden');
  }
}

/*Per effettuare la ricerca, porto il contenuto della casella di testo in minuscolo
per non avere errori di case sensitive. 
Poi seleziono tutti i div della griglia, li scorro, individuo il titolo e lo porto
in minuscolo per non avere errori di case sensitive.*/ 
function cerca(){
  var x = document.getElementById("ricerca");
  var input = x.value.toLowerCase();
  
  if (input!=""){
    const boxes = document.querySelectorAll('#grid div');  
    
    for(const box of boxes){ 
      let titolo = box.childNodes[0].textContent; 
      titolo = titolo.toLowerCase(); 

      if (!titolo.startsWith(input)) {
        box.classList.remove('visible');
        box.classList.add('hidden');  /*nascondo il div*/ 
      } else{
        box.classList.remove('hidden'); /*lo rendo visibile*/
        box.classList.add('visible');
      }
    }
  }else {
    const boxes = document.querySelectorAll('#grid div');
    for(const box of boxes){ 
      box.classList.remove('hidden');
      box.classList.add('visible');
    } 
  }
}

/*Ho usato visibility anzichè display in modo da allocare lo spazio ma 
non renderlo visibile*/
function mostraDettagli(event){

  let button = event.currentTarget;
  let parent = button.parentNode;

  button.textContent = "Nascondi dettagli";
  parent.childNodes[3].style.visibility= "visible";
  button.removeEventListener('click',mostraDettagli);
  button.addEventListener('click',nascondiDettagli);

}

function nascondiDettagli(event){

  let button=event.currentTarget; 
  let parent = button.parentNode;

  button.textContent="Clicca per piu dettagli";
  parent.childNodes[3].style.visibility= "hidden";
  button.removeEventListener('click',nascondiDettagli);
  button.addEventListener('click',mostraDettagli);
}

/*creo la copia del nodo da inserire nei Preferiti*/
function insertIntoPref(section,source) {
  const box = document.createElement('div');
  box.id = source.id;
 
  const titolo = document.createElement('h1');
  titolo.textContent = source.childNodes[0].textContent;

  const immagine = document.createElement('img');
  immagine.src = source.childNodes[1].src;

  const pref = document.createElement('img');
  pref.id = "heart";
  pref.src =  source.childNodes[2].src;
  pref.addEventListener('click',removePref);

  const descrizione = document.createElement('p');
  descrizione.style.visibility="hidden";
  descrizione.id="descrizionePref";
  descrizione.textContent = source.childNodes[3].textContent;

  const dettagli = document.createElement('button');
  dettagli.textContent = 'Clicca per piu dettagli';
  dettagli.addEventListener('click',mostraDettagli);

  box.appendChild(titolo);
  box.appendChild(immagine);
  box.appendChild(pref);
  box.appendChild(descrizione);
  box.appendChild(dettagli);
  section.appendChild(box);
}


/*Covid-19
L'API che ho utilizzato mi permette di interfacciarmi con un servizio chiamato "Covid-19"
per il quale non è prevista nessuna autenticazione.
La richiesta è HTTP GET e la risposta è in formato json. 
Il json contiene le informazione relative al Covid di 190 Stati e anche le informazioni globali.
Creo una lista vuota e la riempio con i nomi dei vari Stati presenti nel json.
Questa lista servirà poi per permettere all'utente di scegliere tramite interfaccia,
lo Stato di cui desidera avere le informazioni.
Io permetto di far scegliere lo Stato tramite una "select". Tramite l'evento della select "onchange",
ho la possibilità di capire quale Paese è stato scelto dall'utente, cerco le informazioni relative a quel
Paese all'interno del json e mostro i dati a schermo.
Oltre a mostrare i dati relativi allo Stato selezionato dall'utente, mostro sempre anche le informazioni 
a livello gloabale sul Covid-19. 
Per rendere più comprensibili i dati del json, sia quelli globali che quelli relativi ai vari Stati,
li ho tradotti in Italiano e formattati in modo corretto.
*/

function inforCorona(){
  const corona_api_endpoint = 'https://api.covid19api.com/summary';
  fetch(corona_api_endpoint).then(onResponse).then(onJson);
}

function onResponse(response) {
  return response.json();
}

function onJson(json) {
  Json = json;
  console.log(json);

  const section = document.getElementById("sectionInfoCorona");
  section.classList.remove('hidden');
  section.classList.add('visible');

  //Creo lista Stati
  let list=[];
  for( index in json.Countries){
    list.push(json.Countries[index].Country);
  }
  
  const sect = document.getElementById("selectCountry");
  for(country of list){
    const elemento = document.createElement('option');
    elemento.id="option";
    elemento.value=country;
    elemento.textContent = country;
    sect.appendChild(elemento);
  }

  //Global
  const global= json.Global;
  
  const infoGlobal = document.getElementById("infoGlobal");
  
  const divInfo = document.createElement('div');
  divInfo.id="divInfo";
  
  const elemento = document.createElement('h1');
  elemento.textContent = "Informazioni globali" ;
  divInfo.appendChild(elemento);
  
  for(info in global){
    const elemento = document.createElement('h2');

    if(info=="Date"){
      elemento.textContent = 'Data: ' +  Json.Countries[index][info].split("T")[0];
    } 
    if(info == 'NewConfirmed') {
      elemento.textContent = 'Nuovi casi confermati: ' + Json.Global[info];
    }
    if(info == 'NewDeaths') {
      elemento.textContent = 'Nuovi deceduti: ' + Json.Global[info];
    }
    if(info == 'NewRecovered') {
      elemento.textContent = 'Nuovi ricoveri: ' + Json.Global[info];
    }
    if(info == 'TotalConfirmed') {
      elemento.textContent = 'Totale casi confermati: ' + Json.Global[info];
    }
    if(info == 'TotalDeaths') {
      elemento.textContent = 'Totale deceduti: ' + Json.Global[info];
    }
    if(info == 'TotalRecovered') {
      elemento.textContent = 'Totale ricoveri: ' +  Json.Global[info]; 
    }
    divInfo.appendChild(elemento);
  }
  infoGlobal.appendChild(divInfo); 
  
  const btnInfocovid = document.getElementById("btnInfo");
  btnInfocovid.removeEventListener('click',inforCorona);
  btnInfocovid.addEventListener('click',closeInfo);

}

function closeInfo(){
  
  const element = document.getElementById('divInfoCountry');
  if(element!=null){
    element.remove();
  }
  const divInfo = document.getElementById('divInfo');
  divInfo.remove();

  const sectionCorona = document.getElementById("sectionInfoCorona");
  sectionCorona.classList.remove('visible');
  sectionCorona.classList.add('hidden');
  
  const btnInfocovid = document.getElementById("btnInfo");
  btnInfocovid.removeEventListener('click',closeInfo);
  btnInfocovid.addEventListener('click',inforCorona);
}

function infoCountry(){ 
  
  const element = document.getElementById('divInfoCountry');
  if(element!=null){
    element.remove();
  }

  var tipo = document.getElementById("selectCountry");
  const country = tipo.value;
  
  for( index in Json.Countries)
  {
    if(Json.Countries[index].Country == country){
      
      const div = document.getElementById("infoCountry");
  
      const divInfo = document.createElement('div');
      divInfo.id="divInfoCountry";

      const elemento = document.createElement('h1');
      elemento.textContent = "Informazioni "+ country;
      divInfo.appendChild(elemento);
      
      for(info in Json.Countries[index]){
        if (info == "ID" || info == "Premium"){
          continue;
        }
        const elemento = document.createElement('h2');
        
        if(info=="Date"){
          elemento.textContent = 'Data: ' +  Json.Countries[index][info].split("T")[0] ;
        } 
        if(info == 'Country') {
          elemento.textContent = 'Stato: ' + Json.Countries[index][info];
        }
        if(info == 'CountryCode') {
          elemento.textContent = 'Prefisso internazionale: ' + Json.Countries[index][info];
        }
        if(info == 'NewConfirmed') {
        elemento.textContent = 'Nuovi casi confermati: ' + Json.Countries[index][info];
        }
        if(info == 'NewRecovered') {
          elemento.textContent = 'Nuovi ricoveri: ' + Json.Countries[index][info];
          }
        if(info == 'NewDeaths') {
          elemento.textContent = 'Nuovi deceduti: ' + Json.Countries[index][info];
          }
        if(info == 'TotalConfirmed') {
          elemento.textContent = 'Totale casi confermati: ' + Json.Countries[index][info];
          }
        if(info == 'TotalDeaths') {
          elemento.textContent = 'Totale deceduti: ' + Json.Countries[index][info];
          }
        if(info == 'TotalRecovered') {
          elemento.textContent = 'Totale ricoveri: ' +  Json.Countries[index][info]; 
          } 
        divInfo.appendChild(elemento);
      }
      div.appendChild(divInfo);
    }
  }
}


/*Meteo
L'API che ho utilizzato mi permette di interfacciarmi con un servizio chiamato "OpenWeather", 
il quale fornisce informazioni relative al meteo e per il quale è prevista un'autenticazione con API key
che ho ottenuto registrandomi al servizio.
La richiesta è HTTP GET e la risposta è in formato json.
Nella richiesta HTTP oltre ad inserire la chiave di autenticazione, ho inserito anche la città di cui
desidero avere le informazioni meteo. In questo caso ho scelto come città Catania.
Nel json, quindi, arriveranno solo le informazioni relative al meteo di Catania 
che poi mostro all'interno dell'interfaccia.
Per rendere più comprensibili i dati del json, li ho tradotti in Italiano e formattati in modo corretto.
*/

function inforMeteo() {
  APIkey = '0c9ca3df42eda585a44501afb92cc5ec';
  city_name = 'Catania';
  const meteo_api_endpoint = 'http://api.openweathermap.org/data/2.5/weather?q=' + city_name + '&appid=' + APIkey; 
  fetch(meteo_api_endpoint).then(onResponseMeteo).then(onJsonMeteo);
}

 function onResponseMeteo(response) {
 return response.json();
 }

function onJsonMeteo(json) {
  console.log(json);

  const sectionMeteo = document.getElementById("sectionMeteo");
  sectionMeteo.classList.remove('hidden');
  sectionMeteo.classList.add('visible');

  const main = json.main;
  
  const infoMain = document.getElementById("infoMain");
  
  const divInfoM = document.createElement('div');
  divInfoM.id="divInfoM";
  
  const elementoM = document.createElement('h1');
  elementoM.textContent = "Meteo " + city_name ;
  divInfoM.appendChild(elementoM);
  
  for(info in main) {
    const elementoM = document.createElement('h2');

    if(info == 'humidity') {
      elementoM.textContent = 'Umidità' + ': ' + json.main[info];
    }
    if(info == 'pressure') {
      elementoM.textContent = 'Pressione' + ': ' + json.main[info];
    }
    if(info == 'temp') {
      elementoM.textContent = 'Temperatura (K)' + ': ' + json.main[info];
    }
    if(info == 'temp_max') {
      elementoM.textContent = 'Temperatura Massima (K)' + ': ' + json.main[info];
    }
    if(info == 'temp_min') {
      elementoM.textContent = 'Temperatura Minima (K)' + ': ' + json.main[info];
    }
    divInfoM.appendChild(elementoM); 
  }
   infoMain.appendChild(divInfoM);
  
  const btnInfoMeteo = document.getElementById("btnInfoMeteo");
  btnInfoMeteo.removeEventListener('click',inforMeteo);
  btnInfoMeteo.addEventListener('click',closeInfoMeteo);
}

function closeInfoMeteo() {
    const elementoM = document.getElementById('divInfoM');

    if(elementoM != null) {
      elementoM.remove();
    }
  
    const sectionMeteo = document.getElementById("sectionMeteo");
    sectionMeteo.classList.remove('visible');
    sectionMeteo.classList.add('hidden');
    
    const btnInfoMeteo = document.getElementById("btnInfoMeteo");
    btnInfoMeteo.removeEventListener('click',closeInfoMeteo);
    btnInfoMeteo.addEventListener('click',inforMeteo);
}



  






























 