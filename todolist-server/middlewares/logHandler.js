"use strict"

const bunyan = require('bunyan');
const _ = require('lodash');

const log = function({
    logger = null  // logger의 디폴트값 null
} = {}){ 
    // ==(객체 동등성), ===(참조 동등성)
    // 암묵적인 타입 변환으로 인한 자바스크립트의 삼위일체 문제 
    // undefined의 위험성을 방지하기 위해서 lodash를 사용하자.
    if(_.isNil(logger)){        
        throw Error("Logger is required");
    }
    return function(ctx, next){ 
        // ctx: request, response 정보.
        // next: 다음 미들웨어로 pass 또는 block할 수 있도록 하는 것.
        // 미들웨어는 요청이 들어올때마다 자동적으로 호출되기 때문에 보일러플레이트를 줄일 수 있음.
        logger.info("hello");
        next();
    };
    // 함수를 반환하는 함수: 고차함수
}

module.exports = log;