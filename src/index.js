// Current time

function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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
  return `Last updated: ${day}, ${hour}:${minutes}`;
}

function formatDay(timestamp) {
  let now = new Date(timestamp * 1000);
  let day = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
let now = new Date();
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

// Forecast

function displayForecast(response) {
  console.log(response.data.daily); // fetching daily forecast
  let forecastElement = document.querySelector("#forecast");
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `    <div class="col-2 first-prognose">
          <div class="card">
            <div class="card-body celcius">
              <i class="fa-solid fa-cloud weather-icon cloud"></i><br />
              ${day} <br />
              5°C | 6°C
            </div>
          </div>
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
// forecast
function getForecast(coordinates) {
  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayForecast);
}

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

  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = formatDate(response.data.dt * 1000);

  celsiusTemperature = response.data.main.temp;

  // Icon change

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].description;

  //calling forecast function + getting a coordinates response from existing API call
  getForecast(response.data.coord);
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

// Current location
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

let celsiusTemperature = null;

function displayFah(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahTemp = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahTemp);
}

function displayCels(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let celsTemp = celsiusTemperature;
  temperature.innerHTML = Math.round(celsTemp);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFah);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCels);

searchCity("Vilnius");
