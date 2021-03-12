"use strict";

const fetch = require("node-fetch");

// insert API key here:
const omdbKey = null;

const searchMovies = function (searchTerms) {
  searchTerms = searchTerms.toLowerCase();
  if (
    searchTerms.startsWith("watch ") &&
    !searchTerms.startsWith("watch out") &&
    !searchTerms.startsWith("watch it") &&
    !searchTerms.startsWith("watch your") &&
    searchTerms !== "watch" &&
    searchTerms !== "watch beverly" &&
    searchTerms !== "watch on the rhine" &&
    searchTerms !== "watch men" &&
    searchTerms !== "watch tower"
  ) {
    searchTerms = searchTerms.slice(6);
  }
  return fetch(`http://www.omdbapi.com/?apikey=${omdbKey}&t=` + searchTerms)
    .then((a) => a.json())
    .then((response) => {
      let results = [];
      let result1 = {}; // OMDb's free API only returns one result for a "title" search, which includes description data.
      if (response["Title"] !== undefined) {
        result1.name = response["Title"];
        result1.description = "";
        if (response["Director"] !== "N/A") {
          result1.description = response["Director"] + ", ";
        }
        result1.description += response["Year"] + ". " + response["Plot"];
        result1.type = "to_watch";
        results.push(result1);
      }
      return results;
    });
};

module.exports = { searchMovies };


