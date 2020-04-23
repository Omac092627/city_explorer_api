'use strict';

const superagent = require('superagent');

module.exports = handleRestaurants;

function handleRestaurants(req, res){
    let key = process.env.YELP_API_KEY;
    let city = req.query.search_query;
    let url =  `https://api.yelp.com/v3/businesses/search?location=${city}`;

    superagent.get(url)
    .set ('Authorization', `Bearer ${key}`)
    .then(data => {
        let restaurantData = data.body.businesses.map(restaurant => {
            return new Restaurant(restaurant)
        })
        res.json(restaurantData);
    })
    .catch((error) => errorHandler(error, request, response));

}

function Restaurant(restaurant){
    this.name = restaurant.name;
    this.image_url = restaurant.image_url;
    this.price = restaurant.price;
    this.rating = restaurant.rating;
    this.url = restaurant.url;
}

function errorHandler(error, request, response) {
    response.status(500).send(error);
  }