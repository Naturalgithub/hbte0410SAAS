/* eslint-disable no-unreachable */
<template>
  <div class="hbtePeopleTable">
    <div>
      <el-form>
        <el-form-item label="审批人员">
          <ul class="slectUsers">
            <li v-for="item in approveUserList" :key="item.id">
              <img
                style="width: 25px;
              height: 25px;
              border-radius: 50%;
              vertical-align: middle"
                :src="item.avatar"
                alt
              />
              <span
                style="cursor: pointer;"
                class="el-icon-circle-close"
                @click="delChosePeople(item.id)"
              ></span>&nbsp;
              >&nbsp;&nbsp;
            </li>
          </ul>

          <ul class="slectUsers">
            <li style="padding-top:5px;">
              <span
                style=" font-size:35px; cursor: pointer;"
                class="el-icon-circle-plus-outline"
                @click="showPeopleInfo"
              ></span>
            </li>
          </ul>
        </el-form-item>
      </el-form>
    </div>
    <!-- 选择人员模态框 -->
    <el-dialog title="选人" :visible.sync="choseDialogVisible" closable="false" width="40%">
      <el-container>
        <el-aside width="55%">
          <div>
            <!-- 可以搜索 -->
            <el-select
              style="margin-bottom:10px "
              v-model="valuepeople1"
              @change="applyMan(valuepeople1)"
              filterable
              placeholder="请选择(可以搜索)"
            >
              <el-option
                v-for="item in rightSelectOptions"
                :key="item.id "
                :label="item.name"
                :value="item.id "
                :currentObj="item.name"
              ></el-option>
            </el-select>
            <div>
              <el-tag
                :key="tag.id"
                v-for="tag in approveUserList"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                <img class="approveManImg" :src="tag.avatar" alt />
                {{tag.title||tag.name}}
              </el-tag>
            </div>
          </div>
        </el-aside>

        <el-main style="padding-right:20px !important">
          <div>
            <vuescroll :ops="ops">
              <el-tree
                class="fr"
                node-key="id"
                :default-expanded-keys="[1]"
                accordion
                :data="leftOptions"
                :props="defaultProps"
                @node-click="handleNodeClick"
                ref="PeopleTree"
                style="height: 550px;"
              >
                <span slot-scope="{ node, data }" class="custom-tree-node">
                  <span v-if="data.type==1" class="el-icon-office-building"></span>
                  <span v-else>
                    <span class="head">
                      <img
                        :src="data.avatar"
                        style="width: 25px;
              height: 25px;
              border-radius: 50%;
              vertical-align: middle"
                        alt
                      />
                    </span>
                  </span>&nbsp;
                  <span>{{ data.title }}</span>
                </span>
              </el-tree>
            </vuescroll>
          </div>
        </el-main>
      </el-container>
      <div class="hbtePeopleTree">
        <div></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import vuescroll from 'vuescroll'
