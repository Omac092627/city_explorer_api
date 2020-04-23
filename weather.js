'use strict'





// weather handler//
function handleWeather(request, response) {
  let weatherData = require('./data/darksky.json');
  let dailyWeather = [];
  
  weatherData.daily.data.map( day => {
    let forecast = new DailyForecast(day);
   dailyWeather.push(forecast);
  });
  response.json(dailyWeather);
}
function DailyForecast(day) {
  this.forecast = day.summary;
  this.time = day.time;
}