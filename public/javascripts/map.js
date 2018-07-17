function main () {
  const serviceId = window.location.pathname.split('/')[2];

  var mymap = L.map('mapid');
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibW9udHNlMDMiLCJhIjoiY2pqcHN5NHk3M2djeDNrcXM5aTFmYWI2eSJ9.BYUUW6YUVADssrZJ47vueA'
  }).addTo(mymap);

  axios.get(`/api/services/${serviceId}`) // Route
    .then((result) => {
      const coordinates = result.data.provider.location.coordinates;
      const serviceName = result.data.name;
      const userName = result.data.provider.username;

      mymap.setView(coordinates, 13); // Center view in map
      var marker = L.marker(coordinates).addTo(mymap);
      marker.bindPopup(`${serviceName}<br>${userName}`).openPopup();
    })
    .catch((err) => {
      console.log(err); // no need for a next cause is the browser
    });
}

window.addEventListener('load', main);
