<!-- this is index -->
<template>
  <div class="index">
    <el-container class="index">
      <el-container>
        <el-drawer :show-close="false" size="20%" :visible.sync="drawer" :direction="direction">
          <div class="drawercontainer">
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
        </el-drawer>
        <el-aside width="60px" class="aside">
          <div>
            <div class="headLogo" @click="drawer = true">
              <img :src="userInfos.avatar" alt />
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
                <span
                  class="iconstyle"
                  :style="{color:'work'==$store.state.asideStatus?'#fff':'rgba(255,255,255,0.5)'}"
                  @click="work"
                >
                  <i class="el-icon-menu"></i>
                  <p>工作</p>
                </span>
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
  </div>
</template>

<script>
// import navMain from './navMain'

export default {
  // components: { navMain },
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
        title: 'Test1',
        name: '/Test1',
        content: 'Tab 1 content'
      }, {
        title: 'Test2',
        name: '/Test2',
        content: 'Tab 2 content'
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
      console.log(v.name)
      this.$router.push(v.name)
    },
    handleTabsEdit (targetName, action) {
      if (action === 'add') {
        let newTabName = ++this.tabIndex + ''
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        })
        this.editableTabsValue = newTabName
      }
      if (action === 'remove') {
        let tabs = this.editableTabs
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
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
      this.$router.push('./Test1')
    },
    inform () {
      this.$store.commit('changeAsideStatus', 'inform')
      this.$router.push('./Test2')
    },
    work () {
      this.$store.commit('changeAsideStatus', 'work')
      this.$router.push('./Test3')
    },
    calendar () {
      this.$store.commit('changeAsideStatus', 'calendar')
    },
    todolist () {
      this.$store.commit('changeAsideStatus', 'todolist')
    },
    complaint () {
      this.$store.commit('changeAsideStatus', 'complaint')
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
//@import url(); 引入公共css类
// .witer {
//   color: ;
// }
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
    top: -50px;
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
    position: absolute;
    top: 30px;
    border-bottom: 1px solid #ccc;
  }
}
.darwerfooter {
  width: 85%;
  font-size: 14px;
  padding: 20px;
  position: absolute;
  top: 230px;
  border-bottom: 1px solid #ccc;
}
.darwerfooterlast {
  width: 85%;
  font-size: 14px;
  padding: 20px;
  position: absolute;
  top: 320px;
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
</style>
