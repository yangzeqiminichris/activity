import axios from 'axios'
import qs from 'qs'
// import { ERROR_OK, ERROR_NOT_LOGIN } from 'common/js/constants'
import { getToken } from '../cache/token.js'
import { message } from 'antd';

let notLoginCallback = () => {
    window.wx.miniProgram.navigateTo({url: '/pages/user/login/login'})
}
axios.defaults.baseURL = 'https://zbdx.jzjtong.com'
axios.defaults.headers.common['Cross-Origin'] = '*'
axios.defaults.headers.common['Accept'] = 'application/json'
getToken().then((res) => {
    axios.defaults.headers['Authorization'] = res
})
axios.defaults.headers.common['Cross-Origin'] = '*'
/*axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded'*/

// 添加响应拦截器
axios.interceptors.response.use((response) => {
    // 对响应数据做点什么
    return then(response)
}, (error) => {
    // 对响应错误做点什么
    if (error.response.status === 401) {
        notLoginCallback && notLoginCallback()
        return reject(error)
    }
    return reject(error)
})

function then (response) {
    try {
        let res = response.data
        if (typeof res === 'string') {
            res = JSON.parse(res)
        }
        /* if (res.ret === ERROR_OK) {
          return Promise.resolve(res.data)
        } else if (res.ret === ERROR_NOT_LOGIN) {
          notLoginCallback && notLoginCallback()
          return reject(res)
        } else {
          return reject(res)
        } */
        if (res.code === 1) {
            return Promise.resolve(res.data)
        } else if (res.code === -1) {
            message.warning(res.msg)
            return reject(res)
        }
    } catch (e) {
        // JSON 格式解析失败
        return reject(e)
    }
}

function reject (e) {
    return Promise.reject(getErrorMessage(e))
}

function getErrorMessage (e) {
    if (e && e.msg) {
        return e
    }
    return {
        ret: -1,
        msg: '网络连接失败，请稍后再试'
    }
}

export function get (url, data) {
    return axios.get(url, { params: data })
}

export function post (url, data, isFormData) {
    return axios.post(url, isFormData ? data : qs.stringify(data, { arrayFormat: 'repeat' }))
}

export function put (url, data, isRawData) {
    return axios.put(url, isRawData ? data : qs.stringify(data, { arrayFormat: 'repeat' }))
}

export function apiDelete (url, data) {
    return axios.delete(url, {data: qs.stringify(data, { arrayFormat: 'repeat' })})
}

export function setNotLoginCallback (callback) {
    notLoginCallback = callback
}

export function updateAuthorization () {
    getToken().then((res) => {
        axios.defaults.headers['Authorization'] = res
    })
}
