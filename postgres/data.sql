-- DROP TABLE IF EXISTS reset_codes;
 DROP TABLE IF EXISTS users;

CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first VARCHAR(255) NOT NULL,
      last VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,      
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

CREATE TABLE playgrounds(
    id SERIAL PRIMARY KEY,
      name VARCHAR NOT NULL,
      adress VARCHAR NOT NULL UNIQUE,           
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE toys(
    id SERIAL PRIMARY KEY,
    playground_id INT REFERENCES playgrounds(id) NOT NULL
    name VARCHAR NOT NULL,               
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

-- maybe a table for every toy?