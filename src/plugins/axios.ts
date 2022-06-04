import axios from 'axios'
import {
  MsgErrorHandler,
  MsgInfoHandler
} from '@/components/MessageApi/Message'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5 * 1000 // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  (cfg) => {
    // Do something before request is sent
    // 如果存在token则加上Token
    return cfg
  },
  (err) => {
    // Do something with request error
    return Promise.reject(err)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  (res:any) => {
    // Do something with response data
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.
    const data = res.data
    if (data.code !== 20000) {
      MsgErrorHandler(res.message)
    }
    if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      MsgInfoHandler('你已被登出，请重新登录!')
      location.reload() // 重新登录
      return Promise.reject(new Error(res.message || 'Error'))
    } else return res
  },
  (err) => {
    // Do something with response error
    return Promise.reject(err)
  }
)

export default {
  install: function (app: any, options: any) {
    console.log(options)
    // 添加全局的方法
    app.config.globalProperties.axios = _axios
    // 添加全局的方法
    app.config.globalProperties.$translate = (key: any) => {
      return key
    }
  }
}
