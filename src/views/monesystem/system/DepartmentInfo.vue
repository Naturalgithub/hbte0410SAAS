<template>
  <div class="department" style="height:100%">
    <div class="container bgcgreen">
      <div class="fl w260">
        <el-tree
          :data="data"
          node-key="id"
          :default-expanded-keys="[1]"
          accordion
          :props="defaultProps"
          @node-click="handleNodeClick"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span v-if="data.type==1" class="el-icon-office-building"></span>
            <span v-else>
              <span class="touxiang">
                <img :src="data.avatar" alt />
              </span>
            </span>&nbsp;
            <span>{{ data.title }}</span>
          </span>
        </el-tree>
      </div>
      <div class="fl de_main">
        <div class="de_main_header">
          <div>
            <div class="header">
              <div class="touxianglogo" @click="start">
                <img :src="userinfo.avatar" :class="[rotate?'go':'aa']" alt />
              </div>
            </div>
            <div class="header2">
              <span class="el-icon-user">&nbsp;&nbsp;{{userinfo.name}}&nbsp;&nbsp;|</span>
              <span class="el-icon-money">&nbsp;{{userinfo.position}}&nbsp;&nbsp;|</span>
              <span class="el-icon-position">&nbsp;{{userinfo.workPlace}}&nbsp;&nbsp;</span>
            </div>
            <div>功能开发中</div>
            <!-- <div v-show="boduo" class="header3">
              <img src="../../../assets/download.jpg" alt>
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      touxiang: 'touxiang',
      boduo: false,
      userid: '',
      userinfo: { name: '', position: '', workPlace: '', avatar: '' },
      personinfo: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      rotate: false
    }
  },
  created () {
    this.getdepartmentname()
    this.getPersoninfo()
    this.getUserInfo()
  },
  methods: {
    start () {
      this.rotate = !this.rotate
      console.log(this.rotate)
    },
    getPersoninfo () {
      const data = JSON.parse(localStorage.getItem('data'))
      // console.log(data)
      this.personinfo = data
      this.userid = data.id
      console.log(this.personinfo)
    },
    showdetile (data) {
      // console.log(data)
    },
    async getUserInfo () {
      const res = await this.$axios.get(
        'hbte-financial/hbte/userInfo/getUserInfo',
        {
          params: {
            id: this.userid
          }
        }
      )
      console.log(res.data.data)
      this.userinfo = res.data.data
    },
    async getdepartmentname () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/department/departmentUserList'
      )
      // console.log(data.data)
      this.data = data.data
    },
    handleNodeClick (data) {
      console.log(data)
      if (data.id == 39) {
        this.boduo = true
      } else {
        this.boduo = false
      }
      if (data.type == 2) {
        this.userid = data.id
        console.log(data.id)
        this.getUserInfo()
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.touxiang {
  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    vertical-align: middle;
  }
}
>>> .el-tree-node__content {
  height: 42px !important;
}
.el-tree {
  width: 100% !important;
}
.padding0 {
  padding: 0;
}
.bgcred {
  background-color: red;
}
.bgcgreen {
  background-color: green;
}
.h200 {
  height: 200px;
}
.dpheader {
  height: 200px;
  img {
    width: 100%;
    height: 200px;
  }
}

.department {
  width: 100%;
  height: 100%;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.de_main {
  height: 400px;
  background-color: rgb(240, 242, 245);
}
.w260 {
  height: 1000px;
  background-color: #fff;
  padding-top: 10px;
  width: 20%;
}
.de_main {
  height: 1000px;
  box-sizing: border-box;
  padding: 0 10px 10px;
  overflow: hidden;
  width: 80%;
}
.de_main_header {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .header {
    position: relative;
    height: 100px;
    background-color: #fff;
    background: url('./../../../assets/Ocean_by_Shu_Le.jpg');
    background-repeat: no-repeat;
    background-size: contain;
    -webkit-background-size: cover;
    .touxianglogo {
      position: absolute;
      left: 15px;
      top: 40%;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
  }
  .header2 {
    width: 100%;
    height: 50px;
    background-color: rgb(238, 237, 237);

    .el-icon-user {
      padding-left: 13%;
      height: 50px;
      line-height: 50px;
      font-weight: 700;
    }
    span {
      height: 50px;
      line-height: 50px;
      font-weight: 700;
      margin-right: 10px;
      // padding-right: 10px;
      // border-right: 1px solid #ccc;
    }
  }
}
.aa {
  transition: all 2s;
}
.go {
  transform: rotate(-360deg);
  transition: all 2s;
}
</style>
