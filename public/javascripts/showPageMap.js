mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    // style: 'mapbox://styles/mapbox/streets-v11', // style URL
    style: 'mapbox://styles/pnumbers/cl4nn51i3000s14myhe1ko6l6',
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());


const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
    `<h3>${campground.title}</h3><p>${campground.location}</p>`
);

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(popup)
    .addTo(map);