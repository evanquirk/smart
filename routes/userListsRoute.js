const express = require('express');
const router  = express.Router();
const { getUserLists, getListToDos } = require('../helpers/listsQueries')

module.exports = () => {
  router.get("/", (req, res) => {
    // extract userid from cookie (req.cookie/res.cookie?)
    //query database for user lists (returns an array of lists)
    // query database for users to dos (this will be in a loop because of the users lists) (returns either obj/arr of todos)

    // pass all info to templateVars which will populate on page
   res.render("../views/user_lists.ejs", { lists: [], to_dos: "etc." })
  });

  return router;
};
