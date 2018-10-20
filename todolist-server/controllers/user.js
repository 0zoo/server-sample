const mongoose = require("mongoose");
const User = require("../models/User");
const _ = require("lodash");

const Joi = require("koa-joi-router").Joi;

// Validator - Joi validator

// module.exports.postUser = postUser;
const postUser = {
  path: "/users",
  method: "POST",
  validate: {
    body: {
      email: Joi.string().email().required(),
      name: Joi.string().required(),
    },
    type: "json",
  },
  async handler(ctx) {
    ctx.body = "ok";
  }
};

const putUser = {
  path: "/users",
  method: "POST",
  async handler(ctx) {
    ctx.body = "put ok";
  }
};

const getUser = {
  path: "/users",
  method: "GET",
  async handler(ctx) {
    ctx.body = "get ok";
  }
};

module.exports = [
  getUser,
  postUser,
  putUser,
];