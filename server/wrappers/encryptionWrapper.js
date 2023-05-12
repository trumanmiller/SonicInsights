const encryptionWrapper = {};

const iv = process.env.IV;
const key = process.env.KEY;
const algorithm = process.env.ALGORITHM;

encryptionWrapper.encrypt = (text) => {
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('base64');
};

encryptionWrapper.decrypt = (data) => {
  let encryptedText = Buffer.from(text, 'base64');
  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

module.exports = encryptionWrapper;
