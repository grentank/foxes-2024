const { Tiger } = require('../../db/models');

module.exports = async (req, res, next) => {
  const tiger = await Tiger.findByPk(req.params.id);
  if (!tiger) return res.status(400).json({ message: 'wrong id' });
  if (res.locals.user?.id !== tiger.ownerId) {
    return res.status(403).json({ message: 'Not your tiger!' });
  }
  next();
};
