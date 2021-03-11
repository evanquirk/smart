// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const bcrypt     = require('bcrypt');
const cookieSession = require('cookie-session');
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const { getUserById } = require('./helpers/authQueries')

// PG database client/connection setup
const { db } = require('./db/index');
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

app.use(cookieSession({
  name: "session",
  keys: ["evan", "thomas"],
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own


// const usersRoute = require("./routes/users");
const loginRoute = require("./routes/loginRoute");
const logoutRoute = require("./routes/logoutRoute");
const registerRoute = require("./routes/registerRoute");
const userListsRoute = require("./routes/userListsRoute");
const toDoRoute = require("./routes/toDoRoute")
// const deleteTaskRoute = require("./routes/deleteTaskRoute");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/users", usersRoute());
app.use("/login", loginRoute());
app.use("/logout", logoutRoute());
app.use("/register", registerRoute());
app.use("/user-lists", userListsRoute());
app.use("/todo", toDoRoute());
// app.use("/deleteTask", deleteTaskRoute());
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.get("/", (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    res.render("index");
  } else {
    res.redirect("/user-lists")
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

