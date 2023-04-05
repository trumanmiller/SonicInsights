const fs = require('fs');

const toExport = {};

// toExport.writeAccessToken = (access_token) => {}

toExport.refreshAccessToken = async () => {
  // get data from our __SECRETS__.json file
  let localStorageData;
  fs.readFile('./__SECRETS__.json')
    .then((data) => {
      localStorageData = JSON.parse(data);
    })
    .catch((err) => console.log(err));

  const { client_id, client_secret, refresh_token } = localStorageData;

  // construct headers
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

  //
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  const response = await (
    await fetch('https://accounts.spotify.com/api/token', requestOptions)
  ).json();

  fs.writeFile(
    JSON.stringify({
      ...localStorageData,
      access_token: response.access_token,
    })
  )
    .then(() => {})
    .catch((err) => console.log(err));

  return response.access_token;
};

toExport.getListenHistory = async () => {
  
};

module.exports = toExport;