export default {
  name: 'vchosePeople',
  components: { vuescroll },

  props: {
    rightSelectOptions: {
      type: Array,
      // default:[],
      required: true
    },
    leftOptions: {
      type: Array,
      required: true
    }
    // rightSelectOptions: {}
  },
  data () {
    return {
      currentManObj: '',
      // leftOptions: [],
      passData: [],
      approveUserList: [],
      treePeopleOptions: [],
      // rightSelectOptions: [],
      departmentList: [],
      valuepeople1: '',
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, // 是否只有滚动的时候才显示滚动条
          background: '#ccc'
        }
      },
      approveMan: [],
      choseDialogVisible: false
    }
  },
  created () {
    // this.getUserInfoList()
    // this.applyManlist()
  },
  methods: {
    // async applyManlist () {
    //   const { data } = await this.$axios.get(
    //     'hbte-financial/hbte/userInfo/userInfoList'
    //   )
    //   // console.log(data.data)

    //   this.rightSelectOptions = data.data
    // },
    // async getUserInfoList () {
    //   const { data } = await this.$http.get('hbte-financial/hbte/department/departmentUserList')
    //   console.log(data)

    //   this.leftOptions = data.data
    // },
    showPeopleInfo () {
      this.choseDialogVisible = true
    },
    delChosePeople (id) {
      // console.log(2)
      this.approveUserList = this.approveUserList.filter(item => {
        return item.id !== id
        // eslint-disable-next-line no-unreachable
        // let a = this.passData
        // eslint-disable-next-line no-unreachable
        this.$emit('people-change', this.passData)
        // this.$emit('people-change', value)
      })
      this.passData = this.approveUserList.map(item => {
        return item.id
      })
      console.log(this.passData)

      // this.passData
    },
    applyMan (v) {
      let currentManObj = this.rightSelectOptions.filter(item => {
        return item.id === v
      })
      console.log(currentManObj[0])
      for (var i = 0; i < this.approveUserList.length; i++) {
        if (this.approveUserList[i].id === v) {
          // this.choseDialogVisible = false
          this.$message.error('已经选择相同人员了,请检查一波')
          return
        }
      }
      this.approveUserList.push(currentManObj[0])
      let temp = this.approveUserList
      let aa = temp.map(item => {
        return item.id
      })
      this.passData = aa
      console.log(this.passData)
      // eslint-disable-next-line no-unreachable
      this.$emit('people-change', this.passData)
    },
    handleClose (tag) {
      console.log(tag.id)
      console.log(2)
      this.approveUserList = this.approveUserList.filter(item => {
        return item.id !== tag.id
      })
      this.passData = this.approveUserList.map(item => {
        return item.id
      })
      console.log(this.passData)
      // eslint-disable-next-line no-unreachable
      this.$emit('people-change', this.passData)
    },
    handleNodeClick (data) {
      console.log(data)
      for (var i = 0; i < this.approveUserList.length; i++) {
        if (this.approveUserList[i].id === data.id) {
          // this.choseDialogVisible = false
          this.$message.error('已经选择相同人员了,请检查一波')
          return
        }
      }
      if (data.type === 2) {
        this.approveUserList.push(data)
        // this.choseDialogVisible = false
        console.log(this.approveUserList)
        this.passData = this.approveUserList.map(item => {
          return item.id
        })
        console.log(this.passData)
      }
      // eslint-disable-next-line no-unreachable
      this.$emit('people-change', this.passData)
    }
    /// //
    // applyMan (value) {
    //   this.$emit('people-change', value)
    // },
    // handleClose (peopleValue) {
    //   this.$emit('handle-close', peopleValue)
    // },
    // handleNodeClick (data) {
    //   this.$emit('handle-node-click', data)
    // },
    // delApproveMan (id) {
    //   // console.log(22)

    //   this.$emit('del-approve-mancp', id)
    // },
    // showPeopleInfo () {
    //   console.log(12)
    //   this.choseDialogVisible = true
    // }
  }
}
</script>

<style lang="scss"  scoped>
// .el-tree-node__content {
//   height: 32px !important;
// }
.el-dialog__body {
  padding-top: 10px !important;
}
.slectUsers {
  float: left;
  li {
    position: relative;
    float: left;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .el-icon-circle-close {
      position: absolute;
      left: 28px;
    }
  }
}

.head {
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
  }
}
.approveMan {
  float: left;
  li {
    position: relative;
    float: left;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .el-icon-circle-close {
      position: absolute;
      left: 28px;
    }
  }
}
.el-tree-node__content {
  height: 42px !important;
}
.pd0 {
  padding: 0;
}
.fl {
  float: left;
  width: 70%;
}
.fr {
  float: right;
}

.el-tag + .el-tag {
  margin-left: 10px;
  margin-bottom: 10px;
}
.approveManImg {
  width: 25px;
  height: 25px;
  margin-right: 5px;
  border-radius: 50%;
  vertical-align: middle;
}
.mr0 {
  margin-right: 0;
}
.el-select {
  margin-top: 10px;
  width: 93%;
}
.el-input {
  width: 100%;
}
.el-date-editor {
  width: 87%;
}
.el-cascader {
  width: 93%;
}
.el-main {
  padding: 0 !important;
}
</style>
