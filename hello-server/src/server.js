// Koa
const Koa = require("koa");           // npm i koa
const Router = require("koa-router"); // npm i koa-router
const logger = require("koa-logger"); // npm i koa-logger

const app = new Koa();
const router = new Router();

// Router
// 127.0.0.1:3000/users
// 127.0.0.1:3000/users/chansik
/*
app.use(async ctx => {
    ctx.body = "Hello, Koa"
});
*/

router.get("/", async ctx => {
    ctx.body = {
        name: "Hello REST API Server",
        version: "1.0.8",
        links:{
            user_url: "https://api.0zoo.xyz/users",
        }
     
    };
});

router.get("/users", async ctx => {
    ctx.body = [
        {
            name: "Tom",
            age: 42
        },  
        {
            name: "Alice",
            age: 12
        }
    ]
});

app.use(logger());        
app.use(router.routes())
    .use(router.allowedMethods());
app.listen(3000);
