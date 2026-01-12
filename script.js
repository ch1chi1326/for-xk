const map = L.map('map').setView([47.79393137551372, 67.70281303124716], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

let markers = [];

fetch('places.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(place => {
            const marker = L.marker([place.lat, place.lng])
                .bindPopup(`<b>${place.name}</b><br>${place.description}`);

            marker.category = place.category;
            markers.push(marker);
            marker.addTo(map);
        });
    });

function filterMarkers(category) {
    markers.forEach(marker => {
        if (category === 'all' || marker.category === category) {
            marker.addTo(map);
        } else {
            map.removeLayer(marker);
        }
    });
}

