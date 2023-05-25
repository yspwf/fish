class Controller{
    constructor(Services, App){
        this.service = Services;
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

module.exports = Controller;