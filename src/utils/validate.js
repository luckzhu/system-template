/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function validNumber(rule, value, callback) {
  // 非负浮点数
  const numberReg = /^^\d+(\.\d+)?$/
  if (value !== '' && !numberReg.test(value)) {
    callback(new Error('请输入正确的数字'))
  } else {
    callback()
  }
}

export function validPassword(rule, value, callback) {
  // 数字和字母组成
  const passwordReg = /^[A-Za-z0-9]+$/
  if (value !== '' && !passwordReg.test(value)) {
    callback(new Error('密码应由数字或字母组成'))
  } else {
    callback()
  }
}
