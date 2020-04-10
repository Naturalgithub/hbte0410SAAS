// 前期暂时先封装几个常用的,后期遇到fu用的方法再封装
const getTreeData = (data) => {
  // 循环遍历json数据  注明
  for (var i = 0; i < data.length; i++) {
    if (data[i].children.length < 1) {
      // children若为空数组，则将children设为undefined
      data[i].children = undefined
    } else {
      // children若不为空数组，则继续 递归调用 本方法
      getTreeData(data[i].children)
    }
  }
  return data
}
// 取数组的最后一项
const lastArr = (data) => {
  return data.filter((item, index, arr) => {
    return index !== arr.length - 1
  })
}
// 数字加千分符号
const addComma = (num) => {
  var parts = num.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}
// 当前时间封装
const nowTime = () => {
  var myDate = new Date()
  myDate.getYear() // 获取当前年份(2位)
  let nowYear = myDate.getFullYear() // 获取完整的年份(4位,1970-????)
  let nowMonth = myDate.getMonth() + 1 // 获取当前月份(0-11,0代表1月)
  let nowDate = myDate.getDate() // 获取当前日(1-31)

  let nowDay = myDate.getDay() + 1 // 获取当前星期X(0-6,0代表星期天)
  myDate.getTime() // 获取当前时间(从1970.1.1开始的毫秒数)
  let nowHours = myDate.getHours()
  let nowMinutess = myDate.getMinutes()
  myDate.getHours() // 获取当前小时数(0-23)
  myDate.getMinutes() // 获取当前分钟数(0-59)
  myDate.getSeconds() // 获取当前秒数(0-59)
  myDate.getMilliseconds() // 获取当前毫秒数(0-999)
  myDate.toLocaleDateString() // 获取当前日期
  var mytime = myDate.toLocaleTimeString() // 获取当前时间
  myDate.toLocaleString() // 获取日期与时间
  // eslint-disable-next-line no-unused-expressions
  nowMonth = nowMonth < 10 ? `0${nowMonth}` : nowMonth
  return { nowMonth, nowYear, nowDay, nowDate, nowHours, nowMinutess }
}
// 设置disabele属性 第几级开始不能别选中
const setDisable = (count, data, maxNum) => {
  if (count > maxNum) { // 最多几级就写几
    data.forEach(v => {
      v.disabled = true // 超过设定的最大级数,给这一集的数据添加disabled属性
    })
  } else {
    data.forEach(v => {
      if (v.childs && v.childs.length) {
        count++
        this.setDisable(count, v.childs, maxNum)
      }
    })
  }
}
const HBTE_API = {
  setDisable,
  getTreeData,
  lastArr,
  addComma,
  nowTime
}
export default HBTE_API
