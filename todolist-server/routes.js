const router = require('koa-joi-router');
const apiRouter = router();
const Joi = router.Joi;

const userContoller = require("./controllers/user");

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
]);

module.exports = apiRouter;