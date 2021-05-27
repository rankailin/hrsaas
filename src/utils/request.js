
import axios from 'axios'
import { Message } from 'element-ui'
import { removeToken } from '@/utils/auth'
import store from '@/store'
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  withCredentials: true
})
/** 请求拦截器 */
request.interceptors.request.use((config) => {
  return config
}, (error) => { return Promise.reject(error) })
/** 响应拦截器 */
request.interceptors.response.use((res) => {
  console.log(res)
  if (res.data.success) {
    return res.data.data
  } else {
    if (res.config.isLogin) {
      removeToken()
      store.commit('user/setTokenValue', '')
      // console.log(store.getters.token)
    }
    Message.error(res.data.message)
    return Promise.reject(new Error(res.data.message))
  }
}, (error) => {
  return Promise.reject(error)
})

function _request(data) {
  return new Promise((resolve, reject) => {
    request(data).then(res => {
      console.log(res)
      resolve(res)
    }).catch((err) => { console.log(err) })
  })
}
export default _request
