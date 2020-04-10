<template>
  <div id="login" class="login">
    <div class="logintop">
      <div class="logoleft">
        <a href="http://hbtetech.com/">
          <img :src="denglvyelogo" alt>
        </a>
      </div>
      <div class="logocenter">{{denglvyemiaoshu}}</div>
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
        <input type="text" placeholder="请输入员工号" v-model="loginForm.username">
        <!-- <p class="gonghaoshuoming">请输入工号</p> -->
        <input
          type="password"
          placeholder="请输入密码"
          @keyup.enter="submitForm"
          v-model="loginForm.password"
        >
        <!-- <p class="gonghaoshuoming">请输入密码</p> -->
        <button @click="submitForm">让我们一起开始吧!</button>
        <p
          style="color:black;font-size:14px; position:absolute;left:15%;top:80%"
        >&nbsp;首次登录，请用钉钉扫二维码。</p>
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
    this.getdenglvyelogo()
  },
  methods: {
    async getdenglvyelogo () {
      const { data } = await this.$axios('hbte-dingding/home/list', {
        params: { page: this.page, pageSize: this.pageSize }
      })
      console.log(data.result.homeInfos[0].loginDescribe)
      this.denglvyelogo =
        `http://47.98.145.222:8080/` + data.result.homeInfos[0].loginImgPath
      this.denglvyemiaoshu = data.result.homeInfos[0].loginDescribe
      localStorage.setItem('asidedata', JSON.stringify({ aside: 'menhu' }))
    },
    // getLoginInfo () {},
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
              // userId: data.result.userid,
              avatar: data.result.avatar,
              isSysAdmin: data.result.isSysAdmin,
              id: data.result.id,
              jobnumber: data.result.jobnumber
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
    input {
      margin-left: 12px;
      width: 243px;
      height: 22px;
      line-height: 22px;
      background-color: #eef3f8;
      border: 1px solid #bac5d4;
      color: #92a4bf;
      padding: 10px;
      -webkit-border-radius: 0px;
      -moz-border-radius: 0px;
      border-radius: 0px;
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
      margin-top: 15px;
      border: none;
      padding: 3px 0;
      width: 265px;
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
