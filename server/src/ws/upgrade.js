const parseUserToken = require('./parseUserToken');
const wss = require('./wss');

function upgrade(request, socket, head) {
  socket.on('error', console.log);

  // This function is not defined on purpose. Implement it with your own logic.
  parseUserToken(request, (err, user) => {
    if (err || !user) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    socket.removeListener('error', console.log);

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request, user);
    });
  });
}

module.exports = upgrade;
