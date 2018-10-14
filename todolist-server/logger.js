"use strict"

const bunyan = require("bunyan");
const name = "todolist-server";

const config = { 
// const config = require("./config/logger");
// require은 해당 파일에서 모듈의 export를 통해 객체를 가져오는 것.
// 파일을 따로 안만들고 config를 그대로 받아오는 형태로 바로 사용하겠다는 의미.
    name, // name: name (더 직관적으로 보이도록 생략 가능.)
    streams: [{
        type: "stream",
        stream: process.stdout,
        level: "debug"
    }]
};

const options = {
    ...config, // flatmap 처럼 작용. 
    serializers: bunyan.stdSerializers, 
    // bunyan.stdSerializers: 
    // bunyan이 제공하는 request, response를 내부적으로 어떻게 처리할지를 결정해주는 기능.
};

const logger = bunyan.createLogger(options);
module.exports = logger;
// 모듈의 exports에 로거를 등록하면 
// 외부에서 require를 통해 등록된 로거를 가져올 수 있다.
