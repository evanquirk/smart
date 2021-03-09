'use strict';

// Tested in an external folder where I installed this Node.js client: https://www.npmjs.com/package/yelp-fusion
const yelp = require('yelp-fusion');

const apiKey = null; // insert API key here

const client = yelp.client(apiKey);

client.search({
  term: null, // insert search terms here
  latitude: null, // latitude and longitude can be calculated via IP
  longitude: null
}).then(response => {
  console.log(response.jsonBody.businesses[0].name + '\n'
  + response.jsonBody.businesses[0].location.address1 + ', ' + response.jsonBody.businesses[0].location.city + '\n'
  + response.jsonBody.businesses[0].phone + '\n'
  + response.jsonBody.businesses[0].categories[0].title + '\n'
  + response.jsonBody.businesses[0].price);
}).catch(e => {
  console.log(e);
});

