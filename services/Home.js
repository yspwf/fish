const Server = require('../Server');

class Home extends Server{
    async index(){
        this.app.myTest();
       return await this.models.user.findAll();
    }
}
module.exports = Home;