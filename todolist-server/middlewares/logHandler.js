"use strict"

const bunyan = require('bunyan');
const _ = require('lodash');
const humanize = require('humanize-number');

function time(start) {
    const delta = Date.now() - start
    return humanize(delta < 10000 ?
        delta + 'ms' :
        Math.round(delta / 1000) + 's')
}

const reqSerializer = (ctx = {}) => {
    return {
        method: ctx.method,
        path: ctx.path,
        url: ctx.url,
        headers: ctx.headers,
        protocol: ctx.protocol,
        ip: ctx.ip,
        query: ctx.query,
        body: ctx.request.body,
    };
}  
const resSerializer = function (ctx = {}) {
    return {
        statusCode: ctx.status,
        responseTime: ctx.responseTime,
        type: ctx.type,
        headers: (ctx.response || {}).headers,
        body: ctx.body,
    };
}

const log = function({
    logger = null 
} = {}){ 
    if(_.isNil(logger)){        
        throw Error("Logger is required");
    }
    return async(ctx, next) => {
        ctx.log = logger;
        ctx.log.addSerializers({
            req: reqSerializer,
            res: resSerializer,
            err: bunyan.stdSerializers.err,
        });

        ctx.log.info({
            req: ctx,
            event: "request",
        });

        try {
            const startTime = new Date();
            await next();
            ctx.responseTime = time(startTime);
            ctx.log.info({
              res: ctx,
              event: "response",
            });
        } catch (err) {
            ctx.log.error({
              err,
              event: "error",
            });
            throw err;
        }
    };
}

module.exports = log;