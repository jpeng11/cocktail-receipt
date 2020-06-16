module.exports = function (req, res, next) {
  if (req.user) {
    return next();
  } else if (req.xhr || /json/i.test(req.headers.accept)) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  return res.redirect('/login');
};
