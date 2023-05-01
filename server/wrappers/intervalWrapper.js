const fs = require('fs/promises');
const path = require('path');

const { getAccessToken, getListenHistory, updatePlaylist } = require(path.join(
  __dirname,
  'spotifyWrapper'
));

const intervalWrapper = {};

intervalWrapper.runAlgos = async () => {
  console.log('RUNNING', 'file: intervalWrapper.js:33 ~ algos.forEach ~ idArray:');
  try {
    const { algos } = JSON.parse(
      await fs.readFile(path.join(__dirname, '..', 'data', 'data.json'))
    );

    const { client_secret, client_id, refresh_token } = JSON.parse(
      await fs.readFile(path.join(__dirname, '..', 'data', '__SECRETS__.json'))
    );

    const { access_token } = await getAccessToken(refresh_token, client_id, client_secret);

    const listenHistory = await getListenHistory(access_token);

    // fs.writeFile('./listenHistory.json', JSON.stringify(listenHistory));

    algos.forEach(async (el) => {
      const { functionStr, playlistId } = el;
      const func = new Function('arr', functionStr + 'return algo(arr)');

      const idArray = func(listenHistory);

      await updatePlaylist(access_token, playlistId, idArray);
    });
  } catch (err) {
    console.log(err);
  }
};

intervalWrapper.startInterval = () => {
  
  // intervalWrapper.runAlgos();

  // put startInterval on the callback queue
  const now = new Date();
  console.log('RUNNING','file: intervalWrapper.js:47:');

  const timeUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;

  const timeToNextHour =
    60 * (60 - now.getMinutes()) * 1000 - now.getSeconds() * 1000 - now.getMilliseconds();

  setTimeout(intervalWrapper.startInterval, timeToNextHour);
};

module.exports = intervalWrapper;
