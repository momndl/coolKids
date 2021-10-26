-- DROP TABLE IF EXISTS toys;
-- DROP TABLE IF EXISTS comments;


-- DROP TABLE IF EXISTS favorites;
-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS playgrounds;

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
      adress VARCHAR,
      mapbox_id VARCHAR NOT NULL UNIQUE,
      longitude decimal NOT NULL ,
      latitude decimal NOT NULL ,           
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE toys(
    id SERIAL PRIMARY KEY,
    playground_id INT REFERENCES playgrounds(id) NOT NULL UNIQUE,
    slide BOOLEAN DEFAULT false ,
    swing BOOLEAN DEFAULT false,
    climbing BOOLEAN DEFAULT false,    
    bench BOOLEAN DEFAULT false,    
    merry BOOLEAN DEFAULT false, 
    sandpit BOOLEAN DEFAULT false,       

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorites(
    id SERIAL PRIMARY KEY,
    playground_id INT REFERENCES playgrounds(id) NOT NULL,
    user_id INT REFERENCES users(id)
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    comment VARCHAR NOT NULL,
    user_id INT REFERENCES users(id),
    playground_id INT REFERENCES playgrounds(id)
);

-- spielplatz fröbelstraße

-- maybe a table for every toy? OR ADD TOYS in playgrounds?

INSERT INTO playgrounds (name, adress, longitude, latitude, mapbox_id) VALUES ('Spielplatz', 'Fröbelstraße, 10405', 13.42735, 52.53987, 'poi.420906818565');
INSERT INTO playgrounds (name, adress, longitude, latitude, mapbox_id) VALUES ('Spielplatz', 'Wühlischstraße, 10245', 13.46682, 52.50723, 'poi.549755859667');
INSERT INTO toys(playground_id, slide, swing, climbing, bench, merry, sandpit)VALUES(1, true, true, false, true, true, false);
INSERT INTO comments(comment, user_id, playground_id)VALUES('great place, great swings', 1, 1);
INSERT INTO favorites (playground_id, user_id)VALUES(1,1);
