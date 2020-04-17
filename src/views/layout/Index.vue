<!-- this is index -->
<template>
  <div class="index">
    <el-container class="index">
      <el-container>
        <!-- <el-drawer :show-close="false" size="20%" :visible.sync="drawer" :direction="direction"></el-drawer> -->
        <el-aside width="60px" class="aside">
          <div>
            <div class="headLogo">
              <el-popover placement="right" width="280" trigger="click" :visible-arrow="false">
                <!-- <el-button slot="reference">click 激活</el-button> -->
                <div class="drawercontainer headPopover">
                  <div class="darwerheader">
                    <div class="fl">
                      <p>James</p>
                      <p>工作状态</p>
                    </div>
                    <div class="fr">
                      <div>
                        <img :src="userInfos.avatar" alt />
                      </div>
                    </div>
                  </div>
                  <div class="darwermain">
                    <p style="font-size:20px;margin-bottom:10px">上海法臣电子有限公司</p>
                    <p>
                      <span class="minwidth30">姓名</span>
                      <span>james</span>
                    </p>
                    <p>
                      <span class="minwidth30">电话</span>
                      <span>152525252525</span>
                    </p>
                    <p>
                      <span class="minwidth30">邮箱</span>
                      <span>123569485720@qq.com</span>
                    </p>
                    <p>
                      <span class="minwidth30">部门</span>
                      <span>研发部</span>
                    </p>
                    <p>
                      <span class="minwidth30">职位</span>
                      <span>前端</span>
                    </p>
                    <p>
                      <span class="minwidth30">办公地点</span>
                      <span>上海</span>
                    </p>
                    <span>
                      <span class="minwidth30">工号</span>
                      <span>00601</span>
                    </span>
                  </div>
                  <div class="darwerfooter">
                    <p>
                      <el-link type="primary" @click="dialogVisible=true">修改密码</el-link>
                    </p>
                    <p style="margin-top:10px">
                      <el-link type="primary">后台管理</el-link>
                    </p>
                  </div>
                  <div class="darwerfooterlast">
                    <el-link type="primary" @click="loginout">退出登录</el-link>
                  </div>
                </div>
                <img :src="userInfos.avatar" slot="reference" alt />
              </el-popover>
            </div>
            <div class="midOptions">
              <div class="mt20px">
                <span
                  class="iconstyle"
                  :style="{color:'userwork'==$store.state.asideStatus?'#fff':'rgba(255,255,255,0.5)'}"
                  @click="userwork"
                >
                  <i class="el-icon-user-solid"></i>
                  <p>个人办公</p>
                </span>
              </div>
              <div class="mt20px">
                <span
                  class="iconstyle"
                  :style="{color:'inform'==$store.state.asideStatus?'#fff':'rgba(255,255,255,0.5)'}"
                  @click="inform"
                >
                  <i class="el-icon-bell"></i>
                  <p>通知</p>
                </span>
              </div>
              <div class="mt20px">
                <el-popover placement="right" width="280" trigger="click" :visible-arrow="false">
                  <div class="workPopover">
                    <div class="workPopoverHead">
                      <p>常用应用</p>
                      <el-link type="primary">审批</el-link>
                      <el-link type="primary">任务</el-link>
                      <el-link type="primary">问题投诉</el-link>
                      <el-link type="primary">QA</el-link>
                      <el-link type="primary">晨会</el-link>
                      <el-link type="primary">
                        <router-link to="./inform">通知</router-link>
                      </el-link>
                    </div>
                    <div class="workPopoverFooter">
                      <p>部门应用</p>
                      <el-link type="primary">软件系统</el-link>
                      <el-link type="primary">财务系统</el-link>
                      <el-link type="primary" to="./inform">品管系统</el-link>
                      <el-link type="primary">销售商务</el-link>
                      <el-link type="primary">行政人事</el-link>
                    </div>
                  </div>
                  <span
                    slot="reference"
                    class="iconstyle"
                    :style="{color:'work'==$store.state.asideStatus?'#fff':'rgba(255,255,255,0.5)'}"
                    @click="work"
                  >
                    <i class="el-icon-menu"></i>
                    <p>工作</p>
                  </span>
                </el-popover>
              </div>
            </div>
          </div>
          <!-- 底部选项 -->
          <div class="iconbottom">
            <div class="mt20px">
              <span
                class="iconstyle"
                :style="{color:'calendar'==$store.state.asideStatus?'#fff':'rgba(255,255,255,0.5)'}"
                @click="calendar"
              >
                <i class="el-icon-date"></i>
                <p>日历</p>
              </span>
              <div>
                <span></span>
              </div>
            </div>
            <div class="mt20px">
              <span
                class="iconstyle"
                :style="{color:'todolist'==$store.state.asideStatus?'#fff':'rgba(255,255,255,0.5)'}"
                @click="todolist"
              >
                <i class="el-icon-menu"></i>
                <p>待办</p>
              </span>
              <div>
                <span></span>
              </div>
            </div>
            <div class="mt20px">
              <span
                class="iconstyle"
                :style="{color:'complaint'==$store.state.asideStatus?'#fff':'rgba(255,255,255,0.5)'}"
                @click="complaint"
              >
                <i class="el-icon-service"></i>
                <p>投诉</p>
              </span>
              <div>
                <span></span>
              </div>
            </div>
          </div>
        </el-aside>
        <el-main>
          <el-tabs
            v-model="editableTabsValue"
            @tab-click="tabclick"
            type="card"
            editable
            @edit="handleTabsEdit"
          >
            <el-tab-pane
              :key="item.name"
              v-for="(item) in editableTabs"
              :label="item.title"
              :name="item.name"
            ></el-tab-pane>
          </el-tabs>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <vdialog
      :dialogVisible="dialogVisible"
      @cancel="dialogVisible=false"
      @sure="commitPassword"
      title="修改密码"
    >
      <el-form ref="passwordForm" :model="passwordForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="passwordForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="passwordForm.jobnumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="修改密码">
          <el-input v-model="passwordForm.password1" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="passwordForm.password2" type="password"></el-input>
        </el-form-item>
      </el-form>
    </vdialog>
    <div style="width:100%">
      <div class="help" slot="reference" v-drag>
        <!-- <el-tooltip class="item" effect="dark" placement="top"> -->
        <el-dropdown placement="left" trigger="click">
          <i>
            <img src="../../assets/icon/help.svg" alt />
          </i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <a href="http://47.98.145.222:8080/help/financeSystem/#/" target="_blank">财务帮助文档</a>
            </el-dropdown-item>
            <el-dropdown-item>取消</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- </el-tooltip> -->
      </div>
    </div>
  </div>
