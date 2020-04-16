import axios from 'axios'
// import service from './reqURLPool'
// import store from '../../store/index'
// service 循环遍历输出不同的请求方法

// let instance = axios.create({
//   // baseURL: 'http://47.98.145.222:8080/',
//   // baseURL: 'http://192.168.2.156:8080/',
//   baseURL: store.state.baseURL,
//   timeout: 500000000000000
// })
// const get = (url, passget) => {
//   // console.log(url, passget)
//   // return
//   // let temp = { ...data }
//   instance.get(url, {
//     params: passget
//   }).then(function (response) {
//     console.log(response)
//     return response
//   })
//     .catch(function (error) {
//       alert(error)
//     })
// }
const get = (url, passget) => {
  const data = axios.get(url, { params: passget })
  return data
}
const post = (url, passget) => {
  const data = axios.get(url, passget)
  return data
}
// const post = (url, passget) => {
//   console.log(url, passget)
//   // return
//   // let temp = { ...data }
//   instance.post(url, passget)
//     .then(function (response) {
//       return response
//     })
//     .catch(function (error) {
//       alert(error)
//     })
// }

// const Http = {
//   get: (url, passget) => {
//     // console.log(url, passget)
//     // return
//     // let temp = { ...data }
//     instance.get(url, {
//       params: passget
//     }).then(function (response) {
//       console.log(response)
//       return response
//     })
//       .catch(function (error) {
//         alert(error)
//       })
//   },
//   post: (url, passget) => {
//     console.log(url, passget)
//     // return
//     // let temp = { ...data }
//     instance.post(url, passget)
//       .then(function (response) {
//         return response
//       })
//       .catch(function (error) {
//         alert(error)
//       })
//   }
// }

// 执行多个并发请求

// function getUserAccount () {
//   return axios.get('/user/12345');
// }

// function getUserPermissions () {
//   return axios.get('/user/12345/permissions');
// }

// axios.all([getUserAccount(), getUserPermissions()])
//   .then(axios.spread(function (acct, perms) {
//     // 两个请求现在都执行完成
//   }));
// // 包裹请求方法的容器

// // 请求格式/参数的统一
// for (let key in service) {
//   let api = service[key] // url method
//   // async 作用：避免进入回调地狱
//   Http[key] = async function (
//     params, // 请求参数 get：url，put，post，patch（data），delete：url
//     isFormData = false, // 标识是否是form-data请求
//     config = {} // 配置参数
//   ) {
//     let newParams = {}

//     //  content-type是否是form-data的判断
//     if (params && isFormData) {
//       newParams = new FormData()
//       for (let i in params) {
//         newParams.append(i, params[i])
//       }
//     } else {
//       newParams = params
//     }
//     // 不同请求的判断
//     let response = {} // 请求的返回值
//     if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
//       try {
//         response = await instance[api.method](api.url, newParams, config)
//       } catch (err) {
//         response = err
//       }
//     } else if (api.method === 'delete' || api.method === 'get') {
//       config.params = newParams
//       try {
//         response = await instance[api.method](api.url, config)
//       } catch (err) {
//         response = err
//       }
//     }
//     return response // 返回响应值
//   }
// }

// // 拦截器的添加
// // 请求拦截器
// instance.interceptors.request.use(config => {
//   // 发起请求前做些什么
//   return config
// }, () => {
//   // 请求错误
//   alert('请求错误，请求稍后重试')
// })
// // 响应拦截器
// instance.interceptors.response.use(res => {
//   // 请求成功
//   return res.data
// }, () => {
//   alert('请求错误，请求稍后重试')
// })
const Http = {
  get,
  post
}
export default Http
