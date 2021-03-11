"use strict";

const yelp = require("yelp-fusion");
const fetch = require("node-fetch");

// insert API key here:
const yelpKey = '6RXcVR53GBnlJ3hNSAyLBjsPTblI6nln3Xf5QdqqDW_rIVZOUnh-RQNEMCWwTCg0OISX0L51VDsecigNHJqOCE8dONoJYRjr925H6PBOUUnrJccO2YLb9J7MMGVGYHYx';

const client = yelp.client(yelpKey);

const searchYelp = function (searchTerms) {
  return fetch("https://api.ipify.org?format=json")
    .then((a) => a.json())
    .then((response) => {
      return getCoordsFromIP(response.ip, searchTerms);
    });
};

const getCoordsFromIP = function (ip, searchTerms) {
  return fetch(`https://freegeoip.app/json/${ip}`)
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
          let result3 = {};
          result1.name = response.jsonBody.businesses[0].name;
          result1.description =
            response.jsonBody.businesses[0].location.address1 +
            ", " +
            response.jsonBody.businesses[0].location.city +
            ", " +
            response.jsonBody.businesses[0].categories[0].title +
            ", " +
            response.jsonBody.businesses[0].price;
          result1.type = "to_eat";
          results.push(result1);
          if (response.jsonBody.businesses[1].name) {
            result2.name = response.jsonBody.businesses[1].name;
            result2.description =
              response.jsonBody.businesses[1].location.address1 +
              ", " +
              response.jsonBody.businesses[1].location.city +
              ", " +
              response.jsonBody.businesses[1].categories[0].title +
              ", " +
              response.jsonBody.businesses[1].price;
            result2.type = "to_eat";
            results.push(result2);
          }
          if (response.jsonBody.businesses[2].name) {
            result3.name = response.jsonBody.businesses[2].name;
            result3.description =
              response.jsonBody.businesses[2].location.address1 +
              ", " +
              response.jsonBody.businesses[2].location.city +
              ", " +
              response.jsonBody.businesses[2].categories[0].title +
              ", " +
              response.jsonBody.businesses[2].price;
            result1.type = "to_eat";
            results.push(result3);
          }
          return results;
        });
    });
};




module.exports = { searchYelp };
