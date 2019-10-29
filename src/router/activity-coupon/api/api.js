import { get, post } from "@/api/base";

export function getActivityDetail(data) {
  return get(`/test/h5/couponActivity/${data.id}`, data);
}
