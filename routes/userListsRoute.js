const express = require('express');
const router  = express.Router();
const { getUserById } = require('../helpers/authQueries');
const { listById } = require('../helpers/listsQueries');
const { toDoById } = require('../helpers/toDoQueries');


module.exports = () => {
  router.get("/", async (req, res) => {
    // console.log("RES.COOKIE:", req.session.user_id);
    const userId = req.session.user_id;

    const user = await getUserById(userId);
    const lists = await listById(userId);
    const toDos = await toDoById(userId);

    const templateVars = { user, lists, toDos }
    console.log("USER TEMP VAR:", templateVars.user.id)

    //query database for user lists (returns an array of lists)
    // query database for users to dos (this will be in a loop because of the users lists) (returns either obj/arr of todos)

    // pass all info to templateVars which will populate on page
   res.render("../views/user_lists.ejs", templateVars)
    // { lists: [], to_dos: "etc." )
  });
  router.post("/", async (req, res) => {
    console.log("REQ BODY:", req.body);

    res.redirect('/user-lists')

  });

  return router;
};
