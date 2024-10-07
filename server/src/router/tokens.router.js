const { Router } = require('express');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../../config/cookieConfig');
const { verifyRefreshToken } = require('../middlewares/verifyTokens');

const router = Router();

router.get('/refresh', verifyRefreshToken, async (req, res) => {
  const { accessToken, refreshToken } = generateTokens({
    user: res.locals.user,
  });
  res
    .cookie('refreshToken', refreshToken, cookieConfig.refresh)
    .status(200)
    .json({ accessToken, user: res.locals.user });
});

module.exports = router;
