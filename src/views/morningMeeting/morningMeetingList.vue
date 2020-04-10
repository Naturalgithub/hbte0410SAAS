<template>
  <div>
    <el-button
      style="margin-bottom:10px"
      class="addBtn"
      type="success"
      @click="adddialogVisiblebtn"
    >添加</el-button>
    <el-form>
      <el-row>
        <el-col :span="6">
          <el-form-item style="width:70%;margin-top:10px">
            <el-date-picker
              style="width:100%"
              v-model="timeValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM"
              @change="searchTime"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column prop="content" label="内容" :show-overflow-tooltip="true">
        <template v-slot:default="{row}">
          <el-link type="primary" @click="showdetail(row.content)" v-html="row.content"></el-link>
        </template>
      </el-table-column>
      <el-table-column prop="toastmaster" label="晨会主持人" width="100"></el-table-column>
      <el-table-column prop="user.name" label="记录人" width="100"></el-table-column>
      <el-table-column prop="dateTime" label="记录时间" width="120"></el-table-column>

      <el-table-column label="编辑" width="80">
        <template v-slot:default="{row}">
          <el-button
            plain
            size="small"
            @click="showEditDialog(row)"
            type="primary"
            icon="el-icon-edit"
          />
          <!-- <el-button plain size="small" @click="delUser(row.id)" type="danger" icon="el-icon-delete" /> -->
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
    <!-- :before-close="handleClose" -->
    <!-- tianjia模态框 -->
    <el-dialog class="pt0" :title="title" :visible.sync="adddialogVisible" width="40%">
      <el-form :rules="rules" ref="ruleForm" :model="passAddForm" status-icon>
        <el-form-item prop="toastmaster">
          <el-input v-model="passAddForm.toastmaster" placeholder="晨会主持人" />
        </el-form-item>
        <el-form-item prop="content">
          <!-- <el-input v-model="passAddForm.content" type="textarea" autosize /> -->
          <quill-editor v-model="passAddForm.content"></quill-editor>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="adddialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="conferenceAdd">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="detaildialogVisible" width="50%">
      <!-- <pre>{{detail}}</pre> -->
      <!-- 富文本编辑器 -->
      <div v-html="detail" style="min-height:200px"></div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timeValue: [],
      rules: {
        toastmaster: [
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
        ]
      },
      detail: '',
      title: '添加',
      adddialogVisible: false,
      detaildialogVisible: false,
      total: 0,
      page: 1,
      pageSize: 50,
      tableData: [],
      passAddForm: {
        toastmaster: '',
        dateTime: '',
        content: '',
        id: '',
        user: {
          id: ''
        }
      }
    }
  },
  created () {
    this.getConferenceList()
    this.passAddForm.user.id = JSON.parse(localStorage.getItem('data')).id
    let aa = this.$hbteApi.nowTime()
    console.log(aa)
    this.passAddForm.dateTime = `${aa.nowYear}-${aa.nowMonth}-${aa.nowDate}`
  },
  methods: {
    searchTime (v) {
      if (v == null) {
        this.startTime = ''
        this.endTime = ''
        this.getForumList()
        return
      }
      this.startTime = v[0]
      this.endTime = v[1]
      this.getConferenceList()
    },
    showdetail (v) {
      this.detaildialogVisible = true
      this.detail = v
    },
    adddialogVisiblebtn () {
      this.passAddForm.toastmaster = ''
      this.passAddForm.content = ''
      this.title = '添加'
      this.adddialogVisible = true
    },
    showEditDialog (row) {
      this.adddialogVisible = true
      this.$nextTick(() => {
        this.passAddForm.toastmaster = row.toastmaster
        this.passAddForm.content = row.content
        this.passAddForm.id = row.id
        this.title = '修改'
      })
    },
    async conferenceAdd () {
      let isAdd = this.title == '添加'
      console.log(isAdd)

      if (isAdd) {
        const res = await this.$http.conferenceAdd(this.passAddForm)
        if (res.code == 0) {
          this.$message.success('操作成功')
          this.adddialogVisible = false
          this.getConferenceList()
          this.$refs.ruleForm.resetFields()
        } else {
          this.$message.error(res.message)
        }
      } else {
        this.passAddForm.dateTime = ''
        const res = await this.$http.conferenceUpdate(this.passAddForm)
        if (res.code == 0) {
          this.$message.success('操作成功')
          this.adddialogVisible = false
          this.getConferenceList()
          this.$refs.ruleForm.resetFields()
        } else {
          this.$message.error(res.message)
        }
      }
    },
    async getConferenceList () {
      const res = await this.$http.conferenceList({ page: this.page, pageSize: this.pageSize, startTime: this.startTime, endTime: this.endTime })
      console.log(res.result)
      this.tableData = res.result
      this.total = res.result.length
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.page = 1
      this.getConferenceList()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getConferenceList()
    }
  }
}
</script>

<style lang="scss" >
.ql-editor {
  min-height: 400px;
}
</style>
<style>
.pt0 .el-dialog__body {
  padding-bottom: 0px;
}
</style>
