const express = require('express');
const router  = express.Router();

module.exports = () => {
  //logs user out and clears the cookie session
  router.post("/", (req, res) => {
   req.session = null;
   res.redirect("/login")
  });

  return router;
};
