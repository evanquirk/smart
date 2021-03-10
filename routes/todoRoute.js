const express = require('express');
const router  = express.Router();
const { toDoById } = require('../helpers/toDoQueries');
const { getUserById } = require('../helpers/authQueries')
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
    const user = await getUserById(req.session.user_id);
    const toDo = await toDoById(req.session.user_id);
    let templateVars = {
      user: user,
      toDo: toDo
    }
    console.log(templateVars)

   res.render("../views/todo.ejs", templateVars)

  });

  return router;
};
