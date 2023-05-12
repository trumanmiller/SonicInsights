const fs = require('fs/promises');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'data.json');

const dbWrapper = {};

dbWrapper.write = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      await fs.writeFile(file, JSON.stringify(data, null, 2));
      resolve();
    } catch (err) {
      reject('ERROR in dbWrapper.write: ' + err);
    }
  });

dbWrapper.read = () =>
  new Promise(async (resolve, reject) => {
    try {
      const data = JSON.parse(await fs.readFile(file));
      resolve(data);
    } catch (err) {
      reject('ERROR in dbWrapper.read: ' + err);
    }
  });

dbWrapper.append = (dataObj) =>
  new Promise(async (resolve, reject) => {
    if (typeof dataObj !== 'object')
      reject('dbWrapper.append received arg typeof ' + typeof dataObj + ', expected object');

    try {
      const storedData = await dbWrapper.read();
      storedData.algos.push(dataObj);
      await dbWrapper.write(storedData);
      resolve();
    } catch (err) {
      console.log('ERROR in dbWrapper.append: ', err);
      reject(new Error('ERROR in dbWrapper.append: ', { cause: err }));
    }
  });

module.exports = dbWrapper;
