const { db } = require('../db/index');
const bcrypt = require('bcrypt');

const getUserByEmail = async (email) => {
  const queryString = `
  SELECT * FROM users
  WHERE email = $1
  `;
  try {
    const queryParams = [email];
    const res = await db.query(queryString, queryParams);
    return res.rows[0];

  } catch (err) {
    console.error('query error', err.stack);
  }
}
  // add user to the database using bcrypt.
  const addUser = async (obj) => {
    const { name, email, password } = obj;

    const queryString = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

    const queryParams = [name, email, bcrypt.hashSync(password, 10)];

    try {
      const res = await db.query(queryString, queryParams);
      return res.rows[0];

    } catch (err) {
      console.error('query error', err.stack);

    }
  }

  const getUserById = async (id) => {
    const queryString = `
      SELECT *
      FROM users
      WHERE id = $1
    `;
    const queryParams = [id];

    try {
      const res = await db.query(queryString, queryParams);
      // console.log('RESROWS:', res.rows[0]);
      return res.rows[0];

    } catch (err) {
      console.error('query error', err.stack);
    }
  }



module.exports = { getUserByEmail , addUser , getUserById };
