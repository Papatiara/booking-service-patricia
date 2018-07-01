DROP DATABASE IF EXISTS reservations;

CREATE DATABASE reservations;

DROP TABLE IF EXISTS owners;
CREATE TABLE owners (
  id SERIAL PRIMARY KEY,
  ownername varchar(100),
  accomodations integer
);

DROP TABLE IF EXISTS accomodations;
CREATE TABLE  accomodations (
  accomodations_id SERIAL PRIMARY KEY,
  owner_id integer REFERENCES owners(id) ON UPDATE CASCADE ON DELETE CASCADE,
  maxGuests integer,
  price integer ,
  minStay integer,
  cleaingFee integer,
  AreaTax integer
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
  reviews_id integer,
  rating integer,
  accomodations_id integer REFERENCES accomodations(accomodations_id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username varchar(100) NOT NULL,
  recomendations integer NOT NULL
);

DROP TABLE IF EXISTS reservations;
CREATE TABLE reservations (
  reservations_id SERIAL, 
  accomodations_id integer,
  users_id integer,
  from_date varchar(50) NOT NULL, 
  end_date varchar(50) NOT NULL
);
