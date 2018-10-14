const Koa = require('koa');
const Router = require('koa-router');

const logger = require('./logger');

const app = new Koa();
const router = new Router();

const logHandler = require("./middlewares/logHandler");

app.use(logHandler({
  logger,
}));

router.get('/', function(ctx){
    ctx.body = "Hello, TODO Service"
});

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);

