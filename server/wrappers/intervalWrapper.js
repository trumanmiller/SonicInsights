const fs = require('fs/promises');
const path = require('path');

const { getAccessToken, getListenHistory, updatePlaylist } = require(path.join(
  __dirname,
  'spotifyWrapper'
));

const intervalWrapper = {};

intervalWrapper.runAlgos = async () => {
  console.log('runningAlgos');
  try {
    const { algos } = JSON.parse(
      await fs.readFile(path.join(__dirname, '..', 'data', 'data.json'))
    );

    const { client_secret, client_id, refresh_token } = JSON.parse(
      await fs.readFile(path.join(__dirname, '..', 'data', '__SECRETS__.json'))
    );

    const { access_token } = await getAccessToken(
      refresh_token,
      client_id,
      client_secret
    );

    const listenHistory = await getListenHistory(access_token);

    // fs.writeFile('./listenHistory.json', JSON.stringify(listenHistory));

    algos.forEach(async (el) => {
      const { functionStr, playlistId } = el;
      const func = new Function('arr', functionStr + 'return algo(arr)');

      const idArray = func(listenHistory);
      console.log(idArray);

      await updatePlaylist(access_token, playlistId, idArray);
    });
  } catch (err) {
    console.log(err);
  }
};

intervalWrapper.startInterval = () => {
  console.log('starting interval');
  intervalWrapper.runAlgos();

  // rerun startInterval at midnight
  const now = new Date();
  const timeUntilMidnight =
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;

  setTimeout(intervalWrapper.startInterval, timeUntilMidnight);
};

module.exports = intervalWrapper;
