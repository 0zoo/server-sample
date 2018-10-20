const User = require("../models/User");
const _ = require("lodash");
const bcrypt = require('bcrypt')

const Joi = require("koa-joi-router").Joi;

class ClientError extends Error {
    constructor(message) {
      super(message);
      this.status = 400;
    }
  }

// Validator - Joi validator

// User - CRUD
// Task - CRUD
// GTD

// 함수
//  동기: 결과가 바로 반환된다.
//  비동기
//    1. 인자로 callback을 받는다.
//    2. 반환타입이 Promise<T> 이다.

// module.exports.postUser = postUser;
// 비밀번호 조건 => Regex(정규 표현식)
//  1) 6글자 이상
//  2) 반드시 영문자 + 숫자
//  3) 특수 문자
//  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/

// HTTP 통신은 비 암호화 통신입니다.
//  => 반드시 HTTPS 를 이용해야 합니다.

// 암호화
//  1. 단방향(비밀번호, 주민등록번호) - Hash
//     hello -> sdjklajldjalksdjak!2123
//  2. 양방향(RSA)
//     인증서 기반 암호화(RSA)
//         '공개키'  '비공개키'  
//  공개키 : 암호화 할 때 사용한다.
// 비공개키 : 암호를 풀 때 사용한다.

// bcrypt 모듈을 이용하면 됩니다.
//  SHA1, SHA256, SHA512, SHA1024

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
        /*

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

        */

        // 위의 로직은 모델이 처리해주게 해줘야 한다.
        ctx.body = await User.signUp(ctx.request.body);
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