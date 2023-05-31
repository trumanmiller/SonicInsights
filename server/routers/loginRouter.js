const express = require('express');
const querystring = require('querystring');
const fs = require('fs/promises');
const path = require('path');
const db = require('../models/pg.js');
const { getEmail } = require('../wrappers/spotifyWrapper.js');
const { encrypt, decrypt, randomString } = require('../wrappers/encryptionWrapper.js');

const router = express.Router();
const redirect_uri = 'http://localhost:3000/login/callback';
const scope =
  'user-read-private user-read-email user-read-recently-played playlist-modify-public playlist-modify-private';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

router.get('/', async (req, res, next) => {
  try {
    res.redirect(
      'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: 'TODO: add actual state',
        })
    );
  } catch (err) {
    next({
      log: 'ERROR in loginRouter.get("/")' + err,
    });
  }
});

router.get('/callback', async (req, res, next) => {
  try {
    const code = req.query.code;

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', redirect_uri);
    params.append('client_id', client_id);
    params.append('client_secret', client_secret);

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const { refresh_token, access_token, expire_time } = await response.json();
    let accountId;
    try {
      const email = await getEmail(access_token);
      const accountExistQuery = 'SELECT account_id FROM account WHERE email = $1';
      const accountExistValues = encrypt([email]);
      const accountExistReturn = await db.query(accountExistQuery, accountExistValues);

      if (accountExistReturn.rows.length > 0) {
        accountId = accountExistReturn.rows[0].account_id;
        const updateAccountQuery =
          'UPDATE account SET refresh_token = $1, access_token = $2 WHERE account_id = $3';
        // console.log(...[refresh_token, access_token, accountId]);
        const updateAccountValues = [...encrypt([refresh_token, access_token]), accountId];
        await db.query(updateAccountQuery, updateAccountValues);
      } else {
        const insertNewAccountquery =
          'INSERT INTO account(refresh_token, access_token, email) VALUES($1, $2, $3) RETURNING account_id';
        const insertNewAccountvalues = encrypt([refresh_token, access_token, email]);
        const insertNewAccountReturn = await db.query(
          insertNewAccountquery,
          insertNewAccountvalues
        );
        accountId = insertNewAccountReturn.rows[0].account_id;
      }
    } catch (err) {
      console.log(err);
    }

    // secrets.access_token = tokenResponse.access_token;
    // secrets.refresh_token = tokenResponse.refresh_token;
    // secrets.expire_time = Date.now() + tokenResponse.expires_in;

    // await fs.writeFile(
    //   path.join(__dirname, '..', 'data', '__SECRETS__.json'),
    //   JSON.stringify(secrets)
    // );

    const cookieString = randomString(24);

    try {
      const sessionExistQuery = 'SELECT session_id FROM session WHERE account_id = $1';
      const sessionExistValues = [accountId];
      const sessionExistReturn = await db.query(sessionExistQuery, sessionExistValues);

      if (sessionExistReturn.rows.length > 0) {
        // if user has a session, update db with new cookie
        const updateSessionQuery = 'UPDATE session SET cookie = $1 WHERE account_id = $2';
        // console.log(...[refresh_token, access_token, accountId]);
        const updateSessionValues = [cookieString, accountId];
        await db.query(updateSessionQuery, updateSessionValues);
      } else {
        const createSessionQuery = 'INSERT INTO session(cookie, account_id) VALUES($1, $2)';
        const createSessionValues = [cookieString, accountId];
        await db.query(createSessionQuery, createSessionValues);
      }
    } catch (err) {
      console.log(err);
    }

    res.cookie('cookie', cookieString, {
      secure: process.env.NODE_ENV === 'production' ? true : false,
      httpOnly: true,
      maxAge: 720 * 3600000, // first number is hours, second converts that into milliseconds
    });
    res.redirect('/editor');
    // res.send(JSON.stringify(tokenResponse));
  } catch (err) {
    next({
      log: 'ERROR in loginRouter.get("/callback")' + err,
    });
  }
});

module.exports = router;
