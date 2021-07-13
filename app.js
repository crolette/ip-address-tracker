let ipIsp = document.querySelector("#ip-isp");
let ipAddress = document.querySelector("#ip-address");
let ipLocation = document.querySelector("#ip-location");
let ipTimezone = document.querySelector("#ip-timezone");
let formIP = document.querySelector("form");

var myIcon = L.icon({
    iconUrl: './images/icon-location.svg',
});


formIP.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(formIP.value)
  callApi()
});

window.onload = callApi()

// Geo Ipify
function callApi() {
  fetch("https://geo.ipify.org/api/v1?apiKey=at_OWmOvTyJtp6NaX4cM8xtz2J0Zt7Mv")
    .then((reponse) => reponse.json())
    .then((data) => {
      console.log(data);
      addInfos(data);
      addMap(data);
    })
    .catch((error) => console.log(error));
}

function addInfos(data) {
  ipIsp.innerText = data.isp;
  ipAddress.innerText = data.ip;
  ipLocation.innerText =
    data.location.postalCode +
    " " +
    data.location.city +
    " " +
    data.location.country;
  ipTimezone.innerText = data.location.timezone;
}

function addMap(data) {
  var mymap = L.map("mapid", {
    center: [data.location.lat, data.location.lng],
    zoom: 13,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mymap);

  L.marker([data.location.lat, data.location.lng], {icon: myIcon}).addTo(mymap);
}


// url GET : https://geo.ipify.org/api/v1?apiKey=at_OWmOvTyJtp6NaX4cM8xtz2J0Zt7Mv
// {
//     "ip": "8.8.8.8",
//     "location": {
//         "country": "US",
//         "region": "California",
//         "city": "Mountain View",
//         "lat": 37.40599,
//         "lng": -122.078514,
//         "postalCode": "94043",
//         "timezone": "-07:00",
//         "geonameId": 5375481
//     },
//     "domains": [
//         "0d2.net",
//         "003725.com",
//         "0f6.b0094c.cn",
//         "007515.com",
//         "0guhi.jocose.cn"
//     ],
//     "as": {
//         "asn": 15169,
//         "name": "Google LLC",
//         "route": "8.8.8.0/24",
//         "domain": "https://about.google/intl/en/",
//         "type": "Content"
//     },
//     "isp": "Google LLC",
//     "proxy": {
//         "proxy": false,
//         "vpn": false,
//         "tor": false
//     },
// }

//
