const fs = require('fs/promises');
const path = require('path');

const intervalWrapper = {};

intervalWrapper.runAlgos = async () => {
  try {
    const algos = fs.readFile(path.join(__dirname, '..', 'data', 'data.json'));
  } catch (err) {
    console.log(err);
  }
};

intervalWrapper.startInterval = () => {
  this.runAlgos();

  // rerun startInterval at midnight
  const now = new Date();
  const timeUntilMidnight =
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;

  setTimeout(this.startInterval, timeUntilMidnight);
};

module.exports = intervalWrapper;
