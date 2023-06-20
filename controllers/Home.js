const Controller = require('../Controller');
const { Info, Debug } = require('../src/log');
class Home extends Controller{
    
    async index(ctx){
        Debug("普通日志输出这里！！！");
        ctx.body = await this.service.Home.index();
    }

    async article(ctx){
       console.log(ctx.params);
        ctx.body = await this.service.Home.getById(ctx.params.id);
        Info(`用户id:`, ctx.params, "返回信息", ctx.body);
    }

}

module.exports = Home;