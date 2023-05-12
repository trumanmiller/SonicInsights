const express = require('express');
const querystring = require('querystring');
const fs = require('fs/promises');
const path = require('path');
const db = require('../models/pg.js');

const router = express.Router();
const redirect_uri = 'http://localhost:3000/login/callback';
const scope =
  'user-read-private user-read-email user-read-recently-played playlist-modify-public playlist-modify-private';
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

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

    secrets.access_token = tokenResponse.access_token;
    secrets.refresh_token = tokenResponse.refresh_token;
    secrets.expire_time = Date.now() + tokenResponse.expires_in;

    await fs.writeFile(
      path.join(__dirname, '..', 'data', '__SECRETS__.json'),
      JSON.stringify(secrets)
    );

    res.cookie('cookie', 'random string', {
      secure: process.env.NODE_ENV === 'production' ? true : false,
      httpOnly: true,
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
