const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASS, {
    host: config.DB_HOST,
    dialect: config.DB_TYPE,
    port: config.DB_PORT,
    charset: config.DB_CHARSET,
    timezone: config.DB_TIMEZONE
});

sequelize.authenticate().then(function (err) {
    console.log(`\r\n ***** Database connection has been established successfully. *****\r\n`);
}).catch(function (err) {
    console.log('Unable to connect to the database:', err);
    throw err;
});

module.exports = sequelize;