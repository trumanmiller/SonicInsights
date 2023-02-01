const express = require('express');
const path = require('path');

const spotifyRouter = require(path.join(__dirname, './routes/spotify'));

const app = express();
const PORT = 3000;

app.use(express.json());

// app.use('/spotify', spotifyRoputer);

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/index.html'))
})

app.listen(PORT, () => {
  console.log(`LISTEN ON PORT ${PORT}`);
});