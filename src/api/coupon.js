import { get, post } from './base'

export async function getCouponDetail (couponGoodsIds) {
    const url = `/jf-api/coupon/list`
    return get(url, { couponGoodsIds: couponGoodsIds.join(','), newUserEnjoyment: 1, size: 100 })
}

export async function postReceiveCoupon (goodsId) {
    const url = `/jf-api/order`
    return post(url, { goodsId })
}

export async function getActivityInfo () {
    const url = `/zbdx-api/h5/newUserArea`
    return get(url)
}
