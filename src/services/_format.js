/**
 * @description 数据格式化
 */

const { DEFAULT_PICTURE } = require('../conf/constant')

/**
 * 用户魔人头像
 * @param {*} obj 用户对象 
 * @returns 用户对象
 */
function _formatUserPicture(obj) {
    if (!obj.picture) {
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

/**
 * @description 格式化用户信息
 * @param {Array|object} list 用户列表或单个用户对象
 */
function formatUser(list) {
    if (!list) {
        return list
    }

    if (list instanceof Array) {
        // 数组 用户列表
        return list.map(_formatUserPicture)
    }

    // 单个对象
    return _formatUserPicture(result)
}

module.exports = {
    formatUser
}