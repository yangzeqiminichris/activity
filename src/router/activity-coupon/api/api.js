import { get, post } from "@/api/base";

// 获取活动详情
export function getActivityDetail(data) {
  return get(`/couponActivity/h5/couponActivity/${data.id}`, data);
}

// 领取优惠券
export function postReceiveCoupon(data) {
  return get(`/couponActivity/h5/couponActivity/${data.id}`, data);
}
