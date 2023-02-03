const path = require('path');
const fs = require('fs');
// co querystring = require('querystring');

const SpotifyController = {
  refreshAccessToken: async (req, res, next) => {
    const data = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/data.json'))
    );
    const myHeaders = new Headers();
    // if (data.expires_in < Date.now() + 3500) return next();

    myHeaders.append(
      'Authorization',
      'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
    );
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'refresh_token');
    urlencoded.append(
      'refresh_token',
      'AQATqBaH2yz8wQ3k-EYsujTrjqBY-g5Uqt0LRnnRUCF3qyX4xV6RgWa3_6myK3RM97RfQyRUKlkup0DQYGWHDqFh5bkx6OIDjObxie2x5qb5SnN_Ztl8XhGoh3j9jT1J6P8'
    );

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    const response = await (
      await fetch('https://accounts.spotify.com/api/token', requestOptions)
    ).json();
    // console.log('responded')
    data.access_token = response.access_token;
    data.expires_in = Date.now() + 3600;

    fs.writeFileSync(
      path.join(__dirname, '../data/data.json'),
      JSON.stringify(data)
    );
    res.locals.access_token = data.access_token;
    return next();
  },
  //===========================
  getHistory: (req, res, next) => {
    const data = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/data.json'))
    );
    res.locals.access_token = data.access_token;
    // console.log('before fetch');
    fetch(
      `https://api.spotify.com/v1/me/player/recently-played?limit=50&after=${1484811043508}`,
      {
        method: 'get',
        headers: { Authorization: 'Bearer ' + data.access_token },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Fetch failed: ' + response.statusText);
        }

        return response.json();
      })
      .then((data) => {
        // console.log('response: ', data);
        res.locals.data = data;
        // fs.writeFileSync(
        //   path.join(__dirname, '../data/example.json'),
        //   JSON.stringify(data.items[0])
        // );
        return next();
      })
      .catch((error) => {
        console.error('An error occurred: ', error);
        return next(error);
      });
  },
  curatePlaylist: (req, res, next) => {
    const cache = {};

    for (const el of res.locals.data.items) {
      cache[el.track.uri] ? cache[el.track.uri]++ : (cache[el.track.uri] = 1);
    }
    const sortedArray = [];
    let largest = -Infinity;
    let id = '';
    while (sortedArray.length < 12) {
      for (const key in cache) {
        if (largest < cache[key]) {
          largest = cache[key];
          id = key;
        }
      }
      delete cache[id];
      sortedArray.push(id);
      largest = -Infinity;
      id = '';
    }
    responseDataCache = [];
    res.locals.responseData = res.locals.data.items.filter((el) => {
      if (
        sortedArray.includes(el.track.uri) &&
        !responseDataCache.includes(el.track.uri)
      ) {
        responseDataCache.push(el.track.uri);
        return true;
      }
    });
    // console.log(responseData);
    // res.locals.responseData = [...new Set(responseData)];
    res.locals.array = sortedArray;
    return next();
  },
  createPlaylist: (req, res, next) => {
    const data = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/data.json'))
    );
    // console.log(res.locals.array);
    fetch(
      `https://api.spotify.com/v1/playlists/4kccTKN5jIHkvCb2SceDGy/tracks`,
      {
        method: 'PUT',
        headers: { Authorization: 'Bearer ' + data.access_token },
        body: JSON.stringify({
          uris: res.locals.array,
        }),
      }
    )
      .then((data) => {
        // console.log('great success', data);
        return next();
      })
      .catch((err) => console.log(err));
    // console.log(res.locals.array);
    return next();
  },
};

module.exports = SpotifyController;
