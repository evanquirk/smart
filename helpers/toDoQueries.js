const { db } = require('../db/index');


//=====================================

const toDoById = async (id) => {
  const queryString = `
    SELECT *
    FROM to_dos
    WHERE user_id = $1;
  `;

  const queryParams = [id];

  try {
    const res = await db.query(queryString, queryParams);
    return res.rows;

  } catch (err) {
    console.error('query error', err.stack);

  }
}

//=====================================

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

//=====================================

const getSearchResults = async () => {
  const queryString = `
    SELECT *
    FROM search_results;
  `;
  try {
    const res = await db.query(queryString);
    return res.rows[0];

  } catch (err) {
    console.error('query error', err.stack);
  }
}

const deleteSearchResults = async () => {
  const queryString = `
    DELETE FROM search_results;
  `;
  try {
    await db.query(queryString);
  } catch (err) {
    console.error('query error', err.stack);
  }
}

//=====================================

const addNewToDo = async (obj) => {
  const { userId, type, name, description } = obj;

  const queryString = `
    INSERT INTO to_dos (user_id, lists_id, to_do_type, to_do_name, to_do_description)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  let list_id;
  if (type === 'to_watch') {
    list_id = 1;
  } else if (type === 'to_read') {
    list_id = 2;
  } else if (type === 'to_eat') {
    list_id = 3;
  } else if (type === 'to_buy') {
    list_id = 4;
  } else {
    list_id = 5;
  };

  const queryParams = [userId, list_id, type, name, description];

  try {
    const res = await db.query(queryString, queryParams);
    return res.rows[0];

  } catch (err) {
    console.error('query error', err.stack);

  }

}

const deleteTodo = async (id) => {
  const queryString = `
    DELETE FROM to_dos
    WHERE id = $1;
  `;
  const queryParams = [id]
  try {
    await db.query(queryString, queryParams);

  } catch (err) {
    console.error('query error', err.stack);
  }
}


module.exports = { toDoById , getSearchResults , insertSearchResults , addNewToDo , deleteSearchResults , deleteTodo };
