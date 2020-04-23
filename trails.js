'use strict'

const superagent = require('superagent');

module.exports = handleTrails;

function handleTrails(request, response){
    const url = 'https://www.hikingproject.com/data/get-trails';
    const queryStringParams = {
        key: process.env.TRAIL_API_KEY,
        lat: request.query.latitude,
        lon: request.query.longitude,
        maxResults: 10,
    }
    superagent.get(url)
    .query(queryStringParams)
    .then(data => {
        let trailsData = data.body.rails.map(trail => {
            return new Adventure(trail);
        })
    response.json(trailsData);
    })
}

function Adventure(trail){
    this.name = trail.name;
    this.location = trail.location;
    this.length = trail.length;
    this.stars = trail.stars;
    this.star_votes = trail.star_votes;
    this.summary = trail.summary;
    this.trail_url = trail.url;
    this.conditions = trail.conditionDetails;
    this.condition_date - trail.conditionDate.substring(0,10);
    this.condition_time = trail.conditionDate.substring(11,20);
}

