const Koa = require('koa');
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('kcors');
const router = require('koa-router')();
const passport = require('koa-passport');

const config = require('./config');
const users = require('./controllers/users');
const medias = require('./controllers/medias');
const auth = require('./auth');
const myPassport = require('./passport');





const app = new Koa();
router
  .post('/api/auth', users.auth)
  .get('/api/users/me', auth.jwt, users.me)
  .get('/api/medias/upload_url', auth.jwt, medias.getUploadUrl)
  .get('/api/medias', auth.jwt, medias.get)


app.use(convert(logger()))
app.use(bodyParser());
app.use(cors());
app.use(passport.initialize());
myPassport(passport);
app.use(router.routes())
app.use(router.allowedMethods());
app.listen(config.port);
