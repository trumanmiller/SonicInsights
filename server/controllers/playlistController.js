const fs = require('fs/promises');
const path = require('path');
const { createPlaylist } = require(path.join(__dirname, '..', 'wrappers', 'spotifyWrapper.js'));

const db = require(path.join(__dirname, '..', 'wrappers', 'dbWrapper.js'));

const playlistController = {};

playlistController.getAccessToken = async (req, res, next) => {
  try {
    const { access_token } = JSON.parse(
      await fs.readFile(path.join(__dirname, '..', 'data', '__SECRETS__.json'))
    );
    res.locals.access_token = access_token;
    return next();
  } catch (err) {
    next({
      log: 'ERROR in playlistController.getAccessToken' + err,
    });
  }
};

playlistController.createPlaylist = async (req, res, next) => {
  try {
    const { access_token } = res.locals;
    const playListId = await createPlaylist(access_token);

    res.locals.playlistId = playListId;

    return next();
  } catch (err) {
    next({
      log: 'ERROR in playlistController.createPlaylist' + err,
    });
  }
};

playlistController.addAlgo = async (req, res, next) => {
  try {
    const { playlistId } = res.locals;
    const { functionStr } = req.body;

    await db.append({
      playlistId,
      functionStr,
    });
  } catch (err) {
    next({
      log: 'ERROR in playlistController.addAlgo' + err,
    });
  }
};

module.exports = playlistController;
