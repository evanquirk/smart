"use strict";

const fetch = require("node-fetch");

// insert API key here:
const omdbKey = null;

const searchMovies = function (searchTerms) {
  fetch(`http://www.omdbapi.com/?apikey=${omdbKey}&t=` + searchTerms)
    .then((a) => a.json())
    .then((response) => {
      let results = [];
      let result1 = {};
      let result2 = {};
      result1.name = response["Title"];
      result1.description =
        response["Director"] +
        ", " +
        response["Year"] +
        ", " +
        response["Plot"];
      result1.type = "to_watch";
      results.push(result1);
      result2.name = response["Title"];
      result2.description =
        response["Director"] +
        ", " +
        response["Year"] +
        ", " +
        response["Plot"];
      result2.type = "to_watch";
      if (result2.description !== result1.description) {
        results.push(result2);
      }
      return results;
    });
};

module.exports = { searchMovies };
