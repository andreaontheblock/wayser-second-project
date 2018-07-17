function main () {
  var mymap = L.map('mapid').setView([51.505, -0.09], 13);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibW9udHNlMDMiLCJhIjoiY2pqcHN5NHk3M2djeDNrcXM5aTFmYWI2eSJ9.BYUUW6YUVADssrZJ47vueA'
  }).addTo(mymap);

  var marker = L.marker([41.3818, 2.1685]).addTo(mymap);

  marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();

  // coordinates.latitude, coordinates.longitude

  const provider = document.getElementById('provider-name');
  console.log(provider.innerText);
  const serviceId = document.getElementById('service-id');
  console.log(serviceId.innerText);

  axios.get(`/services/${serviceId.innerText}`) // Route
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err); // no need for a next cause is the browser
    });
}

window.addEventListener('load', main);
