import axios from 'axios'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  (cfg) => {
    // Do something before request is sent
    return cfg
  },
  (err) => {
    // Do something with request error
    return Promise.reject(err)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  (res) => {
    // Do something with response data
    return res
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
