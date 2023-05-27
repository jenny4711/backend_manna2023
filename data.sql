DROP DATABASE IF EXISTS manna;

CREATE DATABASE manna;

\c manna;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS history;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
 password text NOT NULL
);

CREATE TABLE history
(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users,
  msg text NOT NULL
);

INSERT INTO users
   (email,password)
VALUES
('jjenny4711@gmail.com','jenny4711');

INSERT INTO history
(user_id,msg)
VALUES
(1,'This is test');




