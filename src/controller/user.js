/**
 * @description user controller
 */

const { getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo')

/**
 * @description 用户名是否存在
 * @param {string} userName 用户名 
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)

    if (userInfo) {
        // 已存在
        return new SuccessModel(userInfo)
        // { errno: 0, data: {...} }
    } else {
        // 用户名不存在
        return new ErrorModel(registerUserNameNotExistInfo)
        // { errno: 10003, message: 'xxx' }
    }
}

module.exports = {
    isExist
}