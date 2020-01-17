import { get } from './base'

export async function getLotAjActivityInfo () {
  const url = `/zbdx-api/grab-activity/info`
  return get(url)
}

export async function getPowerOfAj () {
  const url = `/zbdx-api/grab-activity/enter`
  return get(url)
}

// https://zbdx.jzjtong.com/jf-api/coupon/my?couponNum=20011454383000001

export async function getGetMyCouponDetail (couponNum) {
  const url = `/jf-api/coupon/my`
  return get(url, {
    couponNum
  })
}

export function getOtherOrderDetail (orderNo) {
  const url = '/jf-api/order'
  const data = {
    orderNo
  }
  return get(url, data)
}
