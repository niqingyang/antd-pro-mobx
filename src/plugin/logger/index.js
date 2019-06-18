const fs = require('fs');

const options = {
    flags: 'a',     // append模式
    encoding: 'utf8',  // utf8编码
};

const stdout = fs.createWriteStream('D:/logs/node.info.log', options);
const stderr = fs.createWriteStream('D:/logs/node.error.log', options);

// 创建logger
const logger = new console.Console(stdout, stderr);

module.exports.logger = logger;