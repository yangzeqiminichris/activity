import axios from 'axios'
import qs from 'qs'
// import { ERROR_OK, ERROR_NOT_LOGIN } from 'common/js/constants'
// import { getToken } from '../cache/token.js'
import { message } from 'antd';
import { Toast } from 'antd-mobile'

let notLoginCallback = () => {
    window.wx.miniProgram.navigateTo({url: '/pages/user/login/login'})
}
/* axios.defaults.baseURL = 'https://jf-api.zbszkj.co/jf-api' */ // https://jf-api.zbszkj.com // https://zbdx.jzjtong.com
axios.defaults.headers.common['Cross-Origin'] = '*'
axios.defaults.headers.common['Accept'] = 'application/json'
function getToken() {
    let res = sessionStorage.getItem('___token___')
    return Promise.resolve(res)
}
getToken().then((res) => {
    axios.defaults.headers['Authorization'] = res
})
axios.defaults.headers.common['Cross-Origin'] = '*'
/*axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded'*/

axios.interceptors.request.use(async (config) => {
  // 在发送请求之前做些什么

  await getToken().then((res) => {
    config.headers.Authorization = res
  })
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use((response) => {
    // 对响应数据做点什么
    return then(response)
}, (error) => {
    // 对响应错误做点什么
    if (error.response && error.response.status === 401) {
        notLoginCallback && notLoginCallback()
        return reject({ msg: '用户未登录，请登陆后重试' })
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
            Toast.hide()
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
    url = replacUrl(url)
    return axios.get(url, { params: data })
}

export function post (url, data, isFormData) {
    url = replacUrl(url)
    return axios.post(url, isFormData ? data : qs.stringify(data, { arrayFormat: 'repeat' }))
}

export function put (url, data, isRawData) {
    url = replacUrl(url)
    return axios.put(url, isRawData ? data : qs.stringify(data, { arrayFormat: 'repeat' }))
}

export function apiDelete (url, data) {
    url = replacUrl(url)
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

function replacUrl (url) {
    // http://zbdx.jzjtong.com/jf-api/coupon/list
    if (process.env.REACT_APP_ENV === 'test') {
        url = url.replace('/jf-api', 'https://zbdx.jzjtong.com/jf-api/')
        url = url.replace('/zbdx-api', 'https://zbdx.jzjtong.com/zbdx-api')
        url = url.replace('/o2o-api', 'https://zbdx.jzjtong.com/o2o-api')
        url = url.replace('/koiActivity', 'https://zbdx.jzjtong.com/zbdx-api/koiActivity')
        url = url.replace('/test', 'https://zbdx.jzjtong.com/zbdx-api')
    } else if (process.env.NODE_ENV === 'production') {
        url = url.replace('/jf-api', 'https://jf-api.zbszkj.com')
        url = url.replace('/zbdx-api', 'https://zbdx-api.zbszkj.com')
        url = url.replace('/o2o-api', 'https://o2o-api.zbszkj.com')
        url = url.replace('/koiActivity', 'https://zbdx-api.zbszkj.com/koiActivity')
    } else if (process.env.NODE_ENV === 'development') {
        url = url.replace('/jf-api', 'https://zbdx.jzjtong.com/jf-api/')
        url = url.replace('/zbdx-api', 'https://zbdx.jzjtong.com/zbdx-api')
        url = url.replace('/o2o-api', 'https://zbdx.jzjtong.com/o2o-api')
        url = url.replace('/koiActivity', 'https://zbdx.jzjtong.com/zbdx-api/koiActivity')
        url = url.replace('/test', 'https://zbdx.jzjtong.com/zbdx-api')
    }
    /*url = url.replace('/jf-api', 'https://zbdx.jzjtong.com/jf-api')
    url = url.replace('/zbdx-api', 'https://zbdx.jzjtong.com/zbdx-api')*/
    return url
}