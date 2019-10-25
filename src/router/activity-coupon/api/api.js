import { get, post } from "@/api/base";

export function getActivityDetail(data) {
  return get(`/h5/couponActivity/${data.id}`, data);
}
