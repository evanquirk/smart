DROP TABLE IF EXISTS search_results CASCASE;

CREATE TABLE search_results (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL
);

