const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const { getUserByEmail } = require('../helpers/dbHelpers')

module.exports = () => {
  //load login/register page
  router.get('/', (req, res) => {
    if (req.session.user) {
      res.render('../views/user_lists.ejs');

    } else {
      let templateVars = {
        user: {id: undefined, username: null}
      };
      res.render('login', templateVars);
    }
  });

  router.post('/', (req, res) => {
    getUserByEmail(req.body.email)
    .then(user => {
      console.log('MYUSER', user);
      if (!user) {
        res.json({error: 'User does not exist'});

      } else {
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          res.json({error: 'Password does not match'});

        } else {
          req.session = {user_id: user.id};
          res.render('../views/user_lists.ejs');

        }
      }
    })
    .catch(err => {
      console.error('login error', err);
    });

  });

return router;
}
