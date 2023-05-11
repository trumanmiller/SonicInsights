require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs/promises');

const app = express();
const PORT = 3000;

app.use(express.json());

const loginRouter = require('./routers/loginRouter');
const spotifyRouter = require('./routers/spotifyRouter');
const playlistRouter = require('./routers/playlistRouter');
const { startInterval } = require('./wrappers/intervalWrapper');

app.use('/login', loginRouter);
// app.use('/spotify', spotifyRouter);
app.use('/playlist', playlistRouter);

app.use(['/', '/editor'], express.static(path.join(__dirname, '../client/dist')));

app.use(['/', '/editor'], (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.use('*', (req, res, next) => {
  res.status(404).send('404 page not found');
});

app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Global error handler caught an unknown error.',
    status: 500,
    message: { err: 'An error has occurred' },
  };
  const errorObj = Object.assign({}, defaultError, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
} else {
  module.exports = app;
}

startInterval();
