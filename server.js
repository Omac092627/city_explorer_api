'use strict';

require('dotenv').config();

const cors = require('cors');
const express = require('express');
const PORT = process.env.PORT;
const app = express();
const superagent = require('superagent');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

app.use(cors());

app.get('/location', handleLocation);
app.get('/weather', handleWeather);
app.get('/trails', handleTrails);



function handleLocation( request, response ) {
  try {
    let city = request.query.city;
    
    //https://us1.locationiq.com/v1/search.php?key=YOUR_PRIVATE_TOKEN&q=SEARCH_STRING&format=json
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
    // throw 'Location does not exist';
    response.json(location);
      })
    
  }
  catch(error) {
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



function handleTrails(request, response){
  const queryStringParams = {
    key: process.env.TRAIL_API_KEY,
    q: city,
    format: 'json',
    limit: 1,
  }

  superagent.get(url)
  .query(queryStringParams)
    .then(data => {
      let locationData = data.body[0];
      let location = new Location(city, locationData);
  // throw 'Location does not exist';
  response.json(location);
    })
  
}
  trailData.trail.data.map(trails => {
    let whereToGo = new Trail(trails);
    trailAdventure.push(whereToGo);
  })
  response.json(trailAdventure);


function Trail(trails){
  this.name = name;
  this.location = location;
  this.length = length;
  this.stars = int;
  this.starVotes = int;
  this.summary = summary;
  this.trail_url = url;
  this.conditions = conditions;
  this.conditionDate = int;
  this.conditionTime = int;
}

const SQL = 'SELECT * FROM table';

  client.query(SQL)
    .then( locations => {
      if( locations === true) {
        res.status(200).json(locations);
      }
      else {
        res.status(400).send('No Results Found');
      }
    })
    .catch(err => res.status(500).send(err));


app.get('/new', (req,res) => {


  let SQL = `
    INSERT INTO locations (longitude, latitude)
    VALUES($1, $2)
  `;

  let VALUES = [req.query.longitude, req.query.latitude];

  client.query(SQL, VALUES)
    .then( results => {
      if ( results === true ) {
        res.status(301).redirect('https://us1.locationiq.com/v1/search.php');
      }
      else {
        res.status(200).send('Not Added');
      }
    })
    .catch(err => res.status(500).send(err));

});


app.listen( PORT, () => console.log('Server is up on', PORT));