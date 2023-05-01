spotifyWrapper = {};

/**
  Retrieves a refreshed access token using the provided refresh_token, client_id, and client_secret.
  @param {string} refresh_token - OAuth 2.0 refresh token.
  @param {string} client_id - The client ID obtained from the developer dashboard.
  @param {string} client_secret - The client secret obtained from the developer dashboard.
  @returns {Promise<string>} - A Promise that resolves to a refreshed access token, valid for 1 hour.
  */

spotifyWrapper.getAccessToken = (refresh_token, client_id, client_secret) =>
  new Promise(async (resolve, reject) => {
    try {
      const headers = new Headers();
      headers.append(
        'Authorization',
        'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
      );
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      // construct url encoding parameters
      const urlParams = new URLSearchParams();
      urlParams.append('grant_type', 'refresh_token');
      urlParams.append('refresh_token', refresh_token);

      const response = await (
        await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: headers,
          body: urlParams,
          redirect: 'follow',
        })
      ).json();

      if (response.error !== undefined)
        reject('ERROR in spotifyWrapper.getAccessToken:' + response.error);
      else resolve(response);
    } catch (err) {
      reject('ERROR in spotifyWrapper.getAccessToken:' + err);
    }
  });

/**
  Retrieves user's listen history from the Spotify API.
  @param {string} access_token - OAuth 2.0 access token.
  @param {number} before - NOT YET IMPLEMENTED: Allows fetching of more than 50 tracks.
  @returns {Promise<Object>} - Promise resolving to an object containing an array of track information objects.
  */

spotifyWrapper.getListenHistory = (access_token, before = Date.now()) =>
  new Promise(async (resolve, reject) => {
    try {
      // TODO: doublecheck the awaits here, might need to await before .json() as well
      const response = await (
        await fetch(
          `https://api.spotify.com/v1/me/player/recently-played?limit=50&before=${before}`,
          {
            method: 'GET',
            headers: { Authorization: 'Bearer ' + access_token },
          }
        )
      ).json();

      if (response.error !== undefined)
        reject('ERROR in spotifyWrapper.getListenHistory: ' + response.error);
      else resolve(response);
    } catch (err) {
      reject('ERROR in spotifyWrapper.getListenHistory: ' + JSON.stringify(err));
    }
  });

/**

  Updates a Spotify playlist by adding an array of track URIs.
  @param {string} access_token - A OAuth 2.0 access token.
  @param {string} playlistId - The ID of the playlist to be updated.
  @param {string[]} idArray - An array of track URIs to be added to the playlist.
  @returns {Promise<string>} A promise that resolves with the snapshot ID, which represents the playlist in its current state.
  */

spotifyWrapper.updatePlaylist = (access_token, playlistId, idArray) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'PUT',
        headers: { Authorization: 'Bearer ' + access_token },
        body: JSON.stringify({
          uris: idArray,
        }),
      });

      if (response.error !== undefined)
        reject('ERROR in spotifyWrapper.getListenHistory: ' + response.error);
      resolve(response);
    } catch (err) {
      reject('ERROR in spotifyWrapper.updatePlaylist: ' + err);
    }
  });

/**
 Creates a new Spotify playlist for the user associated with the provided access token.
 The playlist will be named "New Playlist" with a description "New playlist description" and set to private.

 * @param {string} access_token - The user's Spotify API access token.
 * @returns {Promise<void>} A promise that resolves if the playlist is successfully created, or rejects with an error message if there is an issue.
 * @example
 * spotifyWrapper.createPlaylist('your_access_token')
 *   .then(() => console.log('Playlist created successfully'))
 *   .catch((error) => console.log('Error creating playlist:', error));
 */

spotifyWrapper.createPlaylist = (access_token) =>
  new Promise(async (resolve, reject) => {
    try {
      const userResponse = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + access_token },
      });
      const userData = await userResponse.json();

      if ('error' in userData)
        reject(
          'ERROR in spotifyWrapper.createPlaylist userData: ' + JSON.stringify(userData.error)
        );

      const playlistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userData.id}/playlists`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + access_token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'New Playlist',
            description: 'New playlist description',
            public: false,
          }),
        }
      );
      const playlistData = await playlistResponse.json();

      if ('error' in playlistData)
        reject('ERROR in spotifyWrapper.createPlaylist playlistData: ' + playlistData.error);
      else resolve(playlistData.id);
    } catch (err) {
      reject('ERROR in spotifyWrapper.createPlaylist: ' + err.message);
    }
  });

module.exports = spotifyWrapper;
