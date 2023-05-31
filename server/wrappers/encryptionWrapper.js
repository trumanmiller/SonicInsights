const crypto = require('crypto');
const encryptionWrapper = {};

const algorithm = process.env.ENCRYPTION_ALGORITHM;
const key = process.env.ENCRYPTION_KEY;
const iv = process.env.ENCRYPTION_IV;

encryptionWrapper.encrypt = (input) => {
  if (Array.isArray(input)) {
    return input.map((text) => {
      let cipher = crypto.createCipheriv(algorithm, key, iv);
      let encrypted = cipher.update(text);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return encrypted.toString('base64');
    });
  } else if (typeof input === 'string') {
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('base64');
  } else return 'ERROR, encryptionWrapper.encrypt recieved invalid input';
};

encryptionWrapper.decrypt = (input) => {
  if (Array.isArray(input)) {
    return input.map((data) => {
      let encryptedText = Buffer.from(data, 'base64');
      let decipher = crypto.createDecipheriv(algorithm, key, iv);
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return decrypted.toString();
    });
  } else if (typeof input === 'string') {
    let encryptedText = Buffer.from(input, 'base64');
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } else return 'ERROR, encryptionWrapper.decrypt recieved invalid input';
};

encryptionWrapper.randomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomBytes = crypto.randomBytes(length);
  const result = [];

  for (let i = 0; i < randomBytes.length; i++) {
    const index = randomBytes[i] % characters.length;
    result.push(characters[index]);
  }

  return result.join('');
};

module.exports = encryptionWrapper;
