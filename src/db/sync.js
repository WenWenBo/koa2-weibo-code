/**
 * @description sequelize 同步数据库
 */
const seq = require('./seq')
// require('./model');

// 测试连接
seq
    .authenticate()
    .then(() => {
        console.log('auth ok.')
    })
    .catch((err) => {
        console.error('auth error:', err)
    })

seq
    .sync({
        force: true,
    })
    .then(() => {
        process.exit()
    })
