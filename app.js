let ipIsp = document.querySelector("#ip-isp");
let ipAddress = document.querySelector("#ip-address");
let ipLocation = document.querySelector("#ip-location");
let ipTimezone = document.querySelector("#ip-timezone");
let formIP = document.querySelector("form");
let myIcon = L.icon({
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
  fetch("https://geo.ipify.org/api/v1?apiKey=")
    .then((reponse) => reponse.json())
    .then((data) => {
      console.log(data);
      addInfos(data);
      addMap(data);
    })
    .catch((error) => console.log(error.code));
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
