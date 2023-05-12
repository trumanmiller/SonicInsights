const express = require('express');
const router = express.Router();

const { getAccessToken, createPlaylist, addAlgo } = require('../controllers/playlistController');

router.post('/', getAccessToken, createPlaylist, addAlgo, (req, res) => {
  res.sendStatus(201);
});

module.exports = router;
