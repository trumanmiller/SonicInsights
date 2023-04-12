const { refreshAccessToken, getListenHistory, createPlaylist } = require('./spotifyController.js');

const { MFLlast50 } = require('./algorithms.js');



(async function() {
  refreshAccessToken();

  const listenHistory = getListenHistory();

  const idArray = MFLlast50();

  await createPlaylist(idArray);

  

})();
