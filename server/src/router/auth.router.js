const bcrypt = require('bcrypt');
const { Router } = require('express');
const { User } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../../config/cookieConfig');

const router = Router();

router.post('/signup', async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  if (!(username && email && password)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: { username, password: await bcrypt.hash(password, 10) },
  });

  if (!created) return res.status(403).json({ message: 'User already exists' });

  const plainUser = user.get();
  delete plainUser.password;

  const { accessToken, refreshToken } = generateTokens({ user: plainUser });

  return res
    .cookie('refreshToken', refreshToken, cookieConfig.refresh)
    .json({ accessToken, user: plainUser });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  const correctPass = await bcrypt.compare(password, user.password);
  if (!correctPass) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  const plainUser = user.get();
  delete plainUser.password;

  const { accessToken, refreshToken } = generateTokens({ user: plainUser });

  return res
    .cookie('refreshToken', refreshToken, cookieConfig.refresh)
    .json({ accessToken, user: plainUser });
});

router.get('/logout', (req, res) => {
  res.clearCookie('refreshToken').sendStatus(200);
});

module.exports = router;
