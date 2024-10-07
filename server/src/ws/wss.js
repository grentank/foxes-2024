const { WebSocketServer } = require('ws');
const wsConnection = require('./wsConnection');

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', wsConnection);

module.exports = wss;
