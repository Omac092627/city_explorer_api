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
app.get('/restaurants', handleRestaurants);


function handleLocation(request, response) {
  // GET https://us1.locationiq.com/v1/search.php?key=YOUR_PRIVATE_TOKEN&q=SEARCH_STRING&format=json

  let city = request.query.city;
  const url = 'https://us1.locationiq.com/v1/search.php';
  const queryStringParams = {
    key: process.env.LOCATION_TOKEN,
    q: city,
    format: 'json',
    limit: 1,
  }
  superagent.get(url)
    .query(queryStringParams)
    .then(data => {
      let locationData = data.body[0];
      let location = new Location(city, locationData);
      response.json(location);
    });
  try {

  }
  catch (error) {
    let errorObject = {
      status: 500,
      responseText: error,
    };
    response.status(500).json(errorObject);
  }
}


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

function handleRestaurants(request, response) {

  // let restaurantData = require('./data/restaurants.json');
  let listOfRestaurants = [];

  let url = 'https://developers.zomato.com/api/v2.1/geocode';
  let queryStringParams = {
    lat: request.query.latitude,
    lon: request.query.longitude,
  };

  // user-key
  superagent.get(url)
    .query(queryStringParams)
    .set('user-key', process.env.ZOMATO_TOKEN)
    .then( data => {
      let restaurantData = data.body;
      restaurantData.nearby_restaurants.forEach(r => {
        let restaurant = new Restaurant(r);
        listOfRestaurants.push(restaurant);
      });

      response.json(listOfRestaurants);
    });

}

function Restaurant(data) {
  this.name = data.restaurant.name;
  this.cuisines = data.restaurant.cuisines;
  this.locality = data.restaurant.location.locality;
}

app.listen(PORT, () => console.log('Server is up on', PORT));