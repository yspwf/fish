const Sequelize = require('sequelize');

const sequelize = new Sequelize('blog', 'root', '123456', {
    define: {
        timestamps: false, // 全局默认不要 createAt 和 updateAt，自动管理时间
    },
    host: 'localhost', // ip
    port: 3306, // 端口
    // logging: (msg) => { // 日志信息，打印出每个操作生成的具体的 sql语句
    //   console.log('msg', msg);
    // }
    logging: false,
    timezone: '+08:00', 
    dialect: 'mysql',
    //dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',
})

sequelize.authenticate()
    .then(() => {      console.log('连接成功'); 
    })
    .catch(err => {      console.log(err);
});


module.exports = sequelize;