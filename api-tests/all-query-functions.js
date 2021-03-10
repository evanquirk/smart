"use strict";

const yelp = require("yelp-fusion");
const fetch = require("node-fetch");
const Fuse = require("fuse.js");

// insert API keys here:
const yelpKey = null;
const omdbKey = null;

/*
to query each category (add search terms in function call):
searchYelp();
searchMovies();
searchBooks();
searchItems();
*/

const client = yelp.client(yelpKey);

const searchYelp = function (searchTerms) {
  fetch("https://api.ipify.org?format=json")
    .then((a) => a.json())
    .then((response) => {
      getCoordsFromIP(response.ip, searchTerms);
    });
};

const getCoordsFromIP = function (ip, searchTerms) {
  fetch(`https://freegeoip.app/json/${ip}`)
    .then((a) => a.json())
    .then((response) => {
      const latitude = response.latitude;
      const longitude = response.longitude;
      client
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
          result1.address = response.jsonBody.businesses[0].location.address1;
          result1.city = response.jsonBody.businesses[0].location.city;
          result1.type = response.jsonBody.businesses[0].categories[0].title;
          result1.priceRange = response.jsonBody.businesses[0].price;
          results.push(result1);
          if (response.jsonBody.businesses[1].name) {
            result2.name = response.jsonBody.businesses[1].name;
            result2.address = response.jsonBody.businesses[1].location.address1;
            result2.city = response.jsonBody.businesses[1].location.city;
            result2.type = response.jsonBody.businesses[1].categories[0].title;
            result2.priceRange = response.jsonBody.businesses[1].price;
            results.push(result2);
          }
          if (response.jsonBody.businesses[2].name) {
            result3.name = response.jsonBody.businesses[2].name;
            result3.address = response.jsonBody.businesses[2].location.address1;
            result3.city = response.jsonBody.businesses[2].location.city;
            result3.type = response.jsonBody.businesses[2].categories[0].title;
            result3.priceRange = response.jsonBody.businesses[2].price;
            results.push(result3);
          }
          console.log(results);
          return results;
        });
    });
};

const searchMovies = function (searchTerms) {
  fetch(`http://www.omdbapi.com/?apikey=${omdbKey}&t=` + searchTerms)
    .then((a) => a.json())
    .then((response) => {
      let results = [];
      let result1 = {};
      let result2 = {};
      result1.title = response["Title"];
      result1.director = response["Director"];
      result1.year = response["Year"];
      result1.plot = response["Plot"];
      results.push(result1);
      result2.title = response["Title"];
      result2.director = response["Director"];
      result2.year = response["Year"];
      result2.plot = response["Plot"];
      if (
        result2.year !== result1.year &&
        result2.director !== result1.director
      ) {
        results.push(result2);
      }
      console.log(results);
      return results;
    });
};

const searchBooks = function (searchTerms) {
  fetch("https://www.googleapis.com/books/v1/volumes?q=" + searchTerms)
    .then((a) => a.json())
    .then((response) => {
      let results = [];
      let result1 = {};
      let result2 = {};
      result1.title = response.items[0].volumeInfo.title;
      result1.director = response.items[0].volumeInfo.authors[0];
      result1.year = response.items[0].volumeInfo.publishedDate.slice(0, 4);
      for (let i = 0; i < 4; i++) {
        if (response.items[i].volumeInfo.description.length > 100) {
          result1.description = response.items[i].volumeInfo.description;
          break;
        } else {
          result1.description = response.items[i].volumeInfo.description;
        }
      }
      results.push(result1);
      result2.title = response.items[1].volumeInfo.title;
      result2.director = response.items[1].volumeInfo.authors[0];
      result2.year = response.items[1].volumeInfo.publishedDate.slice(0, 4);
      for (let i = 1; i < 5; i++) {
        if (response.items[i].volumeInfo.description.length > 100) {
          result2.description = response.items[i].volumeInfo.description;
          break;
        } else {
          result2.description = response.items[i].volumeInfo.description;
        }
      }
      results.push(result2);
      console.log(results);
      return results;
    });
};

