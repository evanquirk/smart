"use strict";

const yelp = require("yelp-fusion");
const fetch = require("node-fetch");


// insert API key here:
const yelpKey = null;

const client = yelp.client(yelpKey);

const searchYelp = function (searchTerms) {
  return fetch("https://api.ipify.org?format=json") // finds the user's IP address
    .then((a) => a.json())
    .then((response) => {
      return getCoordsFromIP(response.ip, searchTerms);
    });
};

const getCoordsFromIP = function (ip, searchTerms) {
  return fetch(`https://freegeoip.app/json/${ip}`) /* locates the user.
    Of course, in a production app I'd need to get the user's permission before any of this,
    I'd need to be compliant with the privacy laws of different countries, etc. */
    .then((a) => a.json())
    .then((response) => {
      const latitude = response.latitude;
      const longitude = response.longitude;
      return client
        .search({
          term: searchTerms,
          latitude: latitude,
          longitude: longitude,
        })
        .then((response) => {
          let results = [];
          let result1 = {};
          let result2 = {};
          // let result3 = {};
          if (response.jsonBody.businesses[0] !== undefined) {
            result1.name = response.jsonBody.businesses[0].name;
            result1.description =
              response.jsonBody.businesses[0].location.address1 +
              ", " +
              response.jsonBody.businesses[0].location.city;
            if (response.jsonBody.businesses[0].categories[0].title) {
              result1.description +=
                ", " + response.jsonBody.businesses[0].categories[0].title;
            }
            if (response.jsonBody.businesses[0].price) {
              result1.description +=
                ", " + response.jsonBody.businesses[0].price;
            }
            result1.type = "to_eat";
            results.push(result1);
            if (response.jsonBody.businesses[1].name) {
              result2.name = response.jsonBody.businesses[1].name;
              result2.description =
                response.jsonBody.businesses[1].location.address1 +
                ", " +
                response.jsonBody.businesses[1].location.city;
              if (response.jsonBody.businesses[1].categories[0].title) {
                result2.description +=
                  ", " + response.jsonBody.businesses[1].categories[0].title;
              }
              if (response.jsonBody.businesses[1].price) {
                result2.description +=
                  ", " + response.jsonBody.businesses[1].price;
              }
              result2.type = "to_eat";
              results.push(result2);
            }
          }
          return results;
        });
    });
};

module.exports = { searchYelp };
