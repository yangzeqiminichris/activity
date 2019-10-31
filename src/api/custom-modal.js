import { get, post } from "./base";

export async function getActivityDetail(activityId, shopCode) {
  const url = `/o2o-api/v1/h5Activity`;
  return get(url, { activityId, shopCode });
}

export async function getCouponDetail(couponGoodsIds) {
  const url = `/jf-api/coupon/list`;
  if (Array.isArray(couponGoodsIds)) {
    couponGoodsIds = couponGoodsIds.join(",");
  }
  return get(url, { couponGoodsIds, size: 100 });
}

export async function postReceiveCoupon(goodsId) {
  const url = `/jf-api/order`;
  return post(url, { goodsId });
}
