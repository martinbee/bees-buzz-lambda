const crypto = require('crypto');

const generateUUID = () => crypto.randomBytes(16).toString('hex');

module.exports = generateUUID;
