DROP TABLE IF EXISTS lists CASCADE;

CREATE TABLE lists (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  list_name VARCHAR (255) NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT FALSE
);
