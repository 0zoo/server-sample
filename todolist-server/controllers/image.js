const Joi = require("koa-joi-router").Joi;
const _ = require("lodash");
const AWS = require("aws-sdk");
const{
    bucketName,
    region
} = require("../config").aws;

const s3 = new AWS.S3({
    apiVersion: "latest",
    signatureVersion: "v4",
    region,
});

const getSignedUrl = function (operation, filename) {
    return new Promise((resolve, reject) => {
      s3.getSignedUrl(operation, {
        Bucket: bucketName,
        Key: filename,
        Expires: 300,
      }, function (err, signedUrl) {
        if (err) {
          reject(err);
        }
         resolve(signedUrl);
      });
    });
  }

// Image Upload
//   File      -> Storage Service: Google Storage, S3
//  Database   -> Meta
 // 1. Storage Service 생성
// 2. awssdk 를 이용해서 S3에 업로드 하는 기능을 구현한다.
//    File -> S3 Direct
// 3. 메타 정보를 저장하는 기능


const postImage = {
    path: "/images",
    method: "POST",
    // validate: {
    //   body: {
    //     filename: Joi.string().required(),
    //   },
    //   type: "json",
    // },
    async handler(ctx) {
      if (ctx.user == null) {
        throw new Error("Unauthorized");
      }
      // 이름 충돌을 방지하기 위해
        // 데이터베이스에 먼저 저장하고
        // _id를 기반으로 파일명을 생성한다.
       // Database Save
      // _id를 기반으로 파일명을 생성해야 한다.
      const filename = ctx.user._id+"_"+ _.now()+".jpg";  

      const signedUrl = await getSignedUrl("putObject", filename);
      ctx.body = {
        signedUrl,
        filename: filename
      }
    }
  };

const getImage = {
    path: "/images/:filename",
    method: "GET",
    async handler(ctx) {
      // if (ctx.user == null) {
      //   throw new Error("Unauthorized");
      // }
      const filename = ctx.params.filename;
      const signedUrl = await getSignedUrl("getObject", filename);
       // ctx.body = signedUrl;
      ctx.redirect(signedUrl);
    }
  }

  module.exports = [
    postImage,
    getImage,
  ]; 