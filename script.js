const key = '8ea013b4d54c3cb5087d20ca02003bb5';
const iconBaseUrl = 'https://openweathermap.org/img/wn/';

function saveCity() {
  var city = prompt(
    'Bitte geben Sie die Stadt ein, für die Sie das Wetter wissen möchten.'
  );
  localStorage.setItem('city', city);
}

function getTemperature() {
  var citySaved = localStorage.getItem('city');
  var url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    citySaved +
    '&appid=' +
    key +
    '&units=metric';

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      var temperature = document.getElementById('temperature');
      temperature.innerHTML = Math.round(data.main.temp) + '°';
      var city = document.getElementById('city');
      city.innerHTML = citySaved;

      var iconCode = data.weather[0].icon;
      var iconUrl = iconBaseUrl + iconCode + '@2x.png';
      var icon = document.getElementById('icon');
      icon.src = iconUrl;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getDailyWeather() {
  var citySaved = localStorage.getItem('city');
  var dateSelected = document.getElementById('date').value;
  var date = new Date(dateSelected);
  var timestamp = date.getTime() / 1000;
  var url = `https://api.openweathermap.org/data/2.5/forecast?q=${citySaved}&appid=${key}&units=metric&dt=${timestamp}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      var weatherToday = document.getElementById('weatherToday');
      weatherToday.innerHTML = '';

      var weatherItem = document.createElement('div');
      weatherItem.classList.add('weatherItem');

      var weatherDate = document.createElement('div');
      weatherDate.classList.add('weatherDate');
      weatherDate.innerHTML = date.toLocaleDateString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      weatherItem.appendChild(weatherDate);

      var iconCode = data.list[0].weather[0].icon;
      var iconUrl = iconBaseUrl + iconCode + '@2x.png';
      var weatherIcon = document.createElement('img');
      weatherIcon.src = iconUrl;
      weatherIcon.alt = data.list[0].weather[0].description;
      weatherItem.appendChild(weatherIcon);

      var weatherDescription = document.createElement('div');
      weatherDescription.classList.add('weatherDescription');
      weatherDescription.innerHTML = data.list[0].weather[0].description;
      weatherItem.appendChild(weatherDescription);

      var weatherTemp = document.createElement('div');
      weatherTemp.classList.add('weatherTemp');
      weatherTemp.innerHTML =
        Math.round(data.list[0].main.temp) + '°';
      weatherItem.appendChild(weatherTemp);

      weatherToday.appendChild(weatherItem);
    })
    .catch((error) => console.log(error));
}

document.addEventListener('DOMContentLoaded', function () {
  getTemperature();
});
