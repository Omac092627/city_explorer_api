'use strict';

console.log('welcome to city explorer');

$('#search-form').on('submit', getData);

function getData(event) {
  event.preventDefault();
  let city = $('#city').val();

  // get the data
  $.ajax('/fake-data/location.json')
    .then( location => {
      renderTitle(location);
      renderMap(location);
      renderRestaurants(location);
    });
}

function renderTitle(data) {
  let template = $('#title-template').html();
  let container = $('#title');
  container.html( Mustache.render(template, data) );
}

function renderMap(data) {
  let template = $('#map-template').html();
  let container = $('#map');
  container.html( Mustache.render(template, data));
}

function renderRestaurants(data) {
  //restaurants
  let template = $('#restaurants-template').html(); // <li></li>
  let container = $('#restaurants'); // <ul></ul>

  $.ajax('/fake-data/restaurants.json')
    .then( listOfRestaurants => {
      listOfRestaurants.forEach( restaurant => {
        container.append(Mustache.render(template, restaurant));
      });
    });
}