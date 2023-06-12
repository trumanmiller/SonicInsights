require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const cookieparser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cookieparser());

const loginRouter = require('./routers/loginRouter');
const spotifyRouter = require('./routers/spotifyRouter');
const playlistRouter = require('./routers/playlistRouter');
const { startInterval } = require('./wrappers/intervalWrapper');

app.use('/login', loginRouter);
app.use('/spotify', spotifyRouter);
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
    redirect: '/404'
  };
  const errorObj = Object.assign({}, defaultError, err);
  if (errorObj.log.length !== 0) console.log(errorObj.log);

  return res.status(errorObj.status).redirect(errorObj.redirect);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode, listening on PORT ${PORT}`);
  });
} else {
  module.exports = app;
}

startInterval();
