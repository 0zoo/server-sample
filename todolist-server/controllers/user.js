const User = require("../models/User");
const _ = require("lodash");

const Joi = require("koa-joi-router").Joi;

const {
    ClientError,
} = require("../error");

// Image upload
//  Multipart POST
//   : moudle

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
        ctx.body = await User.signUp(ctx.request.body);
    }
};

// POST
//   HTTP - Connection-less
//      => Stateless
 // Memory
//    1. CPU Cache
//    2. Memory
//    3. SSD(HDD)
//    4. Network Storage(Database) - MySQL, MongoDB
//       Memory DB(Redis, Memcached) - Session Store
 // User login
//    Access Token: "XXXXXXXXXXXXXXASDQWEQWEQWE"
//
//   {
//      _id: "",
//      expiredAt: "...",
//      permissions: [],
//   }
//   : JSON -> TOKEN -> JSON
//   JWT(Json Web Token)
 // Login 순서
// 1. User 로그인 요청
// 2. 비밀번호 검증
// 3. 토큰(Access Token) 발급
// 4. Database 저장(CREATE)
 // Logout(GET)
//  1. AccessToken 삭제


const getUser = {
    path: "/users",
    method: "GET",
    async handler(ctx) {
      if (_.isNil(ctx.user)) {
        throw new ClientError("Unauthorized");
      }  
      ctx.body = ctx.user;
    }
  };

const signIn =  {
    path: "/auth/login",
    method: "POST",
    validate:{
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
        type: "json",
    },
    async handler(ctx){
        const token = await User.signIn(ctx.request.body);
        ctx.body = {
        token,
        };
    }

};

const updateUser = {
    path: "/users/update",
    method: "PUT",
    validate: {
        //headers:{
        //    authorization: Joi.string().required(),
        //},
        body: Joi.object({
            email: Joi.string().email(),
            name: Joi.string(),
            password: Joi.string().regex(passwordRegex,"password"),
        }).or("email","name","password").required(),
        type: "json",
  },
    async handler(ctx) {
        //ctx.body = await User.updateUser(ctx.request.headers["authorization"], ctx.request.body);
        if (_.isNil(ctx.user)) {
            throw new ClientError("Unauthorized");
        }
        const {
            password = null,
          } = ctx.request.body;
          const data = ctx.request.body;
           if (!_.isNil(password)) {
            const passwordHash = await User.hashPassword(password);
            data.password = passwordHash;
          }
           const user = await User.findByIdAndUpdate(ctx.user._id, data, {
            new: true
          });
           ctx.body = user;
    },  
  };
  



module.exports = [
  getUser,
  postUser,
  signIn,
  updateUser,
];