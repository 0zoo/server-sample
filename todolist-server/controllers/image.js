const Joi = require("koa-joi-router").Joi;
const _ = require("lodash");

const uploadImages = {
    path: "/upload/images",
    method: "POST",
    async handler(ctx){
        
        ctx.body = {
            message: "ok",
        }
    }
};


module.exports = [
    uploadImages,
];