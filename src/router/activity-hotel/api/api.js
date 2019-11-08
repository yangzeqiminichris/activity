import { get, post } from "@/api/base";

export function getActivityDetail(data) {
  return get(`/couponActivity/h5/couponActivity/${data.id}`, data);
}

export function checkUser() {
  return get(`/zbdx-api/member/isInternalUser`);
}

export function getCouponDetail(data) {
  return get(`/jf-api/goods`, data)
}
