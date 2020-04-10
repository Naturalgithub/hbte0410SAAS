<template>
  <!-- 2级导航栏 -->
  <div>
    <el-aside id="asideNav"
              style>
      <div class="logo-name">
        <p v-if="$store.getters.logoShow">HBTE</p>
        <p v-else
           style="padding-left:0px">
          <a href="http://hbtetech.com/">
            <img style="margin-top:3px;"
                 src="../../../assets/logo2.png"
                 alt />
          </a>
        </p>
      </div>
      <el-menu style="width:194px;padding-right:0; border-right:1px solid #ccc"
               default-active="2"
               class="el-menu-vertical-demo"
               background-color="#fff"
               text-color="#000"
               active-text-color="#000"
               router
               unique-opened>
        <el-menu-item v-if="showmenhu"
                      class="fwww">
          <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
          <span slot="title"
                style="font-size:12px;"
                class="fww">&nbsp;&nbsp;&nbsp;&nbsp;门户主页</span>
        </el-menu-item>
        <el-submenu index="2"
                    v-if="showcaiwu">
          <template slot="title">
            <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
            <span class="fw"
                  style="font-size:12px;">&nbsp;&nbsp;&nbsp;收支系统</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="InOutWrite">收款录入</el-menu-item>
            <el-menu-item index="InOutAddWrite">付款录入</el-menu-item>
            <el-menu-item index="ApplyWrite">报销录入</el-menu-item>
            <el-menu-item index="InOutQuery">收支单据查询</el-menu-item>
            <el-menu-item v-show="ones"
                          index="PLine">产品线收支表</el-menu-item>
            <el-menu-item v-show="ones"
                          index="InOutManagement">部门收支汇总表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3"
                    v-if="showcaiwu">
          <template slot="title">
            <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
            <span style="font-size:12px"
                  class="fw">&nbsp;&nbsp;&nbsp;审批管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="ApplicationList">申请列表</el-menu-item>
            <el-menu-item index="ToDoList">
              待办事项<span v-if="toDoItem != 0"
                    class="badge">{{toDoItem}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4"
                    v-if="showcaiwu">
          <template slot="title">
            <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
            <span style="font-size:12px"
                  class="fw">&nbsp;&nbsp;&nbsp;系统设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/BudgetManagement">预算管理</el-menu-item>
            <el-menu-item index="/MoneyManagement">货币管理</el-menu-item>
            <el-menu-item index="/CustomerManagement">客户管理</el-menu-item>
            <el-menu-item index="/BankManagement">银行管理</el-menu-item>
            <el-menu-item index="/AitemLine">产品线管理</el-menu-item>
            <el-menu-item index="/SupplierManage">供应商管理</el-menu-item>
            <!-- <el-menu-item index="/DaYinBiaoGuanLi">打印表管理</el-menu-item> -->
            <el-menu-item index="/CompanyInfo">公司信息管理</el-menu-item>
            <el-menu-item index="/ItemInfo">项目信息管理</el-menu-item>
            <!-- <el-menu-item index="/aemtest">产品线管理</el-menu-item> -->
            <el-menu-item index="/AccountingItem">会计科目管理</el-menu-item>
            <el-menu-item index="/PayPal">收款信息管理</el-menu-item>
            <el-menu-item index="/DepartmentInfo">部门信息管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- <process-Menu></process-Menu> -->
        <softWareMenu></softWareMenu>
        <forumMenu></forumMenu>
        <morningMeeting></morningMeeting>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import menuTree from './menuTree'
import processMenu from './processMenu'
import softWareMenu from './software'
import forumMenu from './forum'
import morningMeeting from './morningMeeting'

export default {
  created () {
    this.getNameId()
    this.open1()
    this.getactTodoList()
  },
  data () {
    return {
      InoutwriteForm: {
        userInfo: {
          id: '',
          name: '',
          isAdmin: ''
        }
      },
      showmenhu: true,
      showcaiwu: '',
      ones: false,
      toDoItem: 0
    }
  },
  name: 'asideNav',
  components: {
    menuTree, processMenu, softWareMenu, forumMenu, morningMeeting
  },
  watch: {
    // 监听浏览器直接输入路由，将此路由添加到tabnavBox
    '$route.path': function (val) {
      this.selectmenu(val)
    }

  },
  methods: {
    getNameId () {
      const data = JSON.parse(localStorage.getItem('data'))
      this.ones = (data.isSysAdmin == 1)
    },
    open1 () {
      // 进来根据权限是否隐藏
      let temp = JSON.parse(localStorage.getItem('asidedata'))
      console.log(temp)

      this.showmenhu = temp.aside == 'menhu'
      this.showcaiwu = temp.aside == 'caiwu'
      console.log(this.showmenhu, this.showcaiwu)
    },
    async getactTodoList () {
      const userInfo = JSON.parse(localStorage.getItem('data'))
      // console.log(temp.userInfoId)
      // this.userInfoId = temp.userInfoId

      const { data } = await this.$axios.get(
        'hbte-financial/hbte/actTodo/get_count',
        {
          params: {
            id: userInfo.id,
            actTodoStatus: 0,
            eventStatus: 0
          }
        }
      )
      this.toDoItem = data.data.actTodoCount
    },

    menhu () { },
    caiwu () { },
    selectmenu (key) {
      let router = this.$store.getters.routers
      let name = ''
      let navTitle = function (path, routerARR) {
        for (let i = 0; i < routerARR.length; i++) {
          if (routerARR[i].children.length > 0 || routerARR[i].path === path) {
            if (
              routerARR[i].path === path &&
              routerARR[i].children.length < 1
            ) {
              name = routerARR[i].name
              break
            }
            navTitle(path, routerARR[i].children)
          }
        }
        return name
      }
      name = navTitle(key, router)
      this.$store.dispatch('addTab', {
        title: navTitle(key, router),
        path: key
      })
    }
  }
}
</script>

<style lang="scss">
.badge {
  margin-top: -2px;
  margin-left: 5px;
  display: inline-block;
  min-width: 10px;
  padding: 3px 5px;
  font-size: 12px;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background-color: rgb(227, 114, 46);
  border-radius: 10px;
}

$top: top;
$bottom: bottom;
$left: left;
$right: right;
%w100 {
  width: 100%;
}

%h100 {
  height: 100%;
}

%cursor {
  cursor: pointer;
}

@mixin set-value($side, $value) {
  @each $prop in $leftright {
    #{$side}-#{$prop}: $value;
  }
}

#asideNav {
  width: auto !important;
  display: flex;
  flex-direction: column;
  // border-right: solid 1px #ddc2b8;
  .logo-name {
    background-color: rgb(227, 114, 46) !important;
    @extend %w100;
    font-weight: 300;
    z-index: 999;
    p {
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      color: #fff;
    }
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    @extend %h100;
    overflow-y: scroll;
  }
  .el-menu {
    background-color: #fff !important;
    // padding-left: 0 !important;
    // margin-left: 65px;
    // margin: 1px;
    padding-left: 25px;
    flex: 1;
    overflow: inherit;
    border-right: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .el-submenu__title {
      padding-left: 35px !important;
    }
    .fa {
      vertical-align: middle;
      margin-right: 0px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
    .el-menu-item-group__title {
      padding-bottom: 0px;
    }
    .el-menu {
      padding-left: 25px;
      .el-submenu {
        height: 30px !important;
        .el-menu-item {
          // padding-left: 54px !important;
          width: 100%;
          height: 40px !important;
        }
        .el-menu-item-group {
          .el-menu-item {
            height: 40px !important;
            padding-left: 54px !important;
            // text-indent: 20px !important;
            // color: red !important;
            // margin-right: 20px !important;
          }
          .el-menu-item:nth-child(1) {
            padding-top: 0px;
            // padding-left: 40px;
          }
        }
      }
      .el-menu-item {
        height: 40px !important;
        padding-left: 60px !important;
      }

      // .el-menu-item-group {
      //   height: 20px !important;
      // }
    }
    .el-menu-item {
      // height: 20px !important;
      line-height: 40px !important;
      font-size: 12px !important;
      background-color: #fff !important;
      border-bottom: 1px solid rgb(245, 243, 243);
      &:hover {
        color: #fff !important;
        background-color: rgb(235, 229, 229) !important;
      }
    }
    .el-menu-item.is-active {
      background-color: rgb(235, 237, 240) !important;
    }
    .is-opened > .el-submenu__title > .el-icon-arrow-down {
      color: #b3a5a5;
      font-weight: 500;
      font-size: 18px;
    }
  }
  .el-submenu__title:hover {
    background-color: #fff !important;
  }
}
.fww {
  // height: 30px !important;
  padding-left: 20px !important;
}
.fwww {
  height: 44px !important;
}
.el-submenu__title {
  height: 40px !important;
  line-height: 40px !important;
}
</style>
