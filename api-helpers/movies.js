"use strict";

const fetch = require("node-fetch");

// insert API key here:
const omdbKey = null;

const searchMovies = function (searchTerms) {
  return fetch(`http://www.omdbapi.com/?apikey=${omdbKey}&t=` + searchTerms)
    .then((a) => a.json())
    .then((response) => {
      let results = [];
      let result1 = {};
      if (response["Title"] !== undefined) {
        result1.name = response["Title"];
        result1.description =
        response["Director"] +
        ", " +
        response["Year"] +
        ", " +
        response["Plot"];
      result1.type = "to_watch";
      results.push(result1);
      }
      return results;
    });
};

module.exports = { searchMovies };
