'use strict';

var passport = require('passport');

exports.jwt = function(ctx, next) {
  return passport.authenticate('jwt', {session: false})(ctx, next);
};

