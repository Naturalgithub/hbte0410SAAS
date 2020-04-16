<template>
  <div id="login" class="login">
    <div class="logintop">
      <div class="logoleft">
        <a href="http://hbtetech.com/">
          <img src="@/assets/img/logo2.png" alt />
        </a>
      </div>
      <div class="logocenter">
        <span style="padding-left:40px;">Information Highway</span>
      </div>
    </div>
    <!-- <div class="toplogo">
      <img :src="denglvyelogo" alt>
      {{denglvyemiaoshu}}
    </div>-->
    <div class="erweima">
      <ul>
        <li @click="guandingding" :style="{borderBottom:threeo}">
          <a href="##" class="gang">账号登录</a>
        </li>
        <li @click="dingding" :style="{borderBottom:three}">
          <a href="##">钉钉二维码登录</a>
        </li>
      </ul>
      <div class="zhanghaolvru" v-if="erweimaif==false">
        <el-input class="input" placeholder="请输入员工号" v-model="loginForm.username"></el-input>
        <el-input
          style="margin-top:20px;margin-bottom:10px"
          class="input"
          placeholder="请输入密码"
          v-model="loginForm.password"
          @keyup.enter="submitForm"
          show-password
        ></el-input>
        <el-checkbox style="margin-top:20px" v-model="keepPassword" text-color="#ffffff">记住密码</el-checkbox>
        <!-- <p class="gonghaoshuoming">请输入密码</p> -->
        <button @click="submitForm">让我们一起开始吧!</button>
        <p style="color:black;font-size:14px; position:absolute;left:12%;top:80%">首次登录，请用钉钉扫二维码。</p>
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
      keepPassword: false,
      denglvyelogo: '',
      denglvyemiaoshu: '',
      erweimaif: false,
      three: '',
      threeo: '5px solid rgb(227, 114, 46)',
      dialogVisible: false,
      // smdl: true,
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  created () {

  },
  methods: {

    guandingding () {
      this.erweimaif = false
      this.threeo = '5px solid rgb(227, 114, 46)'
      this.three = ''
    },
    dingding () {
      this.erweimaif = true
      console.log(2)
      this.three = '5px solid rgb(227, 114, 46)'
      this.threeo = ''
    },
    async submitForm () {
      console.log(22)
      if (this.loginForm.password === '' || this.loginForm.username === '') {
        this.$message.error('员工号和密码不为空!')
      } else {
        const { data } = await this.$http.get('hbte-saas-web/hbte/login', { jobnumber: this.loginForm.username, passwd: this.loginForm.password })
        // alert(data)
        console.log(data)
        if (data.code === 0) {
          this.$message.success('登录成功!')
          localStorage.setItem('userInfos', JSON.stringify(data.data))
          if (this.keepPassword) {
            localStorage.setItem('keepPassword', JSON.stringify(this.loginForm))
          } else {
            localStorage.removeItem('keepPassword')
          }
        } else {
          this.$message.error(data.errorMsg)
        }
      }
      this.$router.push({ path: '/index' })
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
<style lang="scss" scoped>
body {
  height: 331px;
}
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  // background-color: red;
  background-color: rgb(255, 255, 255);
  // background-color: #ccc;
}
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
  // background-color: rgb(45, 58, 75);
}
.erweima {
  margin-top: 10px;
  height: 400px;
  width: 380px;
  position: relative;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;

  ul {
    width: 100%;
    li:nth-child(1) {
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }
    li:nth-child(2) {
      border-right: 1px solid #ccc;
      // width: 51%;
      // width: 195px;
    }
    li {
      box-sizing: border-box;
      float: left;
      width: 50%;
      height: 50px;
      line-height: 50px;
      background: #fff;
      border-top: 1px solid #ccc;
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
      }
      .gang {
        // border-right: 1px solid #ccc;
      }
    }
  }

  .login_content {
    border: 1px solid #ccc;
    box-sizing: border-box;
    border-top: none;
    display: block;
    position: absolute;
    height: 331px;
    width: 380px;
    top: 50px;
  }
  .zhanghaolvru {
    // box-sizing: border-box;
    border: 1px solid #ccc;
    border-top: none;
    display: block;
    position: relative;
    top: 50px;
    padding: 0 50px 50px;
    height: 280px;
    // background-color: green;

    p {
      padding: 0px 0px 0px 5px;
      margin: 0px;
      position: relative;
      top: 7px;
      font-size: 12px;
    }
    button {
      // margin-left: 0px;
      margin-top: 15px;
      border: none;
      width: 100%;
      padding: 3px 0;
      width: 280px;
      line-height: 30px;
      // -webkit-border-radius: 5px;
      // -moz-border-radius: 5px;
      // border-radius: 5px;
      display: block;
      color: #ffffff;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      // border: 1px solid #886f1f;
      background-color: rgb(227, 114, 46);
    }
  }
}
.toplogo {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  // width: 500px;
  height: 50px;
  // background-color: red;
  font-size: 35px;
  color: rgb(227, 114, 46);
  img {
    width: 100px;
    height: 45px;
    vertical-align: middle;
  }
}
.logintop {
  height: 50px;
  width: 100%;
  // padding: 5px 30px 0;
  background-color: rgb(227, 114, 46);
  .logoleft {
    float: left;
    padding: 2px 30px 0;
    img {
      // width: 100px;
      height: 45px;
    }
  }
  .logocenter {
    // overflow: hidden;
    padding-right: 230px;
    text-align: center;
    font-size: 24px;
    color: #fff;
    line-height: 50px;
  }
}
</style>
