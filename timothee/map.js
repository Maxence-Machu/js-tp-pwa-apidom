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


//Fonction de geolocalisation

    mapboxgl.accessToken = 'pk.eyJ1IjoidG5ndXllbm53cyIsImEiOiJja2k2NHFiZm84MW45MnpsNmZpemhleng3In0.eZUVKETcHa5UQKism6C2JA';
        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            center: [1.1003, 49.4429], // Position de départ
            zoom: 10, // Zoom
        });

        let marker = new mapboxgl.Marker().setLngLat([getPosLon(), getPosLat()]).addTo(map);