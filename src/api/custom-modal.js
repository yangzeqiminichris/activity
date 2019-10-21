import { get, post } from './base'

export async function getActivityDetail (activityId, shopCode) {
    const url = `/v1/h5Activity`
    return get(url, { activityId, shopCode})
}
