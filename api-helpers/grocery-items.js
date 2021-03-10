"use strict";

const Fuse = require("fuse.js");

const items = [
  {
    name: "Organic Broccoli Florets (Frozen)",
    description:
      "Earthbound Farm. Frozen and delicious, ready for any recipe. $4.49 for 300g",
  },
  {
    name: "Organic Berry Blend (Frozen)",
    description:
      "Earthbound Farm. A delicious mix of premium organic strawberries, blackberries, blueberries and raspberries. $6.49 for 284g",
  },
  {
    name: "Organic Blueberries (Frozen)",
    description:
      "Earthbound Farm. Superfood orbs, frozen at the perfect moment. Delectable convenience. $6.49 for 300g",
  },
  {
    name: "Organic Butternut Squash (Frozen)",
    description:
      "Earthbound Farm. A rich and flavorful harvest season favorite. Delicious as a simple side and excellent in recipes. $4.69 for 400g",
  },
  {
    name: "Organic Cut Spinach (Frozen)",
    description:
      "Earthbound Farm. Flavorful and versatile organic spinach is an easy side dish and a delicious addition to soups, stews, sautés and casseroles. $4.69 for 300 g",
  },
  {
    name: "Organic Green Beans (Frozen)",
    description:
      "Earthbound Farm. A frozen garden classic with the flavor and nutrition of fresh. $4.49 for 300g",
  },
  {
    name: "Organic Green Peas (Frozen)",
    description:
      "Earthbound Farm. Sweet, tender and organically delicious. Perfect solo or in your favorite recipes. $4.49 for 350g",
  },
  {
    name: "Organic Strawberries (Frozen)",
    description:
      "Earthbound Farm. Frozen at peak flavor. Sweet and ready to use. $6.49 for 300g",
  },
  {
    name: "Organic Sweet Red Cherries (Frozen)",
    description:
      "Earthbound Farm. Frozen at their peak. Convenient and recipe-ready. $6.49 for 300g",
  },
  {
    name: "Almond Butter - Crunchy",
    description:
      "New World. We love our almond butter the old fashioned way: 100% natural, with dry roasted almonds and nothing else! This natural almond butter is made in Vancouver by New World Foods, a Canadian family company dedicated to making healthy foods for the community. $12.99 for 365 g",
  },
  {
    name: "Organic Peanut Butter - Crunchy, Unsalted",
    description:
      "New World. Old fashioned organic peanut butter as nature intended. Made in Vancouver with 100% organic dry roasted peanuts and nothing else, our organic peanut butter is deliciously rich and nutty. $9.49 for 500 g",
  },
  {
    name: "Organic Avocado",
    description:
      "Promiche. Creamy, buttery and oh so decadent, avocados are a great addition to any sushi roll, sandwich, salad or Mexican dish. They also provide nearly 20 essential nutrients, including Vitamin E, B-Vitamins, folic acid and essential fats. $0.99 for 1 Medium Avocado",
  },
  {
    name: "Organic Bananas",
    description:
      "Organics Unlimited. Bananas are tasty, creamy and full of essential nutrients. They are also extremely high in potassium, over 467 mg per banana. $3.79 for 6 Bananas",
  },
];

const fuse = new Fuse(items, {
  keys: ["name"],
});

const searchItems = function (searchTerms) {
  const results = fuse.search(searchTerms);
  console.log(results[0].item);
  return results[0].item;
};

module.exports = { searchBooks };
