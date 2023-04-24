const spotifyController = {};
const {getAccessToken, getListenHistory, updatePlaylist} = require('../wrappers/spotifyWrapper');

spotifyController.refreshAccessToken = (req, res, next) => {

};

module.exports = spotifyController;
