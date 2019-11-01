import { get, post } from "@/api/base";

export function getActivityDetail(data) {
  return get(`/couponActivity/h5/couponActivity/${data.id}`, data);
}
