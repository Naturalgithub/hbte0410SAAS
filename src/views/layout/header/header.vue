<template>
  <div>
    <el-header id="header" style="background-color:rgb(227, 114, 46)">
      <span class="hideAside">
        <i
          v-show="this.$store.state.isMobile"
          @click="$store.commit('ishowaside')"
          class="fa fa-indent fa-lg"
          style="color:#fff"
        ></i>
      </span>
      <ul class="personal">
        <!-- <li>你好，{{ruleForm.userName}}！</li> -->
        <li style="margin-right:5px">
          <el-dropdown @command="handleCommanddropdown" trigger="click">
            <img :src="pic" alt />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click="changepw" command="changepw">修改密码</el-dropdown-item>
              <el-dropdown-item @click="logout" command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>

        <!-- <li>{{ $t(`role.${this.$store.getters.info.role}`) }}</li> -->
        <!-- <li>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              logo
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">{{ $t('userDropdownMenu.basicInfor') }}</el-dropdown-item>
              <el-dropdown-item command="b">{{ $t('userDropdownMenu.changePassword') }}</el-dropdown-item>
              <el-dropdown-item command="logout" divided>{{ $t('userDropdownMenu.logout') }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>-->
        <!-- <li class="icon">
          <img :src="avatar">
        </li>-->
      </ul>
    </el-header>
    <tabNav></tabNav>
    <el-dialog
      class="demo-ruleForm"
      title="修改密码"
      status-icon
      ref="ruleForm"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="ruleForm" :model="ruleForm" label-width="80px">
        <el-form-item label="用户名" style="margin-bottom:20px;">
          <el-input v-model="ruleForm.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="工号" style="margin-bottom:20px;">
          <el-input v-model="ruleForm.userId" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" style="margin-bottom:20px">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="ruleForm.checkpassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="btnone" @click="dialogVisible = false">取 消</el-button>
        <el-button class="btntwo" @click="tijiaoxinxi" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import langSelect from '../../../components/lang/langSelect'
import tabNav from './tabNav'

export default {
  name: 'Header',
  components: { tabNav, langSelect },
  data () {
    return {
      pic: '',
      screenWidth: document.body.clientWidth,
      avatar: './static/images/icon.jpg',
      dialogVisible: false,
      isshowbtn: false,
      ruleForm: {
        // name: '',
        userName: '',
        userId: '',
        password: '',
        checkpassword: '',
        avatar: '',
        isSysAdmin: '',
        id: ''
      }
    }
  },
  created () {
    this.getName()
    this.getPersonpic()
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
  },
  watch: {
    screenWidth (val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(function () {
          // 打印screenWidth变化的值
          console.log(that.screenWidth)
          // console.log(that.$store.state.showasidebtn)
          this.isshowbtn = that.$store.state.showasidebtn

          if (that.screenWidth < 1000) {
            that.isshowbtn = true
            // that.$store.commit('changepinmu')
          } else {
            that.isshowbtn = false
            // that.$store.commit('changepinmu')
          }
          that.timer = false
        }, 400)
      }
    }
  },
  computed: {},
  methods: {
    getPersonpic () {
      const data = JSON.parse(localStorage.getItem('data'))
      // console.log(data)
      this.pic = data.avatar
    },
    getName () {
      const data = JSON.parse(localStorage.getItem('data'))
      // console.log(data)
      this.ruleForm.userId = data.jobnumber
      this.ruleForm.id = data.id
      this.ruleForm.userName = data.userName
    },
    collapse () {
      this.$store.dispatch('collapse')
    },
    fullScreen () {
      if (this.isfullScreen) {
        var docElm = document.documentElement
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen()
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen()
        }
        this.isfullScreen = false
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
        this.isfullScreen = true
      }
    },
    handleCommand (command) {
      if (command === 'logout') {
        Cookies.remove('token')
        location.reload()
      }
    },
    logout () {
      console.log(1)

      this.$confirm('确认退出吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // this.$router.push('/')
          // this.router.go(-1)
          // console.log(22)
          localStorage.removeItem('data')
          localStorage.removeItem('asidedata')
          Cookies.remove('token', { path: '/' })
          // Cookies.remove('token')
          location.reload()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    changepw () {
      this.dialogVisible = true
    },
    async tijiaoxinxi () {
      if (this.ruleForm.password !== this.ruleForm.checkpassword) {
        this.$message.error('修改失败,两次密码不一样')
        return
      }
      if (this.ruleForm.password != '') {
        const aa = await this.$axios.post('hbte-dingding/user/update', {
          id: this.ruleForm.id,
          passwd: this.ruleForm.password
        })
        console.log(aa.data.code)
        if (aa.data.code === '0') {
          this.$message.success('修改成功')
          this.dialogVisible = false
          this.ruleForm.userId = ''
          this.ruleForm.password = ''
          this.ruleForm.checkpassword = ''
        } else {
          this.$message.error('data.error')
          this.dialogVisible = false
        }
      } else {
        this.$message.error('修改失败,密码不为空')
        this.dialogVisible = false
      }
      this.getName()
    },
    handleCommanddropdown (command) {
      // this.$message('click on item ' + command)
      if (command === 'changepw') {
        this.changepw()
      } else if (command === 'logout') {
        this.logout()
      }
    }
  }
}
</script>

<style lang="scss">
.item{
  margin-top: 10px；
  margin-rignt： 40px;
}


$top: top;
$bottom: bottom;
$left: left;
$right: right;
$leftright: ($left, $right);
%w100 {
  width: 100%;
}

%h100 {
  height: 100%;
}

%cursor {
  cursor: pointer;
}

html,
body,
#app,
.el-container,
#asideNav,
ul.el-menu {
  @extend %h100;
}

@mixin set-value($side, $value) {
  @each $prop in $leftright {
    #{$side}-#{$prop}: $value;
  }
}

#header {
  max-height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  .hideAside {
    @extend %cursor;
  }
  .personal {
    display: flex;
    flex-direction: row;
    li {
      @include set-value(margin, 5px);
      font-size: 12px;
      color: #fff;
      cursor: pointer;
      img {
        // padding-top: 5px;
        margin-top: 5px;
        // border: 2px solid #ccc;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .fullScreen {
      @extend %cursor;
    }
    .el-dropdown-link {
      @extend %cursor;
    }
    .icon img {
      margin-#{$top}: 7px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      width: 40px;
      height: 40px;
    }
  }
}
</style>
<style lang='scss' scoped>
.el-dropdown-menu {
  top: 38px !important;
}
</style>
