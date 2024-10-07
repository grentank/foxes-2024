const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwtConfig');

require('dotenv').config();

module.exports = (payload) => ({
  accessToken: jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    jwtConfig.access,
  ),
  refreshToken: jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET,
    jwtConfig.refresh,
  ),
});
