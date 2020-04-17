import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from 'views/login/Login'

Vue.use(VueRouter)
// 异步组件, 可以实现按需加载
// const Login = function () {
//   return import('./components/Login.vue')
// }
// 实现了效果: 只有用到了该组件, 才会加载该组件
const Login = () => import(/* webpackChunkName: 'login' */'@/views/login/Login')
const Index = () => import(/* webpackChunkName: 'index' */'@/views/layout/Index.vue')
const Error = () => import(/* webpackChunkName: 'index' */'@/views/layout/Error.vue')
const Test1 = () => import(/* webpackChunkName: 'index' */'@/views/qualityControl/Test1.vue')
const Test2 = () => import(/* webpackChunkName: 'index' */'@/views/qualityControl/Test2.vue')
const Test3 = () => import(/* webpackChunkName: 'index' */'@/views/qualityControl/Test3.vue')
const Userwork = () => import(/* webpackChunkName: 'index' */'@/views/asideIndex/Userwork')
const Inform = () => import(/* webpackChunkName: 'index' */'@/views/asideIndex/Inform')
const Complaint = () => import(/* webpackChunkName: 'index' */'@/views/asideIndex/Complaint')
const Work = () => import(/* webpackChunkName: 'index' */'@/views/asideIndex/Work')
const Calendar = () => import(/* webpackChunkName: 'index' */'@/views/asideIndex/Calendar')
const Todolist = () => import(/* webpackChunkName: 'index' */'@/views/asideIndex/Todolist')
// const Indexx = () => import(/* webpackChunkName: 'indexx' */'../main')

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect: '/userwork'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  { path: '*', name: '404', component: Error },
  {
    path: '/userwork',
    name: '个人工作',
    component: Index,
    children: [
      // 通过 /users 就可以匹配子路由了
      { path: '/Test1', name: '测试1', component: Test1 },
      { path: '/Test2', name: '测试2', component: Test2 },
      { path: '/Test3', name: '测试3', component: Test3 },
      { path: '/userwork', name: '个人工作', component: Userwork },
      { path: '/inform', name: '通知', component: Inform },
      { path: '/work', name: '工作', component: Work },
      { path: '/calendar', name: '日历', component: Calendar },
      { path: '/todolist', name: '待办', component: Todolist },
      { path: '/complaint', name: '投诉', component: Complaint }

      // { path: '/rights', name: 'rights', component: Rights },
      // { path: '/categories', name: 'categories', component: Categories },
      // { path: '/goods', name: 'goods', component: Goods },
      // {
      //   path: '/goods-add',
      //   name: 'goods-add',
      //   component: () => import(/* webpackChunkName: 'products' */'./components/products/GoodsAdd.vue')
      // }
    ]
  }
]// to 到哪去
// from 从哪来
// next(方法) 是否放行, next()放行,    拦截: next('/login')
// to 如果是去登陆页, 不需要拦截,
// 如果有票, 有token, 也不需要拦截
// 其他情况, 一律拦截到登录

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // console.log(to)
  const userInfos = localStorage.getItem('userInfos')
  if (to.path === '/login' || userInfos) {
    next()
  } else {
    next('/login')
  }
})

export default router
