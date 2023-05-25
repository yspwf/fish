const log4js = require('log4js');

log4js.configure({
    appenders: {
        stdout: { type: "stdout" },
        debug: { type: "console" },
        fileAppender: {type: "file", filename: "logs/error.log"},
        infoFile: {type: "file", filename: "logs/info.log"}
    },
    categories:{ 
        default: { appenders:["stdout"], level: "debug"},
        error: { appenders:["fileAppender"], level: "error"},
        info: { appenders:["infoFile"], level: "info"},
        debug: { appenders:["stdout"], level: "debug"}
    }
})

const Error = (...message)=>{
    let msg = '';
    message.forEach(item => {
        if(Object.prototype.toString.call(item) != '[object String]') {
            msg += JSON.stringify(item)
        }else{
            msg += item
        }
    });
    const errorLog = log4js.getLogger('error');
    errorLog.error(msg)
}

const Info = (...message)=>{
    let msg = '';
    message.forEach(item => {
        if(Object.prototype.toString.call(item) != '[object String]') {
            msg += JSON.stringify(item)
        }else{
            msg += item
        }
    });
    
    const infoLog = log4js.getLogger('info');
    infoLog.info(msg);
}

const Debug = (...message)=>{
    let msg = '';
    message.forEach(item => {
        if(Object.prototype.toString.call(item) != '[object String]') {
            msg += JSON.stringify(item)
        }else{
            msg += item
        }
    });
    const debugLog = log4js.getLogger('debug');
    debugLog.debug(msg)
}

module.exports = {Error, Info, Debug}

// const logger1 = log4js.getLogger();
// logger1.info("普通日志输出这里！！！");
// logger1.error("程序发现错误， 报警信息");
// logger1.fatal("这里通常是服务端/引擎吃不消， 打印严重错误日志");

// const info1 = log4js.getLogger("info");
// info1.info("普通日志输出这里！！！");
// info1.error("程序发现错误， 报警信息");
// info1.fatal("这里通常是服务端/引擎吃不消， 打印严重错误日志");

// const info2 = log4js.getLogger("debug");
// info2.debug("日志console！！！");
// info2.info("普通日志输出这里！！！");
// info2.error("程序发现错误， 报警信息");
// info2.fatal("这里通常是服务端/引擎吃不消， 打印严重错误日志");