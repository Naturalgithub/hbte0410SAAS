<template>
  <div class="users">
    <el-button class="addBtn" type="success" @click="dialogVisible = true">添加</el-button>
    <!-- 按钮添加 -->
    <el-form :inline="true" style="margin-top:10px">
      <el-row>
        <el-col :span="8">
          <el-form-item label=" 项目名称检索:">
            <el-input v-model="searchform.projectName" @keyup.native="serch" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- <el-form>
      <el-table-column></el-table-column>
      <el-table-column>
        <el-input v-model="form.name" />
      </el-table-column>
    </el-form>-->
    <!-- 表格组件 -->

    <el-table :data="projectList" border size="mini">
      <el-table-column align="center" type="expand" label="详情" @expand-change="aaaa">
        <template slot-scope="{row}">
          <p style="text-align:center" v-if="row.softwares==''">暂无数据</p>
          <el-table v-else :data="row.softwares" border size="mini">
            <el-table-column align="center" type="index" label="序号" width="50" />
            <el-table-column align="center" prop="name" label="软件名称" />
            <el-table-column align="center" prop="version" label="版本号" />
            <el-table-column align="center" prop="uploadTime" label="上传时间" />
            <el-table-column align="center" prop="user.name" label="上传人" />
            <el-table-column align="center" prop="downloadSize" label="下载次数" />
          </el-table>
        </template>
      </el-table-column>
      <el-table-column align="center" type="index" label="序号" width="50" />
      <el-table-column align="center" prop="projectName" label="项目名称" />
      <el-table-column align="center" prop="comment" label="描述" />

      <el-table-column align="center" label="操作">
        <!-- row这个参数, 是element ui内部, 定义slot时, 传递过来的 -->
        <template v-slot:default="obj">
          <el-button
            plain
            size="small"
            @click="showEditDialog(obj.row)"
            type="primary"
            icon="el-icon-edit"
          />
          <el-button
            plain
            size="small"
            @click="delUser(obj.row)"
            type="danger"
            icon="el-icon-delete"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:10px"
      background
      :current-page="page"
      @size-change="handleSizeChange"
      :page-sizes="[30, 50, 80]"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />
    <!-- 模态框 -->
    <el-dialog title="项目管理" :visible.sync="dialogVisible" width="40%">
      <el-form ref="form2" :model="form" status-icon label-width="100px">
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="form.projectName" />
        </el-form-item>

        <el-form-item label="项目描述" prop="projectName">
          <el-input v-model="form.comment" />
        </el-form-item>
      </el-form>

      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureAdd">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 编辑的对话框 -->
    <el-dialog title="修改" :visible.sync="editVisible" width="40%">
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="editForm.projectName" />
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input v-model="editForm.comment" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pagenum: '',
      total: 0,
      page: 1,
      pageSize: 50,
      searchform: { projectName: '' },
      dialogVisible: false,
      editVisible: false,
      projectList: [],
      editForm: { projectName: '', comment: '', id: '' },
      form: { projectName: '', comment: '' },
      // 表单校验规则
      rules: {
        bankName: [
          {
            required: true,
            message: '请输入正确数据',
            trigger: ['blur', 'change']
          },
          {
            min: 3,
            max: 12,
            message: '字符长度在 1 到 12 个字符',
            trigger: ['blur', 'change']
          }
        ],
        bankAddress: [
          {
            required: true,
            message: '请输入正确数据',
            trigger: ['blur', 'change']
          },
          {
            min: 3,
            max: 12,
            message: '字符长度在 1 到 12 个字符',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  created () {
    this.getProjectList()
  },
  methods: {
    aaaa (a, b) {
      console.log(11)
    },
    showEditDialog (row) {
      this.editVisible = true
      console.log(row)
      this.editForm.projectName = row.projectName
      this.editForm.comment = row.comment
      this.editForm.id = row.id
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      this.pagesize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.pagenum = 1
      // 重新渲染
      this.getProjectList()
    },
    handleCurrentChange (val) {
      // 更新当前页
      this.pagenum = val
      // 重新渲染
      this.getProjectList()
    },
    async getProjectList () {
      const data = await this.$http.getProjectList({ projectName: this.searchform.projectName, page: this.page, pageSize: this.pageSize })
      console.log(data.result)
      this.total = data.result.length
      this.projectList = data.result
    },
    async sureUpdate () {
      const data = await this.$http.updateProjectList(this.editForm)
      console.log(data.code)
      if (data.code == 0) {
        this.$message.success('修改成功')
      } else {
        this.$message.error(data.message)
      }
      this.editVisible = false
      this.getProjectList()
    },
    async sureAdd () {
      if (this.form.projectName === '') {
        this.$message.error('请输入项目名称')
        return
      }
      const data = await this.$http.addProjectList(this.form)
      if (data.code == 0) {
        this.$message.success('添加成功')
        this.form.projectName = ''
        this.form.comment = ''
      } else {
        this.$message.error(data.message)
      }
      this.dialogVisible = false
      this.getProjectList()
    },
    async delUser (row) {
      console.log(row.id)
      try {
        await this.$confirm('亲, 你确认要删除么?', '温馨提示', {
          type: 'warning'
        })
        const data = await this.$http.deleteProjectList({ id: row.id })
        if (data.code == 0) {
          this.$message.success('删除成功')
          this.getProjectList()
        } else {
          this.$message.error(data.message)
        }
      } catch (e) {
        console.log(e)
      }
    },
    serch (v) {
      this.getProjectList()
    }

  }
}
</script>
