import request from '@/utils/request'

/** 登录 */
export function sysLoginAPI(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data,
    isLogin: true
  })
}