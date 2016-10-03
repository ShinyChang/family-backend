'use strict';
const config      = require('./config');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;
const datastore = require('@google-cloud/datastore')({
  projectId: config.gcp_project_id,
  keyFilename: config.gcp_key_filename
});


module.exports = function(passport) {
  passport.use(new JWTStrategy({
    secretOrKey: config.jwt_secret,
    issuer: config.jwt_issuer,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
  }, (jwtPayload, done) => {
    const userID = jwtPayload.sub;
    const key = datastore.key(['User', userID]);
    const query = datastore.createQuery('User').filter('__key__', key);
    datastore.runQuery(query, (err, users) => {
      if (err) {
        return done(err, false);
      }
      if (!users.length) {
        return done(err, false);
      }
      return done(null, users[0]);
    });
  }))
};
