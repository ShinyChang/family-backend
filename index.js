const Koa = require('koa');
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('kcors');
const router = require('koa-router')();
const passport = require('passport');
const config = require('./config');

const users = require('./controllers/users');
const medias = require('./controllers/medias');


const jwt = function(req, res, next) {
  passport.authenticate('jwt', {session: false})(req, res, next);
};

const datastore = require('@google-cloud/datastore')({
  projectId: config.gcp_project_id,
  keyFilename: config.gcp_key_filename,
  apiEndpoint: 'localhost:8540' // local test
});




const app = new Koa();
var key = datastore.key(['Product', 'Computer']);
datastore.get(key, function(err, entity) {
  console.log(err || entity);
});

// Save data to Datastore.
var blogPostData = {
  title: 'How to make the perfect homemade pasta',
  author: 'Andrew Chilton',
  isDraft: true
};
var query = datastore.createQuery('BlogPost')
  .order('title', {
    descending: true
  });
datastore.runQuery(query, function (err, tasks) {
  if (!err) {
    // Task entities found.
    console.log(tasks)
  }
});
var blogPostKey = datastore.key('BlogPost');
console.log(blogPostKey)
console.log(blogPostData)
datastore.upsert({
  key: blogPostKey,
  data: blogPostData
}, function(err) {
  // `blogPostKey` has been updated with an ID so you can do more operations
  // with it, such as an update.
  blogPostData.isDraft = false;

  datastore.upsert({
    key: blogPostKey,
    data: blogPostData
  }, function(err) {
    if (!err) {
      // The blog post is now published!
    }
  });
});




router
  .post('/api/auth', users.auth)
  .get('/api/medias/upload_url', medias.getUploadUrl)
  .get('/api/medias', medias.get);

app.use(bodyParser());
app.use(cors());
app.use(convert(logger()))
app.use(router.routes())
app.use(router.allowedMethods());
app.listen(config.port);
