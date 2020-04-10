<template>
  <div class="softWare" v-if="showSoftSystem">
    <el-submenu index="20">
      <template slot="title">
        <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
        <span style="font-size:12px" class="fw">&nbsp;&nbsp;&nbsp;知识库管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/forumIndex">QA首页</el-menu-item>
        <el-menu-item index="/postForum">我的QA</el-menu-item>
        <!-- <el-menu-item index="/CustomerManagement">生产看板</el-menu-item> -->
        <!-- <el-menu-item index="/BankManagement">生产报表</el-menu-item>
        <el-menu-item index="/AitemLine">销售订单</el-menu-item>-->
      </el-menu-item-group>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'forumMenu',
  data () {
    return {
      showSoftSystem: false
    }
  },
  created () {
    let temp = JSON.parse(localStorage.getItem('asidedata'))
    console.log(temp)
    this.showSoftSystem = temp.aside === 'forum'
    // console.log(this.showSoftSystem, 1)
  }
}
</script>

<style lang="scss">
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
.fw {
  // font-weight: 700;
}
.el-submenu__title {
  height: 40px !important;
  line-height: 40px;
}
</style>
