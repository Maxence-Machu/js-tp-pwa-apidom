// variable for writeData

let windowSize = getWindowSize();
let currentPosition = getCurrentPosition();


writeData(windowSize[0] + ' ' + windowSize[1], 'data-1');
writeData('Navigateur utilisé: ' + whichNavigator(), 'navigator');
writeData('Système d\'exploitation utilisé: ' + whichOs(), 'os');
writeData('Page précédente: ' + "Cliquez ici", 'last-page');


// functions call

getCursorPosition();
getIpAdress();
getLastPageUrl();
getBandWidth();
getUserCountry();
sendNotification();
getMaps();
getTemp();
countUserVisits();

// functions

function getWindowSize() {
    const width = innerWidth;
    const height = innerHeight;

    return [width, height];
}


function getCursorPosition() {
    window.addEventListener('mousemove', e => {
        const x = e.pageX;
        const y = e.pageY;

        let element = document.getElementById('data-2');
        element.innerText = "x: " + x + " y: " + y;
    });
}



function whichNavigator() {
    // Opera 8.0+
    let isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    let isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]" 
    let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

    // Internet Explorer 6-11
    let isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    let isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1 - 79
    let isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

    // Edge (based on chromium) detection
    let isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);

    // Blink engine detection
    let isBlink = (isChrome || isOpera) && !!window.CSS;

    let listNavigator = isOpera || isFirefox || isSafari || isIE || isChrome || isEdgeChromium || isBlink;

    if (navigator) {
        if (isOpera) return 'Opera';
        if (isFirefox) return 'Firefox';
        if (isSafari) return 'Safari';
        if (isIE) return 'Internet Explorer';
        if (isEdge) return 'Edge';
        if (isChrome) return 'Google Chrome';
        if (isEdgeChromium) return 'Edge chromium';
        if (isBlink) return 'Blink';
    } return false;
}


function whichOs() {
    let name = "Not known";
    if (navigator.appVersion.indexOf("Win") != -1) name =
        "Windows OS";
    if (navigator.appVersion.indexOf("Mac") != -1) name =
        "MacOS";
    if (navigator.appVersion.indexOf("X11") != -1) name =
        "UNIX OS";
    if (navigator.appVersion.indexOf("Linux") != -1) name =
        "Linux OS";

    return name;
}

let batteryPromise = navigator.getBattery();
batteryPromise.then((battery) => {
    writeData('Batterie restante: ' + battery.level.toFixed(1) * 100 + '%', 'battery');
})


function fetchIpAdress() {
    return fetch('https://api.ipify.org?format=json');
}

function getIpAdress() {
    fetchIpAdress()
        .then((response) => response.json())
        .then((response) => {
            writeData('Adresse IP: ' + response.ip, 'ip-adress');
        })
}

function getLastPageUrl() {
    document.getElementById('last-page').addEventListener('click', () => {
        window.history.back();
    })
}

function getBandWidth() {
    let imageAddr = "http://www.tranquilmusic.ca/images/cats/Cat2.JPG" + "?n=" + Math.random();
    let startTime, endTime;
    let downloadSize = 5616998;
    let download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    }
    startTime = (new Date()).getTime();
    download.src = imageAddr;

    function showResults() {
        let duration = (endTime - startTime) / 1000;
        let bitsLoaded = downloadSize * 8;
        let speedBps = (bitsLoaded / duration).toFixed(2);
        let speedKbps = (speedBps / 1024).toFixed(2);
        let speedMbps = (speedKbps / 1024).toFixed(2);
        writeData('Bande passante: ' + speedMbps + 'Mb/s', 'band-width');
    }
}


function getCurrentPosition() {
    if ("geolocation" in navigator) {
        let watchID = navigator.geolocation.watchPosition((position) => {
            let lat = position.coords.latitude
            let lon = position.coords.longitude
            navigator.geolocation.clearWatch(watchID)
            writeData('Position en latitude et longitude: ' + lat + ' ' + lon, 'position');
            return [lat, lon];
        })
    }
}


function fetchCountry(userIp) {
    return fetch('https://api.ip2country.info/ip?' + userIp);
}


function getUserCountry() {
    setTimeout(() => {
        let ipAdress = document.getElementById('ip-adress').innerText.substr(12);
        console.log(ipAdress)
        fetchCountry(ipAdress)
            .then((response) => response.json())
            .then((response) => {
                writeData('Pays de l\'utilisateur: ' + response.countryName, 'country');
            })
    }, 3000);

}

function sendNotification() {
    let notif = document.getElementById('notification');
    notif.addEventListener('click', () => {
        Notification.requestPermission((status) => {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
        });
    });
}


function getMaps() {
    let watchID = navigator.geolocation.watchPosition((position) => {
        lat = position.coords.latitude,
            lon = position.coords.longitude
        navigator.geolocation.clearWatch(watchID)

        mapboxgl.accessToken = 'pk.eyJ1IjoidG9tbGVtZWxsZSIsImEiOiJja2k2M204cGowMzd6MnFuem0zZWtiamhsIn0.L4jAH7mtlXq1xCFhetM1pA';
        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            center: [lon, lat], // starting position [lng, lat]
            zoom: 13, // starting zoom
        });


        let marker = new mapboxgl.Marker()
            .setLngLat([lon, lat])
            .addTo(map);
    })

}



function getTemp() {
    const API_KEY = "ed26ddc162d79af844ce2651198728db"

    let watchID = navigator.geolocation.watchPosition((position) => {
        lat = position.coords.latitude,
            lon = position.coords.longitude
        navigator.geolocation.clearWatch(watchID)
        let url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY

        fetch(url)
            .then(response => response.json())
            .then((response) => {
                writeData('Il fait: ' + convert(response.main.temp).toFixed(1) + '°C', 'meteo');
                console.log(response.main.temp)
            })
})

    /**
 * Convert kelvins to celcius
 */

    function convert(nb) {
        return nb - 273.15
    }

}


function addUserVisit() {
    let nb;
    sessionStorage.setItem('visit', 0);
    if ('visit' in sessionStorage) {
        if (sessionStorage.visit === null) writeData('Vous avez visité le site: ' + 0 + ' fois', 'visit');
        else writeData('Vous avez visité le site: ' + visit + ' fois', 'visit');
    }
    return true;
}

function countUserVisits() {
    let visit = sessionStorage.getItem('visit');
    addUserVisit();
}

function writeData(data, id) {
    const element = document.getElementById(id);
    element.innerText = data;
}

