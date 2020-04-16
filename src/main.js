import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// import VtableTemplate from '@/components/VtableTemplate'
import hbteApi from '@/utils/index'
import http from '@/utils/service/http'
import vAPI from '@/utils/service/reqURLPool'

import HBTEUI from '../hbteComponentsPackages'

// import 'normalize.css'
Vue.config.productionTip = false
// Vue.component(VtableTemplate.name, VtableTemplate)
// 只有vue相关的, 基于vue的插件, 才可以 Vue.use
Vue.use(ElementUI)
Vue.use(HBTEUI)
Vue.prototype.$hbteApi = hbteApi
Vue.prototype.$reqURLPool = vAPI
// 将axios方法挂载到了vue原型上, 所有vue实例都可以直接使用
Vue.prototype.$axios = axios
Vue.prototype.$http = http

// 配置 axios 默认请求的基础地址, 将来所有的请求, 都会在前面拼上这个地址
// 将来所有的请求, 都会在前面拼上 /aaa  =>   /aaa/login
axios.defaults.baseURL = store.state.baseURL

// 添加请求拦截器, 每次只要请求了, 都会被拦截到
// axios.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   // 每次真正请求出去之前, 都带上 token, 拼到请求头中
//   config.headers.Authorization = localStorage.getItem('token')
//   return config
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })

// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//   // 对响应数据做点什么
//   response = response.data
//   // 只要响应的 meta.status === 401 说明token失效了(伪造, 过期的),
//   // 清除无效的token, 拦截到登录去
//   if (response.meta.status === 401) {
//     localStorage.removeItem('token')
//     response.meta.msg = '登录状态已失效, 请重新登录'
//     // this.$router.push(....)  this.$router拿到的是整个的路由对象
//     router.push('/login')
//   }
//   return response
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error)
// })

// // 1. Vue.filter(过滤器名字, 处理函数)
// // 2. 使用
// //    {{ msg | 过滤器名字 }}
// Vue.filter('time', function (value) {
//   return moment(value * 1000).format('YYYY年MM月DD日 HH:mm:ss')
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// 禁止全局路由错误
