<template>
  <div id="loyout">
    <el-container>
      <div class="fixedtab"
           v-if="$store.state.showaside">
        <div class="asideicon">
          <!-- <div class="touxiang">
            <img :src="pic" alt>
          </div>-->
        </div>
        <vuescroll :ops="ops">
          <ul class="asideul">
            <li @click="menhu"
                :class="{sanjiao:sanjiao=='menhu'}">
              <span></span>
              <a style=" display: inline-block;width:100%;height:100%">
                <img src="../../assets/needimg/HBTE.png"
                     alt />
                <p>
                  <a href="###">门户</a>
                </p>
              </a>
            </li>

            <li @click="caiwu"
                :class="{sanjiao:sanjiao=='caiwu'}">
              <span></span>
              <a style=" display: inline-block;width:100%;height:100%"
                 href="##">
                <img src="../../assets/caiwuxitong.png"
                     alt />
                <p>
                  <a href="##">财务系统</a>
                </p>
              </a>
            </li>
            <li @click="software"
                :class="{sanjiao:sanjiao=='software'}">
              <span></span>
              <a style=" display: inline-block;width:100%;height:100%"
                 href="##">
                <img src="../../assets/th4.jpg"
                     alt />
                <p>
                  <a href="##">软件系统</a>
                </p>
              </a>
            </li>
            <li @click="forum"
                :class="{sanjiao:sanjiao=='forum'}">
              <span></span>
              <a style=" display: inline-block;width:100%;height:100%"
                 href="##">
                <img src="../../assets/knowledge.jpg"
                     alt />
                <p>
                  <a href="##">知识库</a>
                </p>
              </a>
            </li>
            <li @click="morningMeeting"
                :class="{sanjiao:sanjiao=='morningMeeting'}">
              <span></span>
              <a style=" display: inline-block;width:100%;height:100%"
                 href="##">
                <img src="../../assets/department.jpg"
                     alt />
                <p>
                  <a href="##">通用管理</a>
                </p>
              </a>
            </li>

            <li>
              <span></span>
              <a style=" display: inline-block;width:100%;height:100%"
                 target="_blank"
                 href="http://47.98.145.222:8080/LinuxOrder/index.html">
                <img src="../../assets/icon/linux2.jpg"
                     alt />
                <p>
                  <a href="###">Linux指南</a>
                </p>
              </a>
            </li>
            <!-- <li @click="processSystem"
                :class="{sanjiao:sanjiao=='processSystem'}">
              <span></span>
              <a style=" display: inline-block;width:100%;height:100%"
                 href="##">
                <img src="../../assets/th.jpg"
                     alt />
                <p>
                  <a href="##">工艺管理</a>
                </p>
              </a>
            </li> -->
            <!-- <li @click="pinguanbaogao"
                :class="{sanjiao:sanjiao=='pinguanbaogao'}">
              <span></span>
              <a style=" display: inline-block;width:100%;height:100%"
                 href="##">
                <img src="../../assets/th1.jpg"
                     alt />
                <p>
                  <a href="##">品管报告</a>
                </p>
              </a>
            </li> -->
            <!-- <li @click="jingjia"
                :class="{sanjiao:sanjiao=='jingjia'}">
              <span></span>
              <a style=" display: inline-block;width:100%;height:100%"
                 href="##">
                <img src="../../assets/th2.jpg"
                     alt />
                <p>
                  <a href="##">竞价系统</a>
                </p>
              </a>
            </li> -->
            <!-- <li @click="kehuzhichi" :class="{sanjiao:sanjiao=='kehuzhichi'}">
              <span></span>
              <a style=" display: inline-block;width:100%;height:100%" href="##">
                <img src="../../assets/th3.jpg" alt />
                <p>
                  <a href="##">客户支持</a>
                </p>
              </a>
            </li> -->
            <li>
              <span></span>
              <a style=" display: inline-block;width:100%;height:100%"
                 target="_blank"
                 href="https://worktile.com/">
                <img src="../../assets/needimg/worktile.jpg"
                     alt />
                <p>
                  <a href="###">Worktile</a>
                </p>
              </a>
            </li>
            <li style="height:200px"></li>
          </ul>
        </vuescroll>
        <div class="asideoptions"></div>
      </div>
      <layoutAside v-if="$store.state.showaside"></layoutAside>

      <el-container>
        <layoutHeader></layoutHeader>
        <el-main id="elmain">
          <transition name="main"
                      mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>

        <div style="width:100%">
          <div class="help"
               slot="reference">
            <el-tooltip class="item"
                        effect="dark"
                        content="帮助"
                        placement="top">
              <el-dropdown placement="left"
                           trigger="click">
                <i>
                  <img src="../../assets/icon/help.svg"
                       alt />
                </i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <a href="http://47.98.145.222:8080/help/financeSystem/#/"
                       target="_blank">财务帮助文档</a>
                  </el-dropdown-item>
                  <el-dropdown-item>取消</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-tooltip>
          </div>
        </div>

        <el-footer style="height:0px;"></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import layoutAside from './aside/aside'
