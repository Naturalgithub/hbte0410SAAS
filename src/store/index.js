import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    asideStatus: 'userwork',
    // token: localStorage.getItem('token')
    // baseURL: 'http://192.168.2.38:8080/',
    baseURL: 'http://192.168.2.146:8080/'
    // baseURL: 'http://47.98.145.222:8080/'
    // baseURL: 'http:/47.98.182.16:8080/'
  },
  mutations: {
    changeAsideStatus (state, obj) {
      console.log(obj)
      this.state.asideStatus = obj
    }
  },
  actions: {

  },
  modules: {
  }
})
