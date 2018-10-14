"use strict"

const bunyan = require("bunyan");
const name = "todolist-server";

const config = { 
    name,
    streams: [{
        type: "stream",
        stream: process.stdout,
        level: "debug"
    }]
};

const options = {
    ...config,
    serializers: bunyan.stdSerializers, 
};

const logger = bunyan.createLogger(options);
module.exports = logger;
