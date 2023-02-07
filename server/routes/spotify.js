const express = require('express');
const path = require('path');
const querystring = require('querystring');
// const cookieParser = require('cookie-parser');
// THIS WHOLE FILE IS CURRENTLY UNUSED
//
const spotifyController = require('../controllers/spotifyController');
const router = express.Router();

const redirect_uri = 'http://localhost:3000/spotify/callback'; // Your redirect uri

const generateRandomString = function (length) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

router.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope =
    'user-top-read user-read-playback-position user-library-read user-library-modify user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative ugc-image-upload user-follow-read user-follow-modify user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played';
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

router.get('/callback', (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('yourdum');
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization:
          'Basic ' +
          new Buffer(client_id + ':' + client_secret).toString('base64'),
      },
      json: true,
    };
    // const myHeaders = new Headers()
    // myHeaders.append("Authorization", "Basic {{client_credentials}}");

    // const requestOptions = {
    //   method: 'POST',
    // }

    // fetch('https://accounts.spotify.com/api/token', {
    //   method: 'post',
    //   headers: {'Content-Type': 'application/json'}
    // })
  }
});

module.exports = router;
