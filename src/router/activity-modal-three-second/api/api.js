import { get, post } from "@/api/base";

export function getActivityDetail(data) {
  return get(`/o2o-api/v1/h5Activity`, data);
}