const items = [
  {
    product_name: "Organic Broccoli Florets (Frozen)",
    supplier: "Earthbound Farm",
    description: "Frozen and delicious, ready for any recipe.",
    price: "$4.49 for 300g",
  },
  {
    product_name: "Organic Berry Blend (Frozen)",
    supplier: "Earthbound Farm",
    description:
      "A delicious mix of premium organic strawberries, blackberries, blueberries and raspberries.",
    price: "$6.49 for 284g",
  },
  {
    product_name: "Organic Blueberries (Frozen)",
    supplier: "Earthbound Farm",
    description:
      "Superfood orbs, frozen at the perfect moment. Delectable convenience.",
    price: "$6.49 for 300g",
  },
  {
    product_name: "Organic Butternut Squash (Frozen)",
    supplier: "Earthbound Farm",
    description:
      "A rich and flavorful harvest season favorite. Delicious as a simple side and excellent in recipes.",
    price: "$4.69 for 400g",
  },
  {
    product_name: "Organic Cut Spinach (Frozen)",
    supplier: "Earthbound Farm",
    description:
      "Flavorful and versatile organic spinach is an easy side dish and a delicious addition to soups, stews, sautés and casseroles.",
    price: "$4.69 for 300 g",
  },
  {
    product_name: "Organic Green Beans (Frozen)",
    supplier: "Earthbound Farm",
    description:
      "A frozen garden classic with the flavor and nutrition of fresh.",
    price: "$4.49 for 300g",
  },
  {
    product_name: "Organic Green Peas (Frozen)",
    supplier: "Earthbound Farm",
    description:
      "Sweet, tender and organically delicious. Perfect solo or in your favorite recipes.",
    price: "$4.49 for 350g",
  },
  {
    product_name: "Organic Strawberries (Frozen)",
    supplier: "Earthbound Farm",
    description: "Frozen at peak flavor. Sweet and ready to use.",
    price: "$6.49 for 300g",
  },
  {
    product_name: "Organic Sweet Red Cherries (Frozen)",
    supplier: "Earthbound Farm",
    description: "Frozen at their peak. Convenient and recipe-ready.",
    price: "$6.49 for 300g",
  },
  {
    product_name: "Almond Butter - Crunchy",
    supplier: "New World",
    description:
      "We love our almond butter the old fashioned way: 100% natural, with dry roasted almonds and nothing else! This natural almond butter is made in Vancouver by New World Foods, a Canadian family company dedicated to making healthy foods for the community.",
    price: "$12.99 for 365 g",
  },
  {
    product_name: "Organic Peanut Butter - Crunchy, Unsalted",
    supplier: "New World",
    description:
      "Old fashioned organic peanut butter as nature intended. Made in Vancouver with 100% organic dry roasted peanuts and nothing else, our organic peanut butter is deliciously rich and nutty.",
    price: "$9.49 for 500 g",
  },
  {
    product_name: "Organic Avocado",
    supplier: "Promiche",
    description:
      "Creamy, buttery and oh so decadent, avocados are a great addition to any sushi roll, sandwich, salad or Mexican dish. They also provide nearly 20 essential nutrients, including Vitamin E, B-Vitamins, folic acid and essential fats.",
    price: "$0.99 for 1 Medium Avocado",
  },
  {
    product_name: "Organic Bananas",
    supplier: "Organics Unlimited",
    description:
      "Bananas are tasty, creamy and full of essential nutrients. They are also extremely high in potassium, over 467 mg per banana.",
    price: "$3.79 for 6 Bananas",
  },
];

const fuse = new Fuse(items, {
  keys: ["product_name"],
});

const searchItems = function (searchTerms) {
  const results = fuse.search(searchTerms);
  console.log(results[0].item, results[1].item, results[2].item);
  return results[0].item, results[1].item, results[2].item;
};
