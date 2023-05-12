const { Pool } = require('pg');
//const key = process.env.SECRET_KEY;
//require('dotenv').config();

const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI,
  max: 5,
});

// module.exports = pool;

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

/**

CREATE TABLE user (
  user_id serial PRIMARY KEY,
  refresh_token varchar(400) NOT NULL,
  email varchar(150) NOT NULL UNIQUE,
  access_token varchar(500),
  created_at timestamp DEFAULT now()
);

CREATE TABLE session (
  session_id serial PRIMARY KEY,
  cookie varchar(100) NOT NULL,
  created_at timestamp DEFAULT now(),
  user_id int NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE
);

CREATE TABLE algorithm (
  algorithm_id serial PRIMARY KEY,
  function_string varchar(1500) NOT NULL,
  created_at timestamp DEFAULT now(),
  user_id int NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE
);

TODO: consider HASH based indexing
CREATE INDEX session_user_id_index ON session(user_id);
CREATE INDEX algorithm_user_id_index ON algorithm(user_id);
CREATE INDEX session_cookie_index ON session(cookie);

openssl genrsa -aes256 -out sonicInsights.pem 2048

 */