import layoutHeader from './header/header'
import Bottom from './Footer/bottom'
import langSelect from '../../components/lang/langSelect'
import vuescroll from 'vuescroll'
export default {
  data () {
    return {

      sanjiao: '',
      jobnumber: '',
      todovalue: '',
      screenWidth: document.body.clientWidth,
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, // 是否只有滚动的时候才显示滚动条
          background: 'rgba(10,10,52,0.1)'
        }
      },
      menhusanjiao: '',
      caiwujiao: '',
      pic: ''
    }
  },
  name: 'dc-home',
  components: {
    layoutHeader,
    Bottom,
    langSelect,
    layoutAside,
    vuescroll
  },
  created () {
    this.$router.push('/index')
    this.getPersonpic()
    // this.open2()
    this.getasidesanjiao()
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
  methods: {
    getasidesanjiao () {
      const asidedata = JSON.parse(localStorage.getItem('asidedata'))
      console.log(asidedata.aside)
      this.sanjiao = asidedata.aside
    },
    getPersonpic () {
      const data = JSON.parse(localStorage.getItem('data'))
      // console.log(data)
      this.pic = data.avatar
    },
    menhu () {
      console.log(11)
      localStorage.setItem('asidedata', JSON.stringify({ aside: 'menhu' }))
      location.reload(0)
    },
    caiwu () {
      console.log(11)
      localStorage.setItem('asidedata', JSON.stringify({ aside: 'caiwu' }))
      location.reload(0)
    },
    processSystem () {
      localStorage.setItem(
        'asidedata',
        JSON.stringify({ aside: 'processSystem' })
      )
      location.reload(0)
    },
    pinguanbaogao () {
      localStorage.setItem(
        'asidedata',
        JSON.stringify({ aside: 'pinguanbaogao' })
      )
      location.reload(0)
    },
    jingjia () {
      localStorage.setItem('asidedata', JSON.stringify({ aside: 'jingjia' }))
      location.reload(0)
    },
    kehuzhichi () {
      localStorage.setItem('asidedata', JSON.stringify({ aside: 'kehuzhichi' }))
      location.reload(0)
    },
    software () {
      localStorage.setItem('asidedata', JSON.stringify({ aside: 'software' }))
      location.reload(0)
    },
    forum () {
      localStorage.setItem('asidedata', JSON.stringify({ aside: 'forum' }))
      location.reload(0)
    },
    morningMeeting () {
      localStorage.setItem('asidedata', JSON.stringify({ aside: 'morningMeeting' }))
      location.reload(0)
    },
    open2 () {
      this.$notify({
        title: '您好!',
        message: ' 今天我们能为您做点什么?',
        position: 'bottom-right',
        duration: 4000,
        onClick: function () {
          console.log(22)
          this.$message.success('功能开发中')
        }
      })
    }
  }
}
</script>

<style>
.main-enter,
.main-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.main-enter-active {
  transition: all 0.2s;
}
.main-leave-active {
  position: absolute;
  transition: all 0.3s;
}
</style>
<style lang="scss">
* {
  margin: 0px;
  padding: 0px;
}

body {
  // background-color: rgb(242, 244, 245);
  background-color: #fff;
  font-size: 14px;
  color: #333333;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
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
#loyout,
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

#elmain {
  // background-color: rgb(242, 244, 245);
  background-color: #fff;
}
.fixedtab {
  position: fixed;
  top: 0;
  // left: 0;
  width: 60px;
  height: 100%;
  background-color: rgb(227, 114, 46) !important;
  // background-color: red !important;
  z-index: 999;
  padding-top: 30px;
  // padding-bottom: 30px;
  .asideul {
    // height: 600px !important;
    margin: 0;
    height: 60%;
    // overflow: hidden;
    // overflow: scroll;
    background-color: rgb(227, 114, 46);
    overflow: auto;
    // padding-left: 6px;
    li {
      position: relative;
      text-align: center;
      margin-bottom: 5px 0 10px 0;
      height: 60px;
      padding-bottom: 5px;
      margin-bottom: 5px;
      // padding: 5px 0 4px 0;
      a {
        padding-top: 5px;
        height: 100%;
        color: #fff;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          // border: 2px solid rgb(223, 116, 45);
        }
        p {
          margin-top: 2px;
          font-size: 10px;
          color: #fff;
        }
      }
      a:hover {
        // color: green;
        background: #b94c21;
      }
      a:active {
        color: #ccc;
      }
    }
    .sanjiao {
      position: relative;
      background-color: #b94c21;
      span {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        // width: 5px;
        // height: 5px;
        border: 5px solid transparent;

        border-right: 5px solid rgb(250, 108, 52);

        border-left: 5px solid transparent;

        border-top: 5px solid transparent;
      }
    }
  }
}
.asideicon {
  border-right: 10px solid rag(0, 0, 0);
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  .touxiang {
    img {
      width: 40px;
      height: 40px;
      border-radius: 15px;
      border: 3px solid #fff;
    }
  }
}
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
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-icon-arrow-down {
  // color: #ccc !important;
  font-size: 18px;
}
// 滚动条
// rail: {
//   background: '#01a99a',
//   opacity: 0,
//   size: '6px',
//   specifyBorderRadius: false,
//   gutterOfEnds: null,
//    gutterOfSide: '2px',
//   keepShow: false
// }

.item {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
