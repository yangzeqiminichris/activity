import { get } from '@/api/base'

// 获取活动详情
export function getActivityDetail(data) {
  return get(`/zbdx-api/h5/newYearDinnerActivity/${data.id}`, data)
}

export function checkUser() {
  return get(`/zbdx-api/member/isInternalUser`)
}

// 领取优惠券
export function postReceiveCoupon(data) {
  return get(`/couponActivity/h5/couponActivity/${data.id}`, data)
}

// 领取优惠券
export function subscribeGoods(data) {
  return get(`/zbdx-api/h5/newYearDinnerActivity/goodsSubscribe/${data.activityId}`, data)
}
