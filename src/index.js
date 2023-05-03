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

function formatForecatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
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

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `    <div class="col-2 first-prognose">
          <div class="card">
            <div class="card-body celcius">
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" width="42" />
              <span style="font-size: 0.8vw" class="forecast-day"> ${formatForecatDay(
                forecastDay.dt
              )} </span> <br /> <span style="font-size: 0.8vw" class="forecast-temp">
              ${Math.round(forecastDay.temp.max)} °C | ${Math.round(
          forecastDay.temp.min
        )} °C </span>
            </div>
          </div>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayForecast);
}

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

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].description;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("Vilnius");
