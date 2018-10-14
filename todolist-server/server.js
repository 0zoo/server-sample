const Koa = require('koa');
const Router = require('koa-router');

// const logger = require('koa-logger')
const logger = require('./logger'); // ./logger.js

const app = new Koa();
const router = new Router();

const logHandler = require("./middlewares/logHandler");

app.use(logHandler({
  logger,
}));

router.get('/', function(ctx){
    ctx.body = "Hello, TODO Service"
});

// app.use(logger())
// 는 이제 사용 불가.
// 미들웨어가 제공하는 기본 형식을 따라야한다.
// 인터페이스를 암묵적으로 약속한다.
// => 별도의 logHandler를 만들어 사용한다.


app.use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);

