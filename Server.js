class Server {

    constructor(models, App){
        this.models = models;
        this.app = App.app;
    }

    resolve(){
        return new Proxy(this, {
            get(target, name){
                return target[name].bind(target);
            }
        })
    }

}

module.exports = Server;