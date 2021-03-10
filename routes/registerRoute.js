const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUserByEmail, addUser } = require('../helpers/authQueries');

module.exports = () => {
  router.get('/', (req, res) => {
    res.redirect('/');
  })

  router.post('/', async (req, res) => {
    const input = {
      name: req.body.newUsername,
      email: req.body.newEmail,
      password: req.body.newPassword
    }


    const user = await getUserByEmail(input.email);
    if (user) {
      res.redirect('/user-lists');
    } else {
      const addingUser = await addUser(input);
      req.session = { user_id: addingUser.id };
      res.redirect('/user-lists');
    }

  });

  return router;
}
