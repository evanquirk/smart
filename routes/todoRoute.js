const express = require('express');
const router  = express.Router();
const { yelpSearch } = require('../apiQueries');



module.exports = () => {
  router.post("/", async (req, res) => {
    const todoSearch = req.body.todo
    const yelpObjs = yelpSearch(ip, todoSearch)

    // add this to the database as a tempVar essentially...
    const searchArray = [] // a column in the users table: current_search
    searchArray.push(yelpObjs)

    res.redirect('/todo')

  });

  router.get("/", async (req, res) => {
    // make a queries to get the alltheobj from the database = templateVars
   res.render("../views/todo.ejs", templateVars)

  });

  return router;
};
