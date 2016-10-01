const fetch = require('node-fetch');

/**
 * GET /api/auth
 */
exports.auth = function (ctx, next) {
  const accessToken = ctx.request.body.accessToken;
  const fields = 'name,email,picture';
  return fetch(`https://graph.facebook.com/me/?access_token=${accessToken}&fields=${fields}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      // {id, name, email, picture: {data: {is_silhouette, url}}}
      ctx.body = 'success';
    })
    .catch(err => {
      ctx.body = 'fail';
    })
};
