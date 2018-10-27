const _ = require("lodash");
const jwt = require("jsonwebtoken");
const {
  jwtSecret
} = require("../config");

const User = require("../models/User");

const authHandler = function () {
  return async (ctx, next) => {
    try {
      const token = ctx.request.header.authorization;

      if (_.isNil(token)) {
        return next();
      }

      const jwtToken = token.split(" ")[1];
      if (_.isNil(jwtToken)) {
        return next();
      }

      const userId = jwt.verify(jwtToken, jwtSecret).data.user;
      const user = await User.findById(userId);
      ctx.user = user;

    } catch (err) {
      return next();
    }

    return next();
  };
}

module.exports = authHandler;