//Fonction donnant la dimension de la fenêtre
function dimWindow(){
    let largeur = window.innerWidth; //récupération de la largeur
    let hauteur = window.innerHeight; //récupération de la hauteur
    
    let h5 = document.getElementById('dimension'); //
    h5.innerText = "La dimension est " +  largeur + "x" + hauteur + " px";

}

//Fonction récupérant la position en temps réel de la souris
function posMouse(event) {
	e = event || window.event;	//dès que la souris se déplace un événement est déclaré
	mousePos = { x: e.clientX, y: e.clientY }; //donne les positions de la souris
    let h5 = document.getElementById('posMouse');
    h5.innerText = "x = " + mousePos.x + "; y = " + mousePos.y;
}

//Fonction récupérant le nom du navigateur utilisé
function getBrowser(){
    let browser = navigator.userAgent; //récupère les informations du navigateur utilisé
    var nameBrowser;

    // cette partie sert à trier les noms de navigateurs afin que ce soit plus lisible
    if (browser.indexOf("Firefox") > -1) {
        nameBrowser = "Mozilla Firefox";
      } 
      else if (browser.indexOf("SamsungBrowser") > -1) {
        nameBrowser = "Samsung Internet";
      } 
      else if (browser.indexOf("Opera") > -1 || browser.indexOf("OPR") > -1) {
        nameBrowser = "Opera";
      } 
      else if (browser.indexOf("Trident") > -1) {
        nameBrowser = "Microsoft Internet Explorer";
      } 
      else if (browser.indexOf("Edge") > -1) {
        nameBrowser = "Microsoft Edge";
      } 
      else if (browser.indexOf("Chrome") > -1) {
        nameBrowser = "Google Chrome or Chromium";
      } 
      else if (browser.indexOf("Safari") > -1) {
        nameBrowser = "Apple Safari";
      } 
      else {
        nameBrowser = "unknown";
      }

    let li = document.getElementById('nav');
    li.innerText = nameBrowser;
}

//Fonction récupérant le nom de l'OS utilisé
function getOS(){
    let os = navigator.appVersion; //récupère les informations de l'OS utilisé
    var nameOS;

    // cette partie sert à trier les noms des OS afin que ce soit plus lisible
    if (os.indexOf("Win") != -1){
        nameOS = "Windows OS";
    }
    else if (os.indexOf("Mac") != -1){
        nameOS = "Mac OS"; 
    } 
    else if (os.indexOf("X11") != -1){ 
        nameOS =  "UNIX OS"; 
    }
    else if (os.indexOf("Linux") != -1){
        nameOS = "Linux OS"; 
    }
    else {
        nameOS = "unknown";
      }
    

    let li2 = document.getElementById('os');
    li2.innerText = nameOS;

}

//Function récupérant le niveau de batterie
navigator.getBattery().then(function(battery) {
    let li3 = document.getElementById('battery');

    // Le niveau de batterie est compris entre 1 et 0 donc on multiplie par 100 pour récupérer le pourcentage
    li3.innerText = "Niveau de batterie: " + battery.level * 100 + "%";
});

//Fonction renvoyant l'adresse IP publique
function getIpAddress(){
    fetch('http://ip-api.com/json')
        .then(response => response.json())
        .then((response) => {
    
    let h5 = document.getElementById('ip');
    h5.innerText = "Adresse IP publique: " + response.query;
});
}

//Fonction renvoyant les infos de la page précédente
function getPrevPage(){
    let oldURL = document.referrer;
    let h5 = document.getElementById('prevPage');
    h5.innerText = "La page précédente: " + oldURL;
}

//Fonction renvoyant la bande passante
function getBandWidth(){
    var imageAddr = "http://www.tranquilmusic.ca/images/cats/Cat2.JPG" + "?n=" + Math.random();
    var startTime, endTime;
    var downloadSize = 5616998;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        let h5 = document.getElementById('bandwidth');
        h5.innerText = "La bande passante de l'utilisateur: " + speedTest() + " Mb/s";
    }
    startTime = (new Date()).getTime();
    download.src = imageAddr;
    
    function speedTest() {
        var duration = (endTime - startTime) / 1000; //Math.round()
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        return speedMbps;
    }
}

//Fonction renvoyant les latitudes et longtiudes de l'utilisateur
function getGeoLoc(){
    fetch('http://ip-api.com/json')
        .then(response => response.json())
        .then((response) => {
    
    let h5 = document.getElementById('posUser');
    h5.innerText = "Latitude: " + response.lat + "°; Longitude: " + response.lon + "°";
});
}

//Fonction donnant la latitude de l'utilisateur
function getPosLat(){
    fetch('http://ip-api.com/json')
        .then(response => response.json())
        .then((response) => {
    
    return response.lat;
});
}

//Fonction donnant la longitude de l'utilisateur
function getPosLon(){
    fetch('http://ip-api.com/json')
        .then(response => response.json())
        .then((response) => {
    
    return response.lon;
});
}

//Fonction renvoyant les latitudes et longtiudes de l'utilisateur
function getCountry(){
    fetch('http://ip-api.com/json')
        .then(response => response.json())
        .then((response) => {
    
    let h5 = document.getElementById('country');
    h5.innerText = "Pays (avec http://ip-api.com/json): " + response.country;
});
}

//Fonction de notification
function sendNotif(){
    let notif = document.getElementById('notif');
    notif.addEventListener('click', () => {
         Notification.requestPermission((status) => {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
        });
    });
}

//Fonction donnant la température
function getTemperature(){
    fetch("http://api.openweathermap.org/data/2.5/weather?q=Elbeuf&appid=bf2f5eefe68494db41d1f9a31a628f53")
        .then(response => response.json())
        .then((response) => {

            p = document.getElementById('temp');
            let convertTemp = response.main.temp - 273;
            p.innerText = "The current temperature is : " + convertTemp + "°C";
 
        })
        .catch(error => alert("Erreur : " + error));
}


//------------APPEL DES FONCTIONS-----------------

dimWindow();

window.onmousemove = posMouse;

getBrowser();

getOS();

getIpAddress();

getPrevPage();

getBandWidth();

getGeoLoc();

getCountry();

getTemperature();