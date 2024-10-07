const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { WebSocketServer } = require('ws');

const wsServer = new WebSocketServer({
  clientTracking: false,
  noServer: true,
});

const upgradeCb = (request, socket, head) => {
  cookieParser()(request, {}, () => {
    const token = request.cookies.refreshToken;

    socket.on('error', (err) => {
      console.log('Socket error:', err);
    });

    try {
      const { user } = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

      socket.removeListener('error', (err) => {
        console.log('Socket error:', err);
      });

      wsServer.handleUpgrade(request, socket, head, (ws) => {
        wsServer.emit('connection', ws, request, user);
      });
    } catch (e) {
      console.log(e);
    }
  });
};

module.exports = { wsServer, upgradeCb };
