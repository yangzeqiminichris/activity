import { get, post } from './base'

export async function getCouponDetail (couponGoodsIds) {
    const url = `/jf-api/coupon/list`
    return get(url, { couponGoodsIds: couponGoodsIds.join(','), newUserEnjoyment: 1, size: 100 })
}

export async function postReceiveCoupon (goodsId) {
    const url = `/jf-api/order`
    return post(url, { goodsId })
}

export async function getCouponIds () {
    const url = `/zbdx-api/index/getJsonFileInfo?url=H5/newConsumerActivity/1001_1031/newConsumerCouponIds.json`
    return get(url)
}