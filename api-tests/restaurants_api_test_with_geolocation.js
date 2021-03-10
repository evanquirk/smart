'use strict';

// Tested in an external folder where I installed this Node.js client: https://www.npmjs.com/package/yelp-fusion
const yelp = require('yelp-fusion');
const fetch = require("node-fetch");

const apiKey = null; // insert API key here

const client = yelp.client(apiKey);

const searchYelp = function(term) {
  fetch('https://api.ipify.org?format=json')
  .then(a => a.json())
      .then(response => {
        getCoordsFromIP(response.ip, term);
      })
};

const getCoordsFromIP = function(ip, term) {
  fetch(`https://freegeoip.app/json/${ip}`)
  .then(a => a.json())
      .then(response => {
        const latitude = response.latitude;
        const longitude = response.longitude;
        client.search({
          term: term,
          latitude: latitude,
          longitude: longitude,
        }).then(response => {
          console.log(response.jsonBody.businesses[0].name + '\n'
          + response.jsonBody.businesses[0].location.address1 + ', ' + response.jsonBody.businesses[0].location.city + '\n'
          + response.jsonBody.businesses[0].phone + '\n'
          + response.jsonBody.businesses[0].categories[0].title + '\n'
          + response.jsonBody.businesses[0].price);
        }).catch(e => {
          console.log(e);
        });
      })
}



searchYelp(); // insert search terms in this call
