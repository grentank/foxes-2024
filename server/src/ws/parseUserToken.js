const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

function parseUserToken(req, next) {
  cookieParser()(req, {}, () => {
    try {
      const { refreshToken } = req.cookies;
      const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      next(null, user);
    } catch (err) {
      next(err);
      console.log('Invalid token for WS');
    }
  });
}

module.exports = parseUserToken;
