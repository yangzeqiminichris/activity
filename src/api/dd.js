import { get, post } from "./base";
export function sendSms (phone, type) {
    const url = '/zbdx-api/home/sms'
    const data = {
        type,
        phone
    }
    return get(url, data)
}

export function checkLoginSms (acId, phone, smsCode) {
    const url = '/zbdx-api/h5/preReleaseCoupon/submit'
    const data = {
        acId,
        phone,
        smsCode
    }
    return post(url, data)
}

export function preReleaseCoupon (id) {
    const url = `/zbdx-api/h5/preReleaseCoupon/${ id }`
    const data = {
        id
    }
    return get(url, data)
}
