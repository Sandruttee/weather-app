// Current time
let now = new Date();
let currentDate = document.querySelector("#current-date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let dayNumber = now.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let year = now.getFullYear();

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

currentDate.innerHTML = `${day}, ${dayNumber} ${month}, ${year}, <strong>${hour}:${minutes}<strong>`;

// Real temperature week 5
function showTemperature(response) {
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let temperatureHigh = document.querySelector(".temp-high");
  temperatureHigh.innerHTML = Math.round(response.data.main.temp_max);
  let temperatureLow = document.querySelector(".temp-low");
  temperatureLow.innerHTML = Math.round(response.data.main.temp_min);
  let windSpeed = document.querySelector(".wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
}

// Default city

function searchCity(city) {
  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

// Search engine
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

// Current location // need to join changin high/low/wind speed
function showCurrentLocation() {
  function showPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    function showTemperature(response) {
      let cityName = document.querySelector("#city-name");
      cityName.innerHTML = response.data.name;
      let temperaturePosition = document.querySelector(".temperature");
      temperaturePosition.innerHTML = Math.round(response.data.main.temp);
      let temperatureHigh = document.querySelector(".temp-high");
      temperatureHigh.innerHTML = Math.round(response.data.main.temp_max);
      let temperatureLow = document.querySelector(".temp-low");
      temperatureLow.innerHTML = Math.round(response.data.main.temp_min);
      let windSpeed = document.querySelector(".wind-speed");
      windSpeed.innerHTML = Math.round(response.data.wind.speed);
    }
    let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
    let apiUrlSecond = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    axios.get(apiUrlSecond).then(showTemperature);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("button");
button.addEventListener("click", showCurrentLocation);

//

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Temperature conversion celcius/fah
//function changeFah() {
//let temperature = document.querySelector("#temperature");
//temperature.innerHTML = "+17";
//}
//let celciusLink = document.querySelector("#celcius-link");
//celciusLink.addEventListener("click", changeFah);

//function changeCelc() {
//let temperature = document.querySelector("#temperature");

//temperature.innerHTML = "66";
//}
//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", changeCelc);

searchCity("Vilnius");
