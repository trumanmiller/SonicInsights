const fs = require('fs');
const path = require('path');
const toExport = {};

/**
 * @method refreshAccessToken Refreshes the access token using the refresh token in __SECRETS__.json
 * @returns {Promise<string>} - Returns a promise that resolves with the new access token or rejects with an error message
 */

// TODO: convert into purely pure functions

toExport.refreshAccessToken = () =>
  new Promise(async (resolve, reject) => {
    try {
      // TODO: fix below
      const { client_id, client_secret, refresh_token } = await fs.readFile(
        './__SECRETS__.json'
      );

      // construct headers
      const headers = new Headers();
      headers.append(
        'Authorization',
        'Basic ' +
          Buffer.from(client_id + ':' + client_secret).toString('base64')
      );
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      // construct url encoding parameters
      const urlParams = new URLSearchParams();
      urlParams.append('grant_type', 'refresh_token');
      urlParams.append('refresh_token', refresh_token);

      const response = await (
        await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow',
        })
      ).json();

      await fs.writeFile(
        JSON.stringify({
          ...localStorageData,
          access_token: response.access_token,
        })
      );
      resolve(response.access_token);
    } catch (err) {
      reject('spotifyController.refreshAccessToken ERROR:' + err);
    }
  });

/**
 * @method getListenHistory Retrieves the user's 50 recently played tracks from Spotify API.
 * @returns {Promise} Resolves to an object containing the user's recently played tracks or rejects with an error message
 */

toExport.getListenHistory = () =>
  new Promise(async (resolve, reject) => {
    try {
      const { access_token } = JSON.parse(
        await fs.readFile(path.join(__dirname, '__SECRETS__.json'))
      );

      const listenHistory = await fetch(
        `https://api.spotify.com/v1/me/player/recently-played?limit=50&after=${1484811043508}`,
        {
          method: 'get',
          headers: { Authorization: 'Bearer ' + data.access_token },
        }
      ).json();
      resolve(listenHistory);
    } catch (err) {
      reject('spotifyController.getListenHistory ERROR:' + err);
    }
  });

/**
 * Create a new Spotify playlist using an array of song IDs.
 * @method updatePlaylist Updates playlist with the
 * @param {string[]} idArray An array of Spotify track URIs to add to the playlist
 * @param {string} playlistId The id of the playlist to be created/updated
 * @param {number} playlistLenth Length of updated playlist
 * @returns {Promise<void>} A promise that resolves if the operation is successful or rejects with an error message if it fails
 */

toExport.updatePlaylist = (playlistId, idArray, playlistLenth) =>
  new Promise(async (resolve, reject) => {
    if (!Array.isArray(idArray))
      reject('spotifyController.createPlaylist ERROR: Invalid Argument');

    try {
      const { access_token } = JSON.parse(
        await fs.readFile(path.join(__dirname, '__SECRETS__.json'))
      );
      await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'PUT',
        headers: { Authorization: 'Bearer ' + access_token },
        body: JSON.stringify({
          uris: idArray,
        }),
      });
      resolve();
    } catch (err) {
      reject('spotifyController.createPlaylist ERROR:' + err);
    }
  });

module.exports = toExport;
