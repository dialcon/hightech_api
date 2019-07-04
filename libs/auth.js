var config = require('../config');
var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  req.isAuthenticated = function () {
    var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
    try {
      return jwt.verify(token, config.apikey.secret);
    } catch (err) {
      return false;
    }
  };

  if (req.isAuthenticated()) {
    var payload = req.isAuthenticated();
    req.user = payload;
    next();
  } else {
    next();
  }
};