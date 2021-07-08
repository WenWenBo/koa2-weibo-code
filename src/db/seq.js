/**
 * @description sequelize实例
 * @author shiwen
 */
const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const {
    host,
    user,
    password,
    database
} = MYSQL_CONF

const config = {
    host,
    dialect: 'mysql'
}

// 单元测试时不打印sql语句
if (isTest) {
    config.logging = () => {}
}

// 线上环境... 使用连接池
if (isProd) {
    config.pool = {
        max: 5, // 连接池中最大的链接数量
        min: 0, // 链接池中最小的链接数量
        idle: 10000, // 如果一个连接10秒内没有被使用则释放
    }
}

const seq = new Sequelize(database, user, password, config)


module.exports = seq