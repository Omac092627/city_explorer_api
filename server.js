'use strict';

require('dotenv').config();

const cors = require('cors');
const express = require('express');
const PORT = process.env.PORT;
const app = express();
const superagent = require('superagent');

app.use(cors());

app.get('/test', (request, response) => {
  const name = request.query.name;
  response.send(`Hello ${name}`);
});

app.get('/location', handleLocation);

function handleLocation(request, response) {
  try {
    let city = request.query.city;
    // GET https://us1.locationiq.com/v1/search.php?key=YOUR_PRIVATE_TOKEN&q=SEARCH_STRING&format=json
    const url = 'https://us1.locationiq.com/v1/search.php';
    const queryStringParams = {
      key: process.env.LOCATION_TOKEN,
      q: city,
      format: 'json',
      limit: 1,
    }

  }
  catch (error) {
    let errorObject = {
      status: 500,
      responseText: error,
    };
    response.status(500).json(errorObject);
  }
}

superagent.get(url)
  .query(queryStringParams)
  .then(data => {
    let location = new Location(city, locationData[0]);
    data.json(location);
  });

function Location(city, data) {
  this.search_query = city;
  this.formatted_query = data.display_name;
  this.latitude = data.lat;
  this.longitude = data.lon;
}

app.get('/weather', handleWeather);

function handleWeather(request, response) {
  let weatherData = require('./data/darksky.json');
  let dailyWeather = [];

  weatherData.daily.data.forEach(day => {
    let forecast = new DailyForecast(day);
    dailyWeather.push(forecast);
  });
  response.json(dailyWeather);
}

function DailyForecast(day) {
  this.forecast = day.summary;
  this.time = day.time;
}

app.listen(PORT, () => console.log('Server is up on', PORT));