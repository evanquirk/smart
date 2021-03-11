const express = require('express');
const router  = express.Router();
const { getUserById } = require('../helpers/authQueries');
const { listById } = require('../helpers/listsQueries');
const { toDoById , addNewToDo } = require('../helpers/toDoQueries');


module.exports = () => {
  router.get("/", async (req, res) => {
    const userId = req.session.user_id;

    const user = await getUserById(userId);
    const lists = await listById(userId);
    const toDos = await toDoById(userId);
    const templateVars = { user, lists, toDos };

    //query database for user lists (returns an array of lists)
    //query database for users to dos (this will be in a loop because of the users lists) (returns either obj/arr of todos)
    //pass all info to templateVars which will populate on page

   res.render("../views/user_lists.ejs", templateVars)
  });

  //============================================

  router.post("/", async (req, res) => {
    const userId = req.session.user_id;
    const type = req.body.type;
    const name = req.body.name;
    const description = req.body.description;

    // \/\/  NEED API KEY FOR FUNCTION TO WORK CORRECTLY. HANDLE IN MORNING! \/\/

    const input = { userId, type, name, description }
    //  Add these values to Lists Database
    const newToDo = await addNewToDo(input);

    // Empty search list
    // throw in some jQuery to alert the user which path they want to go - redirect to /user-lists or /to-do
    res.redirect('/user-lists')

  });

  return router;
};
