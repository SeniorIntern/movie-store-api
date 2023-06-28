module.exports = function (req, res, next) {
  if (!req.user.isAdmin) return req.status(403).send('Access Forbidden.');
  next();
};
