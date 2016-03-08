var jwt = require('jsonwebtoken');
var config = require('./jwtConfig');

var middlewares = {
    verifyToken : function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          return res.status(403).send('Failed to authenticate token.');
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send('No token provided.');
    }
  }
};

module.exports = middlewares;