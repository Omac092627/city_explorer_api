'use strict';



require('dotenv').config();

const cors = require('cors');
const express = require('express');
const pg = require('pg');

const handleLocation = require('./location');
const handleWeather = require('./weather');
const handleTrails = require('./trails');
const handleRestaurants = require('./restaurants');
const handleMovies = require('./movies');


const PORT = process.env.PORT;
const app = express();


app.use(cors());

app.get('/location', handleLocation);
app.get('/weather', handleWeather);
app.get('/trails', handleTrails);
app.get('/movies', handleMovies);
app.get('./yelp', handleRestaurants);
app.use('*', notFoundHandler);
app.use(errorHandler);

function render(data, response) {
    response.status(200).json(data);
  }
  
  function notFoundHandler(request, response) {
    response.status(404).send('huh?');
  }
  
  function errorHandler(error, request, response) {
    response.status(500).send(error);
  }
  
  function startServer() {
    app.listen(PORT, () => console.log(`Server up on ${PORT}`));
  }

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));
client.connect()
  .then(startServer)
  .catch(err => console.error(err));