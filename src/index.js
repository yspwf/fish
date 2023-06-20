const Koa = require('koa');

const Plugins = require('../plugins');

class MyKoa extends Koa{
    constructor(Plugins){
        super();
        this.plgindsObj = Plugins;
        this.app= {};
        this.initPlugins();

    }

    initPlugins(){
        // console.log(this.plgindsObj)
        // console.log(Object.keys(this.plgindsObj))
        Object.keys(this.plgindsObj).forEach(item => {
           // console.log(item);
           this.app[item] = this.plgindsObj[item].package;
        })
    }
}

const fs = require('fs');


const ROOT = process.cwd();

const Config = (path='')=>{
    const config = require(ROOT+'/config/config.js');
    return config;
}

const config = Config();


//loader model
const Connection = require('./connection');
const sequelize = Connection(config);

function LoaderModelFile(sequelize){
    const files = fs.readdirSync(process.cwd() + '/models');
    const models = {}
    if(files.length > 0) {
        for (const file of files) {
            if (file.toLowerCase().endsWith('js')) {
                const model = require(process.cwd() + `/models/${file}`);
                
                models[`${file.replace(/\.js/, '')}`] = model(sequelize);
            }
        }
    }
    return models;
}


const sqlModels = LoaderModelFile(sequelize);

//loader service file
function LoaderServiceFile(sqlModels){
    const files = fs.readdirSync(process.cwd() + '/services');
    const services = {}
    if(files.length > 0) {
        for (const file of files) {
            if (file.toLowerCase().endsWith('js')) {
                const service = require(process.cwd() + `/services/${file}`);
                const Ser = new service(sqlModels, App);

                const handler = {}; //handler：是一个普通对象，其中可以重写底层实现
                const proxy = new Proxy(Ser, handler);//创建空对象

                if(proxy.resolve){
                    services[`${file.replace(/\.js/, '')}`] = Ser.resolve();
                }else{
                    services[`${file.replace(/\.js/, '')}`] = Ser;
                }
            }
        }
    }
    return services;
}



//loader controller file
function LoaderControllerFile(){
    const files = fs.readdirSync(process.cwd() + '/controllers');
    const controllers = {}
    if(files.length > 0) {
        for (const file of files) {
            if (file.toLowerCase().endsWith('js')) {
                const controller = require(process.cwd() + `/controllers/${file}`);
               
                const Ctro = new controller(Services, App);
                const handler = {}; //handler：是一个普通对象，其中可以重写底层实现
                const proxy = new Proxy(Ctro, handler);//创建空对象

                if(proxy.resolve){
                    controllers[`${file.replace(/\.js/, '')}`] = Ctro.resolve();
                }else{
                    controllers[`${file.replace(/\.js/, '')}`] = Ctro;
                }
            }
        }
    }
    return controllers;
}




//loader controller file
function LoaderMiddlwares(){
    const files = fs.readdirSync(process.cwd() + '/middlewares');
    const middlewares = {}
    if(files.length > 0) {
        for (const file of files) {
            if (file.toLowerCase().endsWith('js')) {
                const middleware = require(process.cwd() + `/middlewares/${file}`);
                
                middlewares[middleware.name] = middleware;
            }
        }
    }
    return middlewares;
}



const App = new MyKoa(Plugins);
const Services = LoaderServiceFile(sqlModels);
const Controllers = LoaderControllerFile();
const Middlewares = LoaderMiddlwares();

App.use(async (ctx, next) => {
    ctx.service = Services;
    await next();
})





const Router = require('koa-router')();
const routerFun = require('../router/index');

// const Logs = require('./log');
// console.log(Logs);


const Init = (port = 9093) => {

    routerFun({Router, Middlewares, Controllers});

    App.use(Router.routes()).use(Router.allowedMethods());

    App.listen(port, ()=>{
        console.log('app server start');
    })   
};

module.exports = Init;