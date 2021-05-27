import { sysLoginAPI } from '@/api/user'
import { setToken, getToken } from '@/utils/auth'
const state = {
  token: getToken() || ''
}
const mutations = {
  setTokenValue(state, value) {
    state.token = value
    setToken(value)
  }
}
const actions = {
  async login({ commit }, data) {
    const res = await sysLoginAPI(data)
    console.log(res)
    commit('setTokenValue', res)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
