(async function() {
    /*
     Mise en place des letiables du DOM
    */

    let dataSize = document.getElementById('data-size');
    let dataMouse = document.getElementById('data-mouse');

    let dataNavigator = document.getElementById('navigator');
    let dataOS = document.getElementById('os');
    let dataBattery = document.getElementById('battery');

    let dataIP = document.getElementById('IP');
    let dataReferer = document.getElementById('previous');
    let dataSpeed = document.getElementById('speedtest');

    let dataLatLng = document.getElementById('latLng')
    let dataCountry = document.getElementById('countryFromIP');

    let btnNotificaiton = document.getElementById('notification');

    let dataTemperature = document.getElementById('temperature');
    let dataVisits = document.getElementById('visits');


    /* Cartographie */

    mapboxgl.accessToken = 'VOTRE_ACCESS_TOKEN';
    let map = new mapboxgl.Map({
        container: 'carte',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [1.1003, 49.4429], // Position de départ
        zoom: 10, // Zoom
    });
    
    /*
    Récupération de la taille de la fenêtre 
    */
   let size = getSize();
   let size_str = size.h + ' x ' + size.w;
   render(dataSize, size_str);

   /*
   Tracking de la position de la souris
   */
  document.addEventListener('mousemove', (e) => {
    let mouse_str = 'x: ' + e.clientX + ' y:' + e.clientY;
    render(dataMouse, mouse_str);
  })

  /*
  Informations générales
  */
  let os = getOS();
  render(dataOS, 'OS: ' + os)

  let _navigator = getNavigator();
  render(dataNavigator, _navigator);

  navigator.getBattery().then(function(battery) {
    render(dataBattery, "Batterie: " + battery.level * 100 + "%")
  });

  // https://ourcodeworld.com/articles/read/257/how-to-get-the-client-ip-address-with-javascript-only
   fetch("https://api.ipify.org	")
   .then(res => res.text())
   .then((res) => {
       render(dataIP, "IP: " + res);


        // Affichage du pays après la récupération IP
        fetch('https://api.ip2country.info/ip?' + res)
        .then(res => res.json())
        .then((res) => {
            console.log(res.countryName);
            render(dataCountry, res.countryName)
        })
    })

    let referer = getReferer();
    render(dataReferer, referer)


    navigator.geolocation.getCurrentPosition((res)=> {
        let crd = res.coords;
        render(dataLatLng, crd.latitude.toFixed(4) + ' ' + crd.longitude.toFixed(4))

        // Ajout du marker après avoir récupéré la LAT LNG
        let marker = new mapboxgl.Marker().setLngLat([res.coords.longitude, res.coords.latitude]).addTo(map);

        // Ajout de la météo
        const API_KEY = "OPENWEATHER_API_KEY"
        const METEO_URL = "http://api.openweathermap.org/data/2.5/weather?lat=" + res.coords.latitude + "&lon=" + res.coords.longitude + "&appid=" + API_KEY + '&units=metric'

        fetch(METEO_URL)
            .then(response => response.json())
            .then((response) => {
                render(dataTemperature, response.main.temp.toFixed(1) + '°C')
                console.log(response.main.temp)
        })
    }, (err) => {
        console.warn(`ERREUR (${err.code}): ${err.message}`);
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    });


    getSpeed().then((speed) => {
        render(dataSpeed, 'Bande passante: ' + speed + 'Mb/s');        
    });

    btnNotificaiton.addEventListener('click', () => sendNotification());

    /*
    Nombre de visites
    */
    var visits = localStorage.getItem('visits');
    if(!!visits){
        visits = parseInt(visits);
        visits++;
    } else {
        visits = 0;
    }
    localStorage.setItem('visits', visits);

    render(dataVisits, visits)
 })();

function render(DOMEl, string){
    DOMEl.innerHTML = string;
}
function getSize(){
    return {
        w: window.innerWidth,
        h: window.innerHeight
    }
}

function getOS() {
    return window.navigator.oscpu || window.navigator.platform;
}

function getNavigator() {
    // https://stackoverflow.com/a/9851769

    // Opera 8.0+
    let isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    let isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]" 
    let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

    // Internet Explorer 6-11
    let isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    let isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1 - 71
    let isChrome = !!window.chrome;

    // Blink engine detection
    let isBlink = (isChrome || isOpera) && !!window.CSS;

    if(isOpera) return 'Opéra';
    if(isFirefox) return 'Firefox';
    if(isSafari) return 'Safari';
    if(isIE) return 'IE';
    if(isEdge) return 'Edge';
    if(isChrome) return 'Chrome';
    if(isBlink) return 'Blink';
}

function getReferer(){
    return document.referrer;
}

function getSpeed(){
    return new Promise(resolve => {
        // https://gist.github.com/fedir/5619422
        let imageAddr = "http://www.tranquilmusic.ca/images/cats/Cat2.JPG" + "?n=" + Math.random();
        let startTime, endTime;
        let downloadSize = 5616998;
        let download = new Image();
        startTime = (new Date()).getTime();
        download.src = imageAddr;

        download.onload = function () {
            endTime = (new Date()).getTime();

            let duration = (endTime - startTime) / 1000; //Math.round()
            let bitsLoaded = downloadSize * 8;
            let speedBps = (bitsLoaded / duration).toFixed(2);
            let speedKbps = (speedBps / 1024).toFixed(2);
            let speedMbps = (speedKbps / 1024).toFixed(2);

            resolve(speedMbps)
        }
        });
    
}


function sendNotification() {
    Notification.requestPermission((status) => {
        if (Notification.permission !== status) {
            Notification.permission = status;
        } 

        var n = new Notification("Nouvelle notification", {body: "Hello World"});
    });
}