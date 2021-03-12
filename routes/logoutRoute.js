const express = require('express');
const router  = express.Router();
const { deleteSearchResults } = require('../helpers/toDoQueries')

module.exports = () => {
  //logs user out and clears the cookie session
  router.post("/", async (req, res) => {
   req.session = null;
   await deleteSearchResults();
   res.redirect("/")
  });

  return router;
};
