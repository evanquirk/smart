
module.expots = (db) => {
    const getUsers = () => {
      const query = {
        text: `SELECT * FROM users;`,
      };
      return db.query(query).then((result) => result.rows);
    };
    const addUser = (username, email, password) => {
      const query = {
        text: `
        INSERT INTO users(username, email, password)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
        values: [username, email, password]
      }
    }
    const isUser = email => {
      const query = {
        text: `
        SELECT * FROM users
        WHERE users.email = $1;
        `,
        values: [email]
      };
      return db.query(query).then(res => res.rows.length > 0);
    };

    return { getUsers, addUser, isUser }
}
