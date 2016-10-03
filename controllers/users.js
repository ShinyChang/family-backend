const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

const config = require('../config');
const datastore = require('@google-cloud/datastore')({
  projectId: config.gcp_project_id,
  keyFilename: config.gcp_key_filename
});

generateToken = function(facebook_id, expiresIn) {
  return jwt.sign({facebook_id}, config.jwt_secret, {
    expiresIn,
    subject: facebook_id,
    issuer: config.jwt_issuer
  });
}

/**
 * POST /api/auth
 */
exports.auth = function(ctx, next) {
  const accessToken = ctx.request.body.accessToken;
  const fields = 'name,email,picture';
  return new Promise((resolve, reject) => {
    fetch(`https://graph.facebook.com/me/?access_token=${accessToken}&fields=${fields}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      // {id, name, email, picture: {data: {is_silhouette, url}}}
      const user = {
        facebook_id: data.id,
        name: data.name,
        email: data.email,
        avatar: data.picture.data.url
      };
      var UserKey = datastore.key(['User', user.facebook_id]);
      datastore.upsert({
        key: UserKey,
        data: user
      }, (err, data) => {
        user.token = generateToken(user.facebook_id);
        ctx.body = user;
        resolve();
      });
    })
    .catch(err => {
      ctx.body = 'fail';
      resolve();
    });
  });
};


/**
 * GET /api/users/me
 */
exports.me = function(ctx, next) {
  const user = ctx.req.user;
  ctx.body = Object.assign({}, {id: user.key.name}, user.data);
};
