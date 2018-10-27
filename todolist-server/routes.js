const router = require('koa-joi-router');
const apiRouter = router();
const Joi = router.Joi;

const userContoller = require("./controllers/user");
const imageContoller = require("./controllers/image");

apiRouter.get("/", (ctx) => {
  ctx.body = "Hello, TODO Service"
});

//apiRouter.post("/users", userContoller.postUser);

// apiRouter.route([
//   userContoller.postUser,
//   userContoller.putUser,
//   userContoller.getUser,
// ]);
apiRouter.route([
  ...userContoller,
  ...imageContoller,
]);

module.exports = apiRouter;