DROP TABLE IF EXISTS search_results CASCADE;

CREATE TABLE search_results (
  id SERIAL PRIMARY KEY,
  -- name TEXT,
  -- description VARCHAR(255),
  -- type TEXT
  results VARCHAR
);

