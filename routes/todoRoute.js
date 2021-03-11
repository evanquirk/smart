const express = require('express');
const router  = express.Router();
const { insertSearchResults, getSearchResults } = require('../helpers/toDoQueries');
const { getUserById } = require('../helpers/authQueries');
const { searchYelp } = require('../api-helpers/yelp');
const { searchBooks } = require('../api-helpers/books');
const { searchMovies } = require('../api-helpers/movies');
const { searchItems } = require('../api-helpers/grocery-items');


module.exports = () => {

  router.post("/", async (req, res) => {
    const todoSearch = req.body.todo
    const yelpPromise = searchYelp(todoSearch)
    const bookPromise = searchBooks(todoSearch)
    const moviePromise = searchMovies(todoSearch)

    Promise.all([yelpPromise, bookPromise, moviePromise])
    .then((values) => {
      const grocery = searchItems(todoSearch)
      return [...values[0],...values[1],...values[2],...grocery]
    }).then(results => {
      return insertSearchResults(results)
    }).finally(() => res.redirect('/todo'))
  });


  //===========================================

  router.get("/", async (req, res) => {
    const user = await getUserById(req.session.user_id);
    const searchResults = await getSearchResults();
    let results
    // const toWatch =[];
    // const toRead =[];
    // const toEat =[];
    // const toBuy =[];
    // const uncategorized =[];

    if (!searchResults) {
      results = null
    } else {
      // console.log('RESULTS:',JSON.parse(searchResults.results));
      results = JSON.parse(searchResults.results)
      // for (result of results) {
      //   if (result.type === 'to_watch') {
      //     toWatch.push(result)
      //   } else if (result.type === 'to_read') {
      //     toRead.push(result)
      //   } else if (result.type === 'to_eat') {
      //     toEat.push(result)
      //   } else if (result.type === 'to_buy') {
      //     toBuy.push(result)
      //   } else {
      //     uncategorized.push(result)
      //   }
      // }
    }
    const templateVars = {
      user,
      results,
      // toWatch,
      // toRead,
      // toEat,
      // toBuy,
      // uncategorized
    }

   res.render("../views/todo.ejs", templateVars)

  });

  return router;
};
