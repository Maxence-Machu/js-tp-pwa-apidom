/* 
   _____                      _    
  / ____|                    | |   
 | (___  _ __   ___   ___ ___| | __
  \___ \| '_ \ / _ \ / __/ __| |/ /
  ____) | |_) | (_) | (__\__ \   < 
 |_____/| .__/ \___/ \___|___/_|\_\
        | |                        
        |_|                        
            Date : 01/12/2020
            Language: Javascript
            Subject: API - DOM - PWA

Axe d'amélioration: (1) réaliser une fonction global pour obtenir l'ip pour pouvoir utiliser les données 
dans d'autres fonctions. De même pour les coordonnées.
                    (2) réaliser une vrai fonction de render qui metterai à jour tout les éléments du DOM
qui ont besoin d'être changer.
*/



//obtention des dimensions de la fenetre actuelle
function getDimension(){
    var elements = document.getElementsByClassName("card-text_dimension");
    let width = parent.innerWidth;
    let height = top.innerHeight;

    elements[0].innerText = width + "x" + height;
    //affichage des nouveaux éléments dans le DOM
}


//obtention des coordonnées de la souris
function mousePos(){
    //récupération de l'élément html qui nous intérrese 
    var elements = document.getElementsByClassName("card-text_mouse_pos");
    elements[0].innerText = "x : y : ";

    //on ajoute des eventListener à notre DOM pour pouvoir détecter les mouvements de la souris
    document.addEventListener('mousemove', update, false);
    document.addEventListener('mouseenter', update, false);
        
    //function update qui va etre appelé à chaque mouvement de souris
    function update(e) {
    x = e.pageX;
    y = e.pageY;
    //affichage des nouveaux éléments dans le DOM
    elements[0].innerText = "x : " + x + " y : " + y;
    }
}


//fonction qui va nous permettre de déterminer certaines spécification de l'ordinateur du visiteur
function specs(){

    var elements = document.getElementsByClassName("card-test_specs");
    var OSName = "Unknown";
    var nAgt = navigator.userAgent;
    var browserName  = navigator.appName;


    //multiple condition pour vérifie rle nom du navigateur
    if ((verOffset=nAgt.indexOf("OPR/"))!=-1) {
        browserName = "Opera";
    }
    else if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
        browserName = "Opera";
    }
    else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
        browserName = "Microsoft Internet Explorer";
    }
    else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
        browserName = "Chrome";
    }
    else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
        browserName = "Safari";
    }
    else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
        browserName = "Firefox";
    }
    else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/'))){
        browserName = nAgt.substring(nameOffset,verOffset);
        fullVersion = nAgt.substring(verOffset+1);

        if (browserName.toLowerCase()==browserName.toUpperCase()){
            browserName = navigator.appName;
        }
    }

    //multiple condition 'if' pour déterminer plu sprécisément l'os de l'utilisateur
    if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1) OSName="Windows 10";
    if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSName="Windows 8";
    if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSName="Windows 7";
    if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OSName="Windows Vista";
    if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OSName="Windows XP";
    if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OSName="Windows 2000";
    if (window.navigator.userAgent.indexOf("Mac")            != -1) OSName="Mac/iOS";
    if (window.navigator.userAgent.indexOf("X11")            != -1) OSName="UNIX";
    if (window.navigator.userAgent.indexOf("Linux")          != -1) OSName="Linux";

    //affichage des nouveaux éléments dans le DOM
    elements[0].children[0].innerText = "Navigateur utilisé: " + browserName;
    elements[0].children[1].innerText = "OS utilisé (mac/windows...): " + OSName;

    navigator.getBattery().then(function(battery) {
        // Le niveau de battery est compris entre 0 et 1, il nous suffit de le multiplier par 100 pour avoir le pourcentage
        // pour les Pc de bureau le niveau est directement à 100 car il est constamment branché
        elements[0].children[2].innerText =  "Niveau de batterie: " + battery.level * 100 + "%";
    });
}


function publicIP(){
    //obtention de l'élement du DOM
    var elements = document.getElementsByClassName("card-test_conn");

    //utilisation de jQuery pour obtenir le json fournit par l'api
    $.getJSON('https://api.ipify.org?format=json', function(data){
        //on ajoute directement le nouvel élément dans le DOM
        //ici on affiche directement l'IP public
        elements[0].children[0].innerText = "Adresse IP publique: " + data.ip;
    });

}

function speedConnection(){
    var elements = document.getElementsByClassName("card-test_conn");

    //cette fonction permet de télécharger une image pour en déterminer le temps que l'utilisateur à mis 
    //pour la télécharger. On connait la taille et le temps donc nous pouvons déterminer la vitesse
    var imageAddr = "http://www.tranquilmusic.ca/images/cats/Cat2.JPG" + "?n=" + Math.random();
    var startTime, endTime;
    var downloadSize = 5616998;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    }
    startTime = (new Date()).getTime();
    download.src = imageAddr;

    function showResults() {
        var duration = (endTime - startTime) / 1000; //Math.round()
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        elements[0].children[2].innerText = "La bande passante de l'utilisateur: \n" + speedMbps + " Mbps\n";
    }
}


function localisation(){
    var elements = document.getElementsByClassName("card-test_geo");


    //on utilise les propriétés du navigateur pour accéder aux infos de l'utilisateur. ici c'est 
    //les coordonées GPS que nous voulons grâce à l'IP
    navigator.geolocation.getCurrentPosition(function(position) {
        elements[0].children[0].innerText = "Position en latitude et longitude:\n" + position.coords.latitude + ", " + position.coords.longitude;
      });

    $.getJSON('https://api.ipify.org?format=json', function(data){
        $.getJSON('https://api.ip2country.info/ip?'+ data.ip, function(data){
        elements[0].children[1].innerText = "Le pays de l'utilisateur: " + data.countryName;
        });
    });

}


function notification(){
    //en cliquant sur le bouton "Envoyer!" le navigateur pourra envoyer une notification au pc de l'utilisateur
    //il faudra par contre que l'utilisateur autorise les requetes pour pouvoir accéder au notifs
    Notification.requestPermission( function(status) {
        var n = new Notification("Navigateur", {body: "Salut c'est le navigateur qui te parle ;)"}); // this also shows the notification
      });
}


function cartography(){

    //pour la carte, j'ai utilisé LeafLet qui est open source et qui est très facile d'utilisation
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        //déclaration de la map
        var map = L.map('map').setView([lat,lon], 10);

        //ajout d'un titre qui se situe en bas à droite de la carte
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    
        //ajout d'un marqueur sur la map avec la position lat et lon
        L.marker([lat,lon]).addTo(map)
            .bindPopup('Votre position')
            .openPopup();
      });


} 


function weather(){

    //utilisation de OpenWeatherMap pouur obtenir la température
    var key = '71b9d7c81fb214e077c3a15b66bdb47f'; //clé API
    var elements = document.getElementsByClassName("card-text_weather");

    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon='+ lon +'&appid=' + key, function(data){
            elements[0].innerText = Number(data.main.temp -273,1).toFixed(2) + "°C"; //conversion de kelvin à celcius
        });

    });

}


//tentative de compteur de visiteurs avec LoaclStorage
function visited() {
    var n = localStorage.getItem('counter'); 
    if (n === null) { n = 0; } 
    else { n++; }
    return n;
}

window.onload = visited();

function getVisited(){
    console.log(localStorage.getItem("counter"));
}


//fucntion render qui appel uniquement les autres fonctions
function render(){
    getDimension();
    mousePos();
    specs();
    publicIP();
    speedConnection();
    localisation();
    cartography();
    weather();
    visited();
}

render();