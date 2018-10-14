"use strict"

const bunyan = require('bunyan');
const _ = require('lodash');

const log = function({
    logger = null 
} = {}){ 
    if(_.isNil(logger)){        
        throw Error("Logger is required");
    }
    return function(ctx, next){ 
        logger.info("hello");
        next();
    };
}

module.exports = log;