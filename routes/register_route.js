const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUserByEmail, addUser } = require('../helpers/dbHelpers');

module.exports = () => {
  router.get('/', (req, res) => {
    res.render('index');
  })

  router.post('/', async (req, res) => {
    const input = {
      name: req.body.newUsername,
      email: req.body.newEmail,
      password: req.body.newPassword
    }
    const user = await getUserByEmail(input.email);
    if (user) {
      res.render('../views/user_lists.ejs');
    } else {
      const addingUser = await addUser(input);
      req.session = { user_id: addingUser.id };
      res.render('../views/user_lists.ejs');
    }

  });

  return router;
}