</template>

<script>
// import navMain from './navMain'
import router from '../../router/index'
export default {
  // components: { navMain },
  // 自定义指令
  directives: {
    drag (el, bindings) {
      el.onmousedown = function (e) {
        var disx = e.pageX - el.offsetLeft
        var disy = e.pageY - el.offsetTop
        console.log(disy)

        document.onmousemove = function (e) {
          el.style.left = e.pageX - disx + 'px'
          el.style.top = e.pageY - disx + 'px'
        }
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null
        }
      }
    }
  },
  data () {
    return {
      passwordForm: {
        name: JSON.parse(localStorage.getItem('userInfos')).name,
        jobnumber: JSON.parse(localStorage.getItem('userInfos')).jobnumber,
        id: JSON.parse(localStorage.getItem('userInfos')).id,
        password1: '',
        password2: ''
      },
      dialogVisible: false,
      direction: 'ltr',
      drawer: false,
      userInfos: { avatar: '' },
      // tab栏
      pageCurrent: '',
      editableTabsValue: '/Test1',
      editableTabs: [{
        title: '个人办公',
        name: '/userwork',
        content: 'Tab 1 content'
      }],
      tabIndex: 1

    }
  },
  computed: {},
  watch: {
    $route: {
      handler (to, form = null) {
        // 当路由改变时，检测该路由是否已经在打开的页面之中，如果不在，就添加进去
        this.editableTabsValue = to.path
        // console.log(to.path)
        console.log(router.options.routes)
        let routesArr = router.options.routes

        console.log(routesArr)

        let returnedItem
        let find = function (arr, path) {
          arr.forEach((item) => {
            if (item.path === path) {
              returnedItem = item
              return item
            } else if (item.children) {
              find(item.children, path)
            }
            // else if (item.children.length > 0) {
            //   find(item.children, path)
            // }
          })
        }
        find(routesArr, this.editableTabsValue)
        console.log(returnedItem)
        let boolean = this.editableTabs.some(item => {
          return item.name === returnedItem.path
        })
        if (boolean) {
          this.editableTabsValue = returnedItem.path
        } else {
          this.editableTabs.push({
            title: returnedItem.name,
            name: returnedItem.path,
            content: 'New Tab content'
          })
          this.editableTabsValue = returnedItem.path
        }

        // console.log(this.pageCurrent)
      },
      immediate: true

    }
  },
  // 方法集合
  methods: {
    async commitPassword () {
      if (this.passwordForm.password === '' || this.passwordForm.password2 === '') {
        this.$message.error('密码输入不为空!')
      } else if (this.passwordForm.password1 !== this.passwordForm.password2) {
        this.$message.error('请确认两次输入密码是否一致!')
      } else {
        const { data } = await this.$http.post('hbte-saas-web/hbte/user/update',
          {
            id: this.passwordForm.id,
            passwd: this.passwordForm.password2
          })
        if (data.code === 0) {
          this.$message.success('修改成功')
        } else {
          this.$message.error(data.errorMsg)
        }
      }
    },
    loginout () {
      this.$confirm('确认退出？')
        .then(_ => {
          console.log(2)
          localStorage.removeItem('userInfos')
          this.$router.push('v:')
        })
        .catch(_ => { })
    },
    tabclick (v) {
      this.$store.commit('changeAsideStatus', 'v.name')
      console.log(v.name)
      this.$router.push(v.name)
    },
    handleTabsEdit (targetName, action) {
      if (action === 'add') {
        // let newTabName = ++this.tabIndex + ''
        // this.editableTabs.push({
        //   title: 'New Tab',
        //   name: newTabName,
        //   content: 'New Tab content'
        // })
        // this.editableTabsValue = newTabName
      }
      if (action === 'remove') {
        let tabs = this.editableTabs
        if (tabs.length === 1) {
          return
        }
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              // this.$router.push(tab.name)
              if (nextTab) {
                activeName = nextTab.name
                this.$router.push(nextTab.name)
              }
            }
          })
        }

        this.editableTabsValue = activeName
        this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      }
    },
    userwork () {
      this.$store.commit('changeAsideStatus', 'userwork')
      this.$router.push('./userwork')
    },
    inform () {
      this.$store.commit('changeAsideStatus', 'inform')
      this.$router.push('./inform')
    },
    work () {
      this.$store.commit('changeAsideStatus', 'work')
      // this.$router.push('./work')
    },
    calendar () {
      // this.$store.commit('changeAsideStatus', 'calendar')
      this.$store.commit('changeAsideStatus', 'calendar')
      this.$router.push('./calendar')
    },
    todolist () {
      this.$store.commit('changeAsideStatus', 'todolist')
      this.$router.push('./todolist')
    },
    complaint () {
      this.$store.commit('changeAsideStatus', 'complaint')
      this.$router.push('./complaint')
    },

    getUserInfos () {
      this.userInfos = JSON.parse(localStorage.getItem('userInfos'))
      console.log(this.userInfos)
    }
  },
  created () {
    this.getUserInfos()
  },
  mounted () {

  },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
