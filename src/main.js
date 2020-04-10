// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from './btnPermission'
import ElementUI from 'element-ui'
import Router from 'vue-router'
import axios from 'axios'
import Http from '@/service/http'
import hbteApi from '@/utils/index'
import hbteCps from './components/hbteComponents/index'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可

import VueLazyLoad from 'vue-lazyload'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import 'font-awesome/css/font-awesome.css'

import App from './App.vue'
import router from './router'
import store from './vuex'
import i18n from './i18n/i18n'

// 挂载swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
import vuescroll from 'vuescroll'
// import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue
// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
// 引用封装组件
import HBTE_COMPONETS from '@/components/hbteComponents/index'

Vue.config.productionTip = false

Vue.use(ElementUI)
// Vue.use(axios, VueAxios)

Vue.use(vuescroll)
Vue.use(VueQuillEditor)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('@/assets/common/placeholder.png')
})
// console.log(hbteCps)
// 注册组件后即可使用
// Vue.component('v-chart', ECharts)
// 把Http挂载到Vue实例上
// 模块不能绑定在原型上,点语法和中括号语法不出来
Vue.prototype.$hbteCps = HBTE_COMPONETS
Vue.prototype.$hbteApi = hbteApi
Vue.prototype.$http = Http
Vue.prototype.$axios = axios
// axios.defaults.baseURL = 'http://47.98.145.222:8080/'
// axios.defaults.baseURL = 'http://192.168.2.156:8080/'
axios.defaults.baseURL = store.state.baseurl

//  获取角色信息，根据用户权限动态加载路由
router.beforeEach((to, from, next) => {
  console.log(store.getters.token)
  // debugger
  if (store.getters.token) {
    store.dispatch('setToken', store.getters.token)
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (!store.getters.info.role) {
        // const role = ['/markdown', '/erji', '/erji2', '/siji', '/wuji']
        // eslint-disable-next-line no-unused-expressions
        !(async function getAddRouters () {
          // 省略 axios 请求代码 通过 token 向后台请求用户权限等信息，这里用假数据赋值
          await store.dispatch('getInfo', {
            role: 'superAdmin',
            permissions: '超级管理员'
          })
          await store.dispatch('newRoutes', store.getters.info.role)
          console.log(store.getters.addRouters)
          await router.addRoutes(store.getters.addRouters)
          next({ path: '/' })
        }())
      } else {
        let is404 = to.matched.some(record => {
          if (record.meta.role) {
            return record.meta.role.indexOf(store.getters.info.role) === -1
          }
        })
        if (is404) {
          next({ path: '/404' })
          return false
        }
        next()
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    }
    next({ path: '/login' })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})

// 禁止全局路由错误
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
