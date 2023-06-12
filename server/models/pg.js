const { Pool } = require('pg');
// const key = process.env.SECRET_KEY;
//require('dotenv').config();

const PG_URI = process.env.ELEPHANTSQL_PG_URI;

const pool = new Pool({
  connectionString: PG_URI,
  max: 4,
});

// module.exports = pool;

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
  
};

/**

CREATE TABLE account (
  account_id serial PRIMARY KEY,
  refresh_token varchar(400) NOT NULL,
  email varchar(150) NOT NULL UNIQUE,
  access_token varchar(500),
  created_at timestamp DEFAULT now()
);

const queryText = 'INSERT INTO user(refresh_token, email, access_token) VALUES($1, $2, $3)';
const queryValues = [refreshToken, email, accessToken];

CREATE TABLE session (
  session_id serial PRIMARY KEY,
  cookie varchar(100) NOT NULL UNIQUE,
  created_at timestamp DEFAULT now(),
  account_id int NOT NULL,
  FOREIGN KEY (account_id) REFERENCES account (account_id) ON DELETE CASCADE
);

ALTER TABLE session
ADD CONSTRAINT cookie_unique UNIQUE (cookie);


CREATE TABLE algorithm (
  algorithm_id serial PRIMARY KEY,
  function_string varchar(1500) NOT NULL,
  created_at timestamp DEFAULT now(),
  account_id int NOT NULL,
  FOREIGN KEY (account_id) REFERENCES account (account_id) ON DELETE CASCADE
);

TODO: consider HASH based indexing
CREATE INDEX session_account_id_index ON session(account_id);
CREATE INDEX algorithm_account_id_index ON algorithm(account_id);
CREATE INDEX session_cookie_index ON session(cookie);

openssl genrsa -aes256 -out sonicInsights.pem 2048

 */
