


    function windowsize() {
    document.getElementById("size").innerHTML = ("Dimension = " + screen.width + "x" + screen.height)
}

    function mousetrack() {
    let screenLog = document.querySelector('#pos-souris');
    document.addEventListener('mousemove', logKey);

    function logKey(e) {
    document.getElementById("pos-souris").innerHTML = ` Ecran X/Y: ${e.screenX}, ${e.screenY}`;
}
}
    function getOS(){
    document.getElementById("appname").innerHTML = (navigator.appName)
    document.getElementById("appver").innerHTML = (navigator.appVersion);
}
    function getbat(){
    navigator.getBattery()
        .then(function(battery) {
            document.getElementById("batlvl").innerHTML = ("Batterie = "+ (battery.level) * 100+ "%")
        });


}
    function getIp()
    {
        function json(url) {
            return fetch(url).then(res => res.json());
        }

        let apiKey = 'ab417366abe0c2cf6359a634e24509be8fac10db3d2dae729a628830';
        json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
        document.getElementById("IP").innerHTML = "Adrresse IP : " + (data.ip);

    });
    }

    function goBack() {
    document.getElementById("prepage").innerHTML= "La page Précedente est : " + history.back()
}
    function BandeP(){
    networkInformation = navigator.connection
    var bdp = networkInformation.downlink

    document.getElementById("bdp").innerHTML = "La Bande passante est de "+ bdp + " MB/s";
}
    function CoorD(){
    function json(url) {
        return fetch(url).then(res => res.json());
    }

    let apiKey = 'ab417366abe0c2cf6359a634e24509be8fac10db3d2dae729a628830';
    json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
    document.getElementById("coord").innerHTML ="Longitude : " + data.longitude +'\r' + "Latitude : " + data.latitude
    document.getElementById("pays").innerHTML = "Le pays de l'utilisateur : " + (data.country_name)
})
}

    function sendNotif(){

        if (!('Notification' in window)) {
            alert('Erreur, pas de prise en charge des notifications')
        }


        else if (Notification.permission === 'granted') {

            const notification = new Notification('CyberPunk 2077 repoussé a 2037 !')
        }

        else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {

                if (permission === 'granted') {
                    const notification = new Notification('Notif')
                }
            })
        }
    }
    function meteo()
    {
        navigator.geolocation.getCurrentPosition(function(position)
        {

            console.log(position);
            let _lat = position.coords.latitude;
            let _lng = position.coords.longitude;

            fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + _lat + "&lon="+ _lng + "&appid=" + "3ef3d9bcd8741bcf540953ad5aad7651")
                .then(response => response.json())
                .then((response) =>
                {
                    var celsius = Math.round(parseFloat(response.main.temp)-273.15);
                    // Code éxécuté quand vous recevez la réponse
                    document.getElementById("temp").innerHTML = ("Température actuelle : " + celsius +"&deg")
                })


        })
    }