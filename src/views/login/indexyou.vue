<template>
  <div id="login" class="login">
    <div class="erweima">
      <p>HBTE-信息高速公路</p>
      <ul>
        <li @click="guandingding" :style="{borderBottom:threeo}">
          <a href="##">账号登录</a>
        </li>
        <li @click="dingding" :style="{borderBottom:three}">
          <a href="##">钉钉二维码登录</a>
        </li>
      </ul>
      <div class="zhanghaolvru" v-if="erweimaif==false">
        <input type="text" placeholder="请输入工号" v-model="loginForm.username">
        <!-- <p class="gonghaoshuoming">请输入工号</p> -->
        <input
          type="password"
          placeholder="请输入密码"
          @keyup.enter="submitForm"
          v-model="loginForm.password"
        >
        <!-- <p class="gonghaoshuoming">请输入密码</p> -->
        <button @click="submitForm">立即登录</button>
        <p style="color:black; position:absolute;left:15%;top:80%">
          <span style="color:red">注：</span>首次登陆请扫二维码
        </p>
      </div>
      <div id="login_content" class="login_content" v-show="erweimaif"></div>
    </div>
  </div>
</template>

<script>
import '../../assets/dingdingerweima'
export default {
  data () {
    return {
      erweimaif: false,
      three: '',
      threeo: '',
      dialogVisible: false,
      // smdl: true,
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // getLoginInfo () {},
    guandingding () {
      this.erweimaif = false
      this.threeo = '5px solid #36a7f4'
      this.three = ''
    },
    dingding () {
      this.erweimaif = true
      console.log(2)
      this.three = '5px solid #36a7f4'
      this.threeo = ''
    },
    async submitForm () {
      console.log(22)
      // this.$router.push({ path: '/' })

      let that = this
      // that.$router.push('/')
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        this.$message({
          showClose: true,
          message: '账号或密码不能为空',
          type: 'error'
        })
        return false
      } else {
        // 将 username 设置为 token 存储在 store，仅为测试效果，实际存储 token 以后台返回为准
        const { data } = await that.$axios.post('hbte-dingding/login', {
          userId: that.loginForm.username,
          passwd: that.loginForm.password
        })
        console.log(that.loginForm)

        console.log(data)
        if (data.code == '-1') {
          this.$message.error(data.message)
        } else {
          window.localStorage.setItem(
            'data',
            JSON.stringify({
              userName: data.result.name,
              userId: data.result.userid
            })
          )
          that.$store
            .dispatch('setToken', that.loginForm.username)
            .then(() => {
              that.$router.push({ path: '/' })
            })
            .catch(res => {
              that.$message({
                showClose: true,
                message: res,
                type: 'error'
              })
            })
        }
      }
    }
    // message () {
    //   const h = this.$createElement
    //   this.$notify({
    //     title: '账号密码',
    //     message: h(
    //       'i',
    //       { style: 'color: teal' },
    //       '账号密码可以随意填写，为了测试效果填写的账号将会被存储为临时假 token'
    //     ),
    //     duration: 6000
    //   })
    // }
  }
  // mounted () {
  //   this.message()
  // }
}
</script>
<style lang="scss">
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  // background-color: red;
  background-color: rgb(45, 58, 75);
}
body {
  // background-color: rgb(45, 58, 75);
}
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
  // background-color: rgb(45, 58, 75);
}
.erweima {
  margin-top: 100px;
  height: 400px;
  width: 380px;
  position: relative;
  // top: -50%;
  left: 70%;
  background-color: #fff;
  p {
    position: absolute;
    top: 20px;
    left: -200%;
    font-weight: 700;
    font-size: 34px;
    color: #fff;
  }
  ul {
    width: 100%;
    li {
      box-sizing: border-box;
      float: left;
      width: 50%;
      height: 50px;
      line-height: 50px;
      background: #fff;
      border-bottom: 1px solid #ccc;
      text-align: center;
      a {
        display: inline-block;
        width: 100%;
        height: 40px;
        line-height: 40px;
        // border-bottom: 10px solid rgb(14, 65, 231);
        box-sizing: border-box;
        color: #7e8185;
        border-right: 1px solid #ccc;
      }
    }
  }

  .login_content {
    display: block;
    position: absolute;
    top: 63px;
  }
  .zhanghaolvru {
    display: block;
    position: relative;
    top: 63px;
    padding: 0 50px 50px;
    height: 280px;
    // background-color: green;
    input {
      margin-left: 12px;
      width: 243px;
      height: 22px;
      line-height: 22px;
      background-color: #eef3f8;
      border: 1px solid #bac5d4;
      color: #92a4bf;
      padding: 5px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    p {
      padding: 0px 0px 0px 5px;
      margin: 0px;
      position: relative;
      top: 7px;
      font-size: 12px;
    }
    button {
      margin-left: 12px;
      border: none;
      padding: 3px 0;
      width: 255px;
      line-height: 30px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      display: block;
      color: #ffffff;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      border: 1px solid #3790cc;
      background-color: #3b9bdc;
    }
  }
}
</style>
