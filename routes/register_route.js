const express = require('express');
const router = express.Router();

module.exports = ({ addUser, isUser }) => {
  // router.get('/register', (req, res) => {
  //   const templateVars= {
  //     user: req.session["user"],
  //     userId: req.session["user_id"]
  //   };
  //   res.render("/", templateVars);
  // });

//   router.post("/register", (req, res) => {
//     const { name, email, password } = req.body;
//     isUser(email).then(function(user) {
//       if (!user) {
//         addUser (name, email, password).then(row => {
//           const userId = row.id;
//           const user = row;
//           req.session["user"] = user;
//           req.session["user_id"] = userId;
//           res.redirect["/"];
//         });
//       } else {
//         res
//           .status(400)
//           .send("Please login.");
//           return;
//     }

//   });
// });

  return router;
}
// TO GO THROUGH AND MAP TO OUR DATABASE.
