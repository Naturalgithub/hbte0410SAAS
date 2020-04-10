<template>
  <div class="postForum">
    <el-button style class="addBtn" @click="showadddialog" type="success">添加</el-button>
    <el-form :inline="true" class="demo-form-inline" style="margin-top:20px">
      <el-row>
        <el-col :span="6">
          <el-form-item style="width:70%">
            <el-date-picker
              style="width:100%"
              v-model="timeValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @change="searchTime"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item>
            <el-select
              clearable
              v-model="fmTagNameid"
              placeholder="请选择标签"
              style="width:80%"
              @change="clickproblemType"
            >
              <el-option
                v-for="item in fmTaglist"
                :key="item.id"
                :label="item.fmTagName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-select
              clearable
              v-model="problemTypeInfos.id"
              placeholder="请选择问题类型"
              style="width:80%"
              @change="clickproblemType"
            >
              <el-option
                v-for="item in problemTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-input v-model="bttitle" placeholder="请输入标题" :lg="12" @keyup.native="titlechange"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 表格组件 -->
    <el-table :data="forumList" border size="mini" style="margin-top:0px">
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="title" label="标题">
        <!-- <template v-slot:default="{row}">
          <el-link :underline="false" v-html="row.title"></el-link>
        </template>-->
      </el-table-column>
      <!-- <el-table-column label="内容" :show-overflow-tooltip="true">
        <template v-slot:default="{row}">
          <el-link :underline="false" v-html="row.content"></el-link>
        </template>
      </el-table-column>-->
      <el-table-column label="标签" width="150">
        <template v-slot:default="{row}">
          <el-tag v-for=" item in row.fmTags" :key="item.id" size="mini">{{item.fmTagName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template v-slot:default="{row}">
          <span v-if="row.status==1">已解决</span>
          <span v-else>待解决</span>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="提问人" width="100" />
      <el-table-column prop="user.name" label="提交人" width="100" />

      <el-table-column prop="problemTypeInfo.name" label="问题类型" width="100" />
      <el-table-column prop="datatime" label="时间" width="100" />
      <el-table-column prop="problemTypeInfo.name" label="编辑" width="130">
        <template v-slot:default="{row}">
          <el-button plain size="small" type="primary" icon="el-icon-edit" @click="editBtn(row)" />
          <el-button plain size="small" type="danger" icon="el-icon-delete" @click="delbtn(row)" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:10px"
      background
      :current-page="page"
      @size-change="handleSizeChange"
      :page-sizes="[30,50,80]"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />
    <el-dialog
      :title="title"
      :visible.sync="adddialog"
      top="10vh"
      width="80%"
      :before-close="handleClose"
    >
      <el-form ref="editForm" :model="editForm" :rules="rules">
        <el-form-item prop="title">
          <el-input v-model="editForm.title" placeholder="请填入标题" />
        </el-form-item>

        <el-form-item prop="content">
          <quill-editor v-model="editForm.content" small></quill-editor>
        </el-form-item>
        <el-form-item prop="userName">
          <el-input v-model="editForm.userName" placeholder="请填入提问人" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="editForm.problemTypeInfo.id" placeholder="请填入问题类型">
            <el-option
              v-for="item in problemTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择标签">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleCloses(tag)"
          >{{tag}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          <el-checkbox-group v-model="editForm.forumTagIds">
            <el-checkbox
              v-for="item in fmTaglist"
              :key="item.id"
              :label="item.id"
            >{{item.fmTagName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialog = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bttitle: '',
      fmTagNameid: '',
      problemTypeInfoslist: [],
      problemTypeInfos: { id: '' },
      startTime: '',
      endTime: '',
      timeValue: [],
      inputValue: [],
      inputVisible: false,
      dynamicTags: [],
      testobj: {
        name: 2
      },
      title: '',
      problemTypeList: [],
      rules: {
        title: [
          {
            required: true,
            message: '请输入正确数据',
            trigger: ['blur', 'change']
          }
        ],
        content: [
          {
            required: true,
            message: '请输入正确数据',
            trigger: ['blur', 'change']
          }
        ],
        userName: [
          {
            required: true,
            message: '请输入正确数据',
            trigger: ['blur', 'change']
          }
        ]
      },
      fmTaglist: [],
      editForm: {
        forumTagIds: [],
        forumTagNames: [],
        id: '',
        userName: '',
        title: '',
        datatime: '',
        content: '',
        user: { id: JSON.parse(localStorage.getItem('data')).id, name: JSON.parse(localStorage.getItem('data')).userName },
        problemTypeInfo: { id: '' }
      },
      adddialog: false,
      testList: [],
      total: 0,
      page: 1,
      pageSize: 50,
      forumList: []
    }
  },
  created () {
    this.getfmTaglist()
    this.getproblemTypeList()
    this.getForumList()
    let aa = this.$hbteApi.nowTime()
    console.log(aa)
    this.$nextTick(() => {
      this.editForm.datatime = `${aa.nowYear}-${aa.nowMonth}-${aa.nowDate}`
    })
  },
  methods: {
    titlechange () {
      console.log(2)

      this.getForumList()
    },
    searchTime (v) {
      if (v == null) {
        this.startTime = ''
        this.endTime = ''
        this.getForumList()
        return
      }
      this.startTime = v[0]
      this.endTime = v[1]
      this.getForumList()
    },
    clickproblemType () {
      this.getForumList()
    },
    async getproblemTypeInfoslist () {
      const res = await this.$http.problemTypelist()
      this.problemTypeInfoslist = res.result
    },
    async getfmTaglist () {
      const res = await this.$http.fmTaglist()
      this.fmTaglist = res.result
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
      this.editForm.forumTagNames = this.dynamicTags
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
      this.editForm.forumTagNames = this.dynamicTags
    },
    async delbtn (row) {
      try {
        await this.$confirm('亲, 你确认要删除么?', '温馨提示', {
          type: 'warning'
        })

        const data = await this.$http.forumdelete({ id: row.id })
        if (data.code == 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          this.$message.error(data.errorMsg)
        }
      } catch (e) {
        console.log(e)
      }
      this.getForumList()
    },
    editBtn (row) {
      console.log(row)
      this.title = '编辑'
      this.editForm.content = row.content
      this.editForm.title = row.title
      this.editForm.userName = row.userName
      this.editForm.id = row.id
      this.inputValue = []
      this.editForm.problemTypeInfo.id = row.problemTypeInfo.id
      this.adddialog = true
    },
    async  sureAdd () {
      console.log(this.title)

      let aa = this.title == '添加'
      if (aa) {
        const res = await this.$http.forumadd(this.editForm)
        if (res.code == 0) {
          this.$message.success('提交成功')
          this.getForumList()
          this.adddialog = false
        } else {
          this.$message.error(res.message)
        }
      } else {
        const res = await this.$http.forumupdate(this.editForm)
        if (res.code == 0) {
          this.$message.success('提交成功')
          this.getForumList()
          this.adddialog = false
        } else {
          this.$message.error(res.message)
        }
      }
    },
    async getproblemTypeList () {
      const res = await this.$http.problemTypeList()
      this.problemTypeList = res.result
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    showadddialog () {
      this.title = '添加'
      this.adddialog = true
      this.editForm.content = ''
      this.editForm.title = ''
      this.editForm.userName = ''
      this.editForm.id = ''
      this.editForm.problemTypeInfo.id = ''
      this.editForm.forumTagIds = []
      this.editForm.forumTagNames = []
      this.inputValue = []
    },
    async getForumList () {
      const res = await this.$http.forumList({
        page: this.page,
        pageSize: this.pageSize,
        userId: JSON.parse(localStorage.getItem('data')).id,
        problemTypeId: this.problemTypeInfos.id,
        title: this.bttitle,
        fmTagId: this.fmTagNameid,
        startTime: this.startTime,
        endTime: this.endTime
      })
      console.log(res)
      this.forumList = res.result
      this.total = res.result.length
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.page = 1
      this.getForumList()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getForumList()
    },
    handleCloses (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      this.upForm.tagNames = this.dynamicTags
    }
  }
}
</script>

<style lang='scss'>
.ql-editor {
  min-height: 500px;
}
</style>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
