const { db } = require('../db/index');

const toDoById = async (id) => {
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

const insertSearchResults = async (results) => {
  const jsonString = JSON.stringify(results)
  const queryString = `
    INSERT INTO search_results (results)
    VALUES ($1)
    RETURNING *;
  `;

  const queryParams = [JSON.stringify(results)];
  try {
    const res = await db.query(queryString, queryParams);
    return res.rows;

  } catch (err) {
    console.error('query error', err.stack);
  }
}

const getSearchResults = async () => {
  const queryString = `
    SELECT *
    FROM search_results;
  `;
  try {
    const res = await db.query(queryString);
    // console.log('RESULTS:', res);
    return res.rows[0];

  } catch (err) {
    console.error('query error', err.stack);
  }
}

module.exports = { toDoById , getSearchResults , insertSearchResults };


/*

for (const result of results) {
    const { name, description, type } = result;
    const queryString = `
      INSERT INTO search_results (name, description, type)
      VALUES ($1, $2, $3)
      RETURNING *;
      `;

    const queryParams = [name, description, type];
    try {
      const res = await db.query(queryString, queryParams);
      return res.rows;

    } catch (err) {
      console.error('query error', err.stack);
    }
  }

*/
