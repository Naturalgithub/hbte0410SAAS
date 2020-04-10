import $ from 'jquery'
import 'jquery.cookie'
$(function () {
  // var url = encodeURIComponent('http://hbte.vaiwan.com/hbte-dingding')
  var url = encodeURIComponent('http://47.98.145.222:8080/hbte-dingding/login')
  var obj = DDLogin({
    id: 'login_content', // 这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
    goto: encodeURIComponent('https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoaxe375t2hpwyjn7yp&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=' + url), // 请参考注释里的方式
    // goto: encodeURIComponent('https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoa5zqcexnevugli82w&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=' + url), // 请参考注释里的方式
    style: 'border:none;background-color:#FFFFFF;',
    width: '378',
    height: '400'
  })

  var request = {}

  request.success = function (data) {
    console.log(data)
    if (data.result === 'ok') {
      console.log('request success.')
    }
  }

  request.error = function (data) {
    console.log('request failed.')
  }

  var handleMessage = function (event) {
    var origin = event.origin
    console.log('origin', event.origin)
    if (origin === 'https://login.dingtalk.com') { // 判断是否来自ddLogin扫码事件。
      var loginTmpCode = event.data // 拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
      console.log('loginTmpCode', loginTmpCode)

      request.url = 'http://47.98.145.222:8080/hbte-dingding/login?code=' + loginTmpCode
      // request.url = 'http://hbte.vaiwan.com/hbte-dingding/login?code=' + loginTmpCode
      console.log(request.url)
      // const aa = this.$axios.get(request.url)
      // console.log(aa)
      // 1111
      // window.location.href =
      //   'https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoaxe375t2hpwyjn7yp&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=' + url + '&loginTmpCode=' + loginTmpCode
      let aa = 'https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoaxe375t2hpwyjn7yp&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=' + url + '/login' + '&loginTmpCode=' + loginTmpCode

      // $.get(aa, function (res) {
      //   console.log(res)
      // })
      // $.ajaxGet(request)
      console.log(555)
      // document.write('加载中...')

      $.ajax({
        type: 'GET',
        url: aa,
        data: {
          'code': loginTmpCode
        },
        dataType: 'jsonp',
        jsonpCallback: 'callback',
        success: function (data) {
          console.log(JSON.stringify(data))
          console.log(data.code)

          if (data.code === '0') {
            // localStorage.setItem('data', JSON.stringify(this.personInfo))

            window.localStorage.setItem('data', JSON.stringify({ jobnumber: data.result.jobnumber, userName: data.result.name, avatar: data.result.avatar, isSysAdmin: data.result.isSysAdmin, id: data.result.id }))
            localStorage.setItem('asidedata', JSON.stringify({ aside: 'menhu' }))
            // $.cookie('token', null)
            $.cookie('token', data.result.name, { expires: 1 / 24, path: '/' })

            // document.cookie = 'token'
            window.location.href = 'index.html'
          } else {
            // this.$message.error('登录失败，请联系管理员')
            console.log(22)
          }
        }
      })
    }
  }
  if (typeof window.addEventListener !== 'undefined') {
    window.addEventListener('message', handleMessage, false)
  } else if (typeof window.attachEvent !== 'undefined') {
    window.attachEvent('onmessage', handleMessage)
  }
})
