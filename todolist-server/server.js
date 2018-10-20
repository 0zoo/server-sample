const Koa = require('koa');
const logger = require('./logger');
const config = require("./config");
// const bodyParser = require('koa-bodyparser');
console.log(config);

const app = new Koa();
const router = require("./routes");

const logHandler = require("./middlewares/logHandler");

app.use(logHandler({
  logger,
}));

app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = {
        message: err.message,
        body: ctx.request.body,
        query: ctx.request.query,
      }
      ctx.app.emit("error", err, ctx);
    }
  });
  
// app.use(bodyParser());
app.use(router.middleware());
// app.use(router.routes())
//   .use(router.allowedMethods());
  
app.on("error", (err, ctx) => {
    if (ctx == null) {
      logger.error({
        err,
        event: "error",
      });
    }
  });

const setupDatabase = function (config) {
    const mongoose = require("mongoose")
    // "mongodb://${user}:${password}@${host}:${port}/${name}"
    //const dbUri = "mongodb://hello:linux123@13.125.255.236:27000/hello";
    
    with(config.database) {
        const dbUri = `mongodb://${user}:${password}@${host}:${port}/${name}`;
        mongoose.connect(dbUri, {
          useNewUrlParser: true,
        });
      }

    const db = mongoose.connection;

    db.on("open", () => {
        console.log("Database connection successful");
      });
      db.on("connected", () => {
        console.log("MongoDB connected");
      });
      db.on("reconnected", () => {
        console.log("MongoDB reconnected");
      });
      db.on("error", (err) => {
        console.log("Error in MongoDB: " + error);
      });
      db.on("disconnected", () => {
        console.log("MongoDB disconnected");
      });
}

setupDatabase(config);

app.listen(3000);

