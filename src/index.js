function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let timeElement = document.querySelector("#time");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let date = new Date(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}mph`;
  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = "0${minutes}";
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "t61a3de96178c340b47o7ff32962bb7f";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&{units=metric}`;
  axios.get(apiURL).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "t61a3de96178c340b47o7ff32962bb7f";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}}&key=${apiKey}&{units=metric}`;
  axios.get(apiURL).then(displayForecast);
}

function displayForecast() {
  let days = [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
  ];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date">${day}</div>
    <div class="weather-forecast-icon">🌤️</div>
    <div class="weather-forecast-temperature">
    <span class="weather-forecast-temperature-max">18&#176;</span>
    <span class="weather-forecast-temperature-min">12&#176;</span>
    </div>
    </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Bristol");
getForecast("Bristol");
