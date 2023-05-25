const Sequelize = require('sequelize')
module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
          type: Sequelize.STRING,
          field: 'username' // Will result in an attribute that is firstName when user facing but first_name in the database
        },
        passWrod: {
            type: Sequelize.STRING,
            field: 'password' // Will result in an attribute that is firstName when user facing but first_name in the database
          },
      }, {
        freezeTableName: true // Model 对应的表名将与model名相同
      });
      return User;
}