.help {
  position: fixed;
  font-size: 30px;
  right: 10px;
  top: 90%;
  width: 50px;
  height: 50px;
  // background-color: red;
  i {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #fff;
    }
    img:hover {
      background-color: rgb(231, 228, 228);
    }
  }
}
// .item {
//   position: absolute;
//   top: 0;
//   right: 0;
// }
//@import url(); 引入公共css类
// .witer {
//   color: ;
// }
a {
  text-decoration: none;
  color: rgb(64, 184, 255) !important;
}
.workPopoverHead {
  p {
    margin-bottom: 10px;
  }
  .el-link {
    margin-left: 10px;
    margin-bottom: 10px;
  }
}
.workPopoverFooter {
  p {
    margin-bottom: 10px;
  }
  .el-link {
    margin-left: 10px;
    margin-bottom: 10px;
  }
}
.workPopover {
  width: 100%;
}
.minwidth30 {
  display: inline-block;
  width: 60px;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.drawercontainer {
  position: relative;
  // width: 100%;
  .darwerheader {
    padding: 20px;
    width: 85%;
    position: absolute;
    top: -10px;
    border-bottom: 1px solid #ccc;
    img {
      border-radius: 50%;
      border: 2px solid #fff;
      width: 50px;
      height: 50px;
      vertical-align: middle;
    }
  }
  .darwermain {
    font-size: 14px;
    padding: 20px;
    width: 85%;
    position: absolute;
    top: 80px;
    border-bottom: 1px solid #ccc;
  }
}
.darwerfooter {
  width: 85%;
  font-size: 14px;
  padding: 20px;
  position: absolute;
  top: 290px;
  border-bottom: 1px solid #ccc;
}
.darwerfooterlast {
  width: 85%;
  font-size: 14px;
  padding: 20px;
  position: absolute;
  top: 380px;
  border-bottom: 1px solid #ccc;
}
.el-aside {
  padding: 15px 10px;
  text-align: center;
  .headLogo {
    img {
      border-radius: 50%;
      border: 2px solid #fff;
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
  }
}
.index {
  height: 100%;
  .el-aside {
    background-color: rgb(216, 111, 48);
    .el-menu {
      border-right: none;
    }
  }
  .el-main {
    background-color: #fff;
  }
}
.mt20px {
  margin-top: 10px;
}
.iconstyle:hover {
  color: rgba(255, 255, 255) !important;
}
.iconstyle {
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  font-size: 20px;
  p {
    font-size: 10px;
  }
}
.min-100px {
  min-width: 100px;
}
.aside {
  position: relative;

  .iconbottom {
    position: absolute;
    // width: 20px;
    // height: 30px;
    // background-color: red;
    // top: 500px;
    bottom: 20px;
    left: 20px;
  }
}
.headPopover {
  height: 440px;
  // height: 100%;
}
</style>
