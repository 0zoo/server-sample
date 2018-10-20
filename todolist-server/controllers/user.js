const User = require("../models/User");
const _ = require("lodash");
const bcrypt = require('bcrypt')

const Joi = require("koa-joi-router").Joi;

// Validator - Joi validator

// module.exports.postUser = postUser;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
const postUser = {
    path: "/users",
    method: "POST",
    validate: {
        body: {
            email: Joi.string().email().required(),
            name: Joi.string().required(),
            password: Joi.string().regex(passwordRegex,"password").required(),
        },
    type: "json",
},
    async handler(ctx) {

        // 1. 해당하는 사용자가 이미 존재하는지 확인
        const {
            email,
            password,
        } = ctx.request.body

        const exist = await User.findOne({
            email
        }).exec();

        if(!_.isNil(exist)){
            throw new ClientError("Already exist email")
            /*
            const error = new Error("Already exist email")
            error.status = 400;
            throw error
            */
        }
        // 2. 비밀번호를 암호화해서 저장
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
            ...ctx.request.body,
            password : passwordHash
        })

        const data = (await user.save()).toObject();
        delete data.password;

        ctx.body = data;

        //const user = new User(ctx.request.body)
        // 기호에 맞게 원하는 방식으로 사용
        // 1.
        // const data = await user.save()
        // ctx.body = data;
        // 2.
        // await user.save();
        // ctx.body = user
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