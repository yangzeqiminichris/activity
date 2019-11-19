import { get, post } from '@/api/base'

export function getDraw(data) {
  return post(`/o2o-api/v1/activity-lottery/${data.activityId}`, data)
}
