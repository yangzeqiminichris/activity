import { get, post, getBase64 } from './base'

export default class api {
  // 预约
  static maskPost(data) {
    return post('/zbdx-api/mask', data)
  }
  // 获取校验码
  static getCode() {
    return getBase64('/zbdx-api/mask/code')
  }
  // 根据身份证号查询已成功预约的信息
  static getInfoByIdCard(data) {
    return get('/zbdx-api/mask/list', data)
  }
  // 门店预约时段查询
  static getPlan(shopId) {
    return get('/zbdx-api/mask/plan', { shopId })
  }
  // 门店列表
  static getShopList() {
    return get('/zbdx-api/mask/shop')
  }
}
