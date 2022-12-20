const UnauthorizedException = require('../errors/Unauthorized.exception');

const getProfile = async (req, res, next) => {
  const { Profile } = req.app.get('models');
  const profile = await Profile.findOne({ where: { id: req.get('profile_id') || 0 } });
  if (!profile) {
    throw new UnauthorizedException();
  }
  req.profile = profile;
  return next();
};
module.exports = { getProfile };
