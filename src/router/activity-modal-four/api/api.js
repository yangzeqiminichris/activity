import { get, post } from "@/api/base";

export function getO2OActivityDetail(activityId ) {
  return get(`/o2o-api/v1/h5Activity`, { activityId, shopCode: '02' }); // 浙北汇生活在到家活动固定传02
}

export async function postO2OBatchExchange (activityId) {
  const url = `/o2o-api/v1/h5Activity/batchExchangeCoupon`
  return post(url, { activityId })
}
