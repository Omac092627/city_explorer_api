'use strict';


//Get everything we need//

require('dotenv').config();

const cors = require('cors');
const express = require('express');
const PORT = process.env.PORT;
const app = express();
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);

const handleLocation = require('./location');
const handleWeather = require('./weather');
const handleTrails = require('./trails');
const handleRestaurants = require('./restaurants');
const handleMovies = require('./movies');



client.connect();

app.use(cors());

app.get('/location', handleLocation);
app.get('/weather', handleWeather);
app.get('/trails', handleTrails);
app.get('/movies', handleMovies);
app.get('./yelp', handleRestaurants);

app.listen( PORT, () => console.log('Server is up on', PORT));




//finished with getting things we need//





// //trails location handler//

// function handleTrails(request, response){
//   try {
//     let trails = request.query.trails;
    
//     //https://us1.locationiq.com/v1/search.php?key=YOUR_PRIVATE_TOKEN&q=SEARCH_STRING&format=json
//     const url = 'https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200729356-4eecbd094e984a52663112a90410d85e';
//     const queryStringParams = {
//       key: process.env.TRAIL_API_KEY,
//       q: trails,
//       format: 'json',
//       limit: 1,
//     }
    
//   superagent.get(url)
//   .query(queryStringParams)
//     .then(data => {
//       let trailName = data.body[0];
//       let trailAdventure = new Trail();
//   // throw 'Location does not exist';
//   response.json(trailName, trailAdventure);
//     })
// }


// catch(error) {
//   let errorObject = {
//     status: 500,
//     responseText: error,
//   };
//   response.status(500).json(errorObject);
// }
// trailName.trails.data.map(trails => {
//   let whereToGo = new Trail();
//   trails.push(whereToGo);
// })
// response.json(trails);
// }

// function Trail(){
//   this.name = name;
//   this.location = location;
//   this.length = length;
//   this.stars = int;
//   this.starVotes = int;
//   this.summary = summary;
//   this.trail_url = url;
//   this.conditions = conditions;
//   this.conditionDate = int;
//   this.conditionTime = int;
// }

// const SQL = 'SELECT * FROM locations';

//   client.query(SQL)
//     .then( locations => {
//       if( locations === true) {
//         res.status(200).json(locations);
//       }
//       else {
//         res.status(400).send('No Results Found');
//       }
//     })
//     .catch(err => res.status(500).send(err));


// app.get('/new', (req,res) => {


//   let SQL = `
//     INSERT INTO locations (latitude, longitude)
//     VALUES($1, $2)
//   `;

//   let VALUES = [req.query.latitude, req.query.longitude];

//   client.query(SQL, VALUES)
//     .then( results => {
//       if ( results === true ) {
//         res.status(301).redirect('https://us1.locationiq.com/v1/search.php');
//       }
//       else {
//         res.status(200).send('Not Added');
//       }
//     })
//     .catch(err => res.status(500).send(err));

// });

