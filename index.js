const Koa = require('koa');
const convert = require('koa-convert');
const logger = require('koa-logger');
const cors = require('kcors');
const router = require('koa-router')();

const app = new Koa();

router
  .get('/', (ctx, next) => {
    ctx.body = 'hello';
  })
  .get('/api/foo', (ctx, next) => {
    ctx.body = 'hello 2';
  })
  .get('/api/medias', (ctx, next) => {
    ctx.body = [
        {id: 1, src: 'http://192.168.1.108:8080/photo/p/api/thumb.php?f=sample04&ac=qsampleac', width: 602, height: 400},
        {id: 2, src: 'http://192.168.1.108:8080/photo/p/api/thumb.php?f=sample09&ac=qsampleac', width: 400, height: 617},
        {id: 3, src: 'http://192.168.1.108:8080/photo/p/api/thumb.php?f=sample07&ac=qsampleac', width: 602, height: 400},
        {id: 4, src: 'http://192.168.1.108:8080/photo/p/api/thumb.php?f=sample01&ac=qsampleac', width: 597, height: 400},
        {id: 5, src: 'http://192.168.1.108:8080/photo/p/api/thumb.php?f=sample17&ac=qsampleac', width: 597, height: 400},
        {id: 6, src: 'http://192.168.1.108:8080/photo/p/api/thumb.php?f=sample18&ac=qsampleac', width: 533, height: 400},
        {id: 7, src: 'http://192.168.1.108:8080/photo/p/api/thumb.php?f=sample24&ac=qsampleac', width: 766, height: 150},
        {id: 8, src: 'http://192.168.1.108:8080/photo/p/api/thumb.php?f=sample14&ac=qsampleac', width: 653, height: 400},
        {id: 9, src: 'http://192.168.1.108:8080/photo/p/api/thumb.php?f=sample06&ac=qsampleac', width: 602, height: 400},
        {id: 10, src: 'http://192.168.1.108:8080/photo/p/api/thumb.php?f=sample23&ac=qsampleac', width: 606, height: 400},
        {id: 11, src: 'http://192.168.1.108:8080/photo/p/api/thumb.php?f=sample03&ac=qsampleac', width: 597, height: 400},
        {id: 12, src: 'http://192.168.1.108:8080/photo/p/api/thumb.php?f=sample10&ac=qsampleac', width: 400, height: 597},
        {id: 13, src: 'http://192.168.1.108:8080/photo/p/api/thumb.php?f=sample02&ac=qsampleac', width: 602, height: 400},
        {id: 14, src: 'http://192.168.1.108:8080/photo/p/api/thumb.php?f=sample21&ac=qsampleac', width: 533, height: 400},
        {id: 15, src: 'http://192.168.1.108:8080/photo/p/api/thumb.php?f=sample05&ac=qsampleac', width: 612, height: 400},
        {id: 16, src: 'http://192.168.1.108:8080/photo/p/api/thumb.php?f=sample11&ac=qsampleac', width: 547, height: 400},
        {id: 17, src: 'http://192.168.1.108:8080/photo/p/api/thumb.php?f=sample16&ac=qsampleac', width: 400, height: 597},
        {id: 18, src: 'http://192.168.1.108:8080/photo/p/api/thumb.php?f=sample22&ac=qsampleac', width: 533, height: 400},
        {id: 19, src: 'http://192.168.1.108:8080/photo/p/api/thumb.php?f=sample08&ac=qsampleac', width: 597, height: 400}
    ];
  });

app.use(cors());
app.use(convert(logger()))
app.use(router.routes())
app.use(router.allowedMethods());
app.listen(4000);
