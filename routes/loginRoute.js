const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUserByEmail } = require('../helpers/authQueries')

module.exports = () => {

//=========================================

  router.get('/', (req, res) => {
    if (req.session.user) {
      res.redirect('/user-lists');

    } else {
      let templateVars = {
        user: { id: undefined, username: null }
      };
      res.redirect('/', templateVars);
    }
  });

//==========================================

  router.post('/', (req, res) => {
    getUserByEmail(req.body.email)
      .then(user => {
        if (!user) {
          res.json({ error: 'User does not exist' });

        } else {
          if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.json({ error: 'Password does not match' });

          } else {
            req.session = { user_id: user.id };
            res.redirect('/user-lists');

          }
        }
      })
      .catch(err => {
        console.error('login error', err);
      });

  });

  return router;
}
