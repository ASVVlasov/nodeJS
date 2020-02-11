module.exports.mustBeAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
      } else {
        res.redirect('login');
      }
}

module.exports.mustBeRedirected = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect('tasks');
  }
}