'use strict';

/*
  The .env file has this in it:
  PORT=3000
*/
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const superagent = require('superagent');

const PORT = process.env.PORT;

const app = express();
app.use(cors());

app.get('/location', handleLocation);
app.get('/restaurants', handleRestaurants);

function handleLocation( request, response ) {
  // eventually, get this from a real live API
  // https://us1.locationiq.com/v1/search.php?key=c4ba37684e44b9&q=seattle&format=json
  // From the browser, we do $.ajax()
  // But this is a server. And we don't have jQuery here (or ever will)
  // Use a library called 'superagent'

  let city = request.query.city;
  const url = 'https://us1.locationiq.com/v1/search.php';
  const queryStringParams = {
    key: process.env.LOCATION_TOKEN,
    q: city,
    format: 'json',
    limit: 1,
  };
  // $.ajax(url)
  superagent.get(url)
    .query(queryStringParams)
    .then( data => {
      let locationData = data.body[0];
      let location = new Location(city, locationData);
      response.json(location);
    });
}

function Location(city, data) {
  this.search_query = city;
  this.formatted_query = data.display_name;
  this.latitude = data.lat;
  this.longitude = data.lon;
}

/* Restaurants

  {
    "restaurant": "Serious Pie",
    "cuisines": "Pizza, Italian",
    "locality": "Belltown"
  },
*/


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
      
      
  app.listen( PORT, () => console.log('Server up on', PORT));
