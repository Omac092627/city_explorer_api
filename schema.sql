DROP TABLE IF EXISTS family;

CREATE TABLE family (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100)
);

INSERT INTO family (first_name, last_name) VALUES('john','cokos');