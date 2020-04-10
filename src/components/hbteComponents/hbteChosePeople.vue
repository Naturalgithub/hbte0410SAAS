<template>
  <div class="hbtePeopleTable">
    <div>
      <el-form-item label="审批人员">
        <ul class="approveMan">
          <li v-for="item in approveManlist" :key="item.id">
            <img :src="item.avatar" alt />
            <span
              style="cursor: pointer;"
              class="el-icon-circle-close"
              @click="delApproveMan(item.id)"
            ></span>&nbsp;
            >&nbsp;&nbsp;
          </li>
        </ul>

        <ul class="approveMan">
          <li style="padding-top:5px;">
            <span
              style=" font-size:35px; cursor: pointer;"
              class="el-icon-circle-plus-outline"
              @click="showPeopleInfo"
            ></span>
          </li>
        </ul>
      </el-form-item>
    </div>
    <!-- 选择人员模态框 -->
    <el-dialog title="选人" :visible.sync="choseDialogVisible" closable="false" width="40%">
      <div class="hbtePeopleTree">
        <vuescroll :ops="ops">
          <div>
            <!-- 可以搜索 -->
            <div class="fl">
              <div>
                <el-select
                  style="margin-bottom:10px  "
                  v-model="valuepeople1"
                  @change="applyMan(valuepeople1)"
                  filterable
                  placeholder="请选择(可以搜索)"
                >
                  <el-option
                    v-for="item in applyManOptions"
                    :key="item.id "
                    :label="item.name"
                    :value="item.id "
                    :currentObj="item.name"
                  ></el-option>
                </el-select>
              </div>
              <el-tag
                :key="tag.id"
                v-for="tag in approveManlist"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                <img class="approveManImg" :src="tag.avatar" alt />
                {{tag.title||tag.name}}
              </el-tag>
            </div>

            <el-tree
              class="fr"
              node-key="id"
              :default-expanded-keys="[1]"
              accordion
              :data="treePeopleOptions"
              @node-click="handleNodeClick"
              :props="defaultProps"
              ref="PeopleTree"
              style="height: 550px;"
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
        </vuescroll>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import vuescroll from 'vuescroll'
export default {
  name: 'hbtePeopleTable',
  components: { vuescroll },

  props: {
    approveManlist: {
      type: Array,
      // default:[],
      required: true
    },
    treePeopleOptions: {
      // required: true
    },
    applyManOptions: {}
  },
  data () {
    return {
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
  methods: {
    applyMan (value) {
      this.$emit('apply-man', value)
    },
    handleClose (peopleValue) {
      this.$emit('handle-close', peopleValue)
    },
    handleNodeClick (data) {
      this.$emit('handle-node-click', data)
    },
    delApproveMan (id) {
      // console.log(22)

      this.$emit('del-approve-mancp', id)
    },
    showPeopleInfo () {
      console.log(12)
      this.choseDialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.touxiang {
  img {
    width: 25px;
    height: 25px;
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
>>> .el-tree-node__content {
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
>>> .el-dialog__body {
  padding-top: 0px !important;
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
</style>
