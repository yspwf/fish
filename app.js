const Init = require('./src/index');
Init();

// const cluster = require('cluster');
// const cpuNums = require('os').cpus().length;

// if(cluster.isMaster){

//     console.log(`主进程 ${process.pid} 正在运行`);

//     for(let i=0; i< cpuNums; i++){
//         cluster.fork();
//     }

//     cluster.on('exit', (worker, code, signal) => {
//         console.log('子进程 '+ worker.process.pid +'已退出');
//     });
// }else{
//     Init();
//     console.log(`子进程 ${process.pid} 启动`);
// }

// process.on('SIGTERM', ()=>{
//     console.log('server is exit');
//     process.exit();
// });

// process.on('SIGINT', ()=>{
//     console.log('server is exit');
//     process.exit();
// })
