const express = require('express');
const router  = express.Router();
const { insertSearchResults, getSearchResults, deleteSearchResults, deleteTodo } = require('../helpers/toDoQueries');
const { getUserById } = require('../helpers/authQueries');

const { searchYelp } = require('../api-helpers/yelp');
const { searchBooks } = require('../api-helpers/books');
const { searchMovies } = require('../api-helpers/movies');
const { searchItems } = require('../api-helpers/grocery-items');


module.exports = () => {

  router.post("/", async (req, res) => {
    const searchResults = await getSearchResults();
    console.log(searchResults);
    if (searchResults) {
      await deleteSearchResults();
    }

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
    }).finally(() => res.redirect('/user-lists'))
  });


  //===========================================

  router.post("/:id/delete", async (req, res) => {
    const toDoId = req.params.id

    await deleteTodo(toDoId)

   res.redirect("/user-lists")

  });

  return router;
};
