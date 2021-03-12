"use strict";

const yelp = require("yelp-fusion");
const fetch = require("node-fetch");


// insert API key here:
const yelpKey = null;

const client = yelp.client(yelpKey);

const searchYelp = function (searchTerms) {
  searchTerms = searchTerms.toLowerCase();
  if (searchTerms.startsWith("go to ")) {
    searchTerms = searchTerms.slice(6);
  }
  if (searchTerms.startsWith("go to") && !searchTerms.startsWith("go to ")) {
    searchTerms = searchTerms.slice(5);
  }
  return fetch("https://api.ipify.org?format=json") // finds the user's IP address
    .then((a) => a.json())
    .then((response) => {
      return getCoordsFromIP(response.ip, searchTerms);
    });
};

const getCoordsFromIP = function (ip, searchTerms) {
  return fetch(
    `https://freegeoip.app/json/${ip}`
  ) /* locates the user.
  In a production app I would get the user's permission before any of this. */
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
            if (response.jsonBody.businesses[1] !== undefined) {
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
