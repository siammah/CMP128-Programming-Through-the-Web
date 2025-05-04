const apiKey = 'afa6a3bda5fda6cc88d1b6adff0ee53e';
let currentUnit = 'metric';

function searchWeather() {
  const city = document.getElementById('cityInput').value;
  if (!city) return;
  fetchWeather(city);
  fetchForecast(city);
}

function toggleUnits() {
  currentUnit = currentUnit === 'metric' ? 'imperial' : 'metric';
  const city = document.getElementById('cityInput').value;
  if (city) {
    fetchWeather(city);
    fetchForecast(city);
  }
}

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${currentUnit}&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => renderWeatherCard(data))
    .catch(error => {
      document.getElementById('weatherCard').innerHTML = '<p>City not found.</p>';
      console.error(error);
    });
}

function renderWeatherCard(data) {
  const unitSymbol = currentUnit === 'metric' ? '°C' : '°F';
  const html = `
    <h2>${data.name}</h2>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
    <p>${data.weather[0].description}</p>
    <p>Temperature: ${data.main.temp}${unitSymbol}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} ${currentUnit === 'metric' ? 'm/s' : 'mph'}</p>
  `;
  document.getElementById('weatherCard').innerHTML = html;
}

function fetchForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${currentUnit}&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => renderForecast(data))
    .catch(error => {
      document.getElementById('forecast').innerHTML = '<p>Error fetching forecast.</p>';
      console.error(error);
    });
}

function renderForecast(data) {
  let forecastHTML = '<h3>5-Day Forecast</h3><div class="forecast-container">';
  const dailyData = {};

  data.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!dailyData[date]) {
      dailyData[date] = [];
    }
    dailyData[date].push(item);
  });

  Object.keys(dailyData).slice(0, 5).forEach(date => {
    const dayData = dailyData[date];
    const temps = dayData.map(d => d.main.temp);
    const min = Math.min(...temps);
    const max = Math.max(...temps);
    const icon = dayData[0].weather[0].icon;

    forecastHTML += `
      <div class="forecast-day">
        <h4>${date}</h4>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Icon">
        <p>High: ${max.toFixed(1)}°</p>
        <p>Low: ${min.toFixed(1)}°</p>
      </div>
    `;
  });

  forecastHTML += '</div>';
  document.getElementById('forecast').innerHTML = forecastHTML;
}
