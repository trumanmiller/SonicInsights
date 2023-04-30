const express = require('express');
const { getAccessToken, createPlaylist } = require('../controllers/playlistController');
const router = express.Router();
// TODO: impliment this so frontend can make playlist changes
// router.get('/');

router.post('/', getAccessToken, createPlaylist, (req, res) => {
  res.json();
});

module.exports = router;
