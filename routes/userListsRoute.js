const express = require('express');
const router  = express.Router();
const { getUserById } = require('../helpers/authQueries');
const { listById } = require('../helpers/listsQueries');
const { toDoById , addNewToDo, deleteSearchResults, getSearchResults } = require('../helpers/toDoQueries');


module.exports = () => {
  router.get("/", async (req, res) => {
    const userId = req.session.user_id;
    const user = await getUserById(userId);
    const lists = await listById(userId);
    const toDos = await toDoById(userId);
    const searchResults = await getSearchResults();

    let results;
    if (!searchResults) {
      results = null
    } else {
      results = JSON.parse(searchResults.results)
    }

    const templateVars = { user, lists, toDos, results };

   res.render("../views/user_lists.ejs", templateVars)
  });

  //============================================

  router.post("/", async (req, res) => {
    const userId = req.session.user_id;
    const type = req.body.type;
    const name = req.body.name;
    const description = req.body.description;

    const input = { userId, type, name, description }
    //  Add these values to Lists Database
    await addNewToDo(input);
    await deleteSearchResults();
    res.redirect('/user-lists')
  });

  return router;
};
