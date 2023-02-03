const express = require('express');
const path = require('path');
const cors = require('cors');

const spotifyRouter = require(path.join(__dirname, './routes/spotify'));
const {
  refreshAccessToken,
  getHistory,
  curatePlaylist,
  createPlaylist,
} = require(path.join(__dirname, './controllers/spotifyController'));

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use('/spotify', getHistory, curatePlaylist, createPlaylist, (req, res) => {
  res.status(200).json(res.locals.responseData);
});

app.get('/', refreshAccessToken, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
  console.log(`LISTEN ON PORT ${PORT}`);
});
