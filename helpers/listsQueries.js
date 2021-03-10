const { db } = require('../db/index');

const listById = async (id) => {
  const queryString = `
    SELECT *
    FROM lists
    WHERE user_id = $1
  `;

  const queryParams = [id];

  try {
    const res = await db.query(queryString, queryParams);
    return res.rows;

  } catch (err) {
    console.error('query error', err.stack);

  }
}

module.exports = { listById };
