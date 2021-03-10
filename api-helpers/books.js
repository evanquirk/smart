"use strict";

const fetch = require("node-fetch");

const searchBooks = function (searchTerms) {
  fetch("https://www.googleapis.com/books/v1/volumes?q=" + searchTerms)
    .then((a) => a.json())
    .then((response) => {
      let results = [];
      let result1 = {};
      let result2 = {};
      result1.name = response.items[0].volumeInfo.title;
      result1.description =
        response.items[0].volumeInfo.authors[0] +
        ", " +
        response.items[0].volumeInfo.publishedDate.slice(0, 4);
      for (let i = 0; i < 4; i++) {
        if (response.items[i].volumeInfo.description.length > 100) {
          result1.description +=
            ". " + response.items[i].volumeInfo.description;
          break;
        } else {
          result1.description +=
            ". " + response.items[i].volumeInfo.description;
        }
      }
      results.push(result1);
      result2.name = response.items[1].volumeInfo.title;
      result2.description =
        response.items[1].volumeInfo.authors[0] +
        ", " +
        response.items[1].volumeInfo.publishedDate.slice(0, 4);
      for (let i = 1; i < 5; i++) {
        if (response.items[i].volumeInfo.description.length > 100) {
          result2.description +=
            ". " + response.items[i].volumeInfo.description;
          break;
        } else {
          result2.description +=
            ". " + response.items[i].volumeInfo.description;
        }
      }
      results.push(result2);
      return results;
    });
};

module.exports = { searchBooks };
