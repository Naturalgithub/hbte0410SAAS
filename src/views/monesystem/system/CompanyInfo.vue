<template>
<!-- 公司管理 -->
  <div class="users">
    <!-- 搜索框 -->
    <!-- <el-input placeholder="请输入搜索关键字" v-model="query" class="input-with-select search">
      <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
    </el-input>-->
    <!-- 按钮添加 -->
    <el-button type="success" @click="dialogVisible = true">添加</el-button>

    <!-- 表格组件 -->
    <el-table style="width: 100%;margin-top:20px" :data="momeyManagementList" border size="mini">
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="companyName" label="公司名称" />
      <el-table-column prop="companyAddress" label="公司地址" />

      <el-table-column label="操作">
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
            @click="delUser(obj.row.companyInfoId)"
            type="danger"
            icon="el-icon-delete"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <!--
      @size-change: 每页条数变化时, 触发
      @current-change: 当前页变化时, 触发
      :current-page 当前页
      :page-sizes 可供选择每页条数的选择项
      :page-size 每页条数
      layout 显示的功能控件
    -->
    <el-pagination
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
    <el-dialog title="公司管理" :visible.sync="dialogVisible" width="35%">
      <el-form ref="form" :model="form" status-icon label-width="100px">
        <el-form-item label="公司名称">
          <el-input v-model="form.companyName" placeholder="公司名称" />
        </el-form-item>

        <el-form-item label="公司地址">
          <el-input v-model="form.companyAddress" placeholder="公司地址" />
        </el-form-item>
      </el-form>

      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="moneyadd">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 编辑的对话框 -->
    <el-dialog title="修改" :visible.sync="editVisible" width="35%">
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px">
        <el-form-item label="公司名称">
          <el-input v-model="editForm.companyName" />
        </el-form-item>
        <el-form-item label="公司地址" prop="email">
          <el-input v-model="editForm.companyAddress" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editMoney">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      // 总条数
      total: 0,
      // 当前页
      page: 1,
      // 每页条数
      pageSize: 50,
      // companyInfoId: '1',
      momeyManagementList: [], // userList: [],
      dialogVisible: false,
      // 表单的数据
      form: {
        companyName: '',
        companyAddress: ''
      },
      editForm: {
        companyInfoId: '',
        companyName: '',
        companyAddress: ''
      },

      // 表单校验规则
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
            message: '用户名长度在 1 到 12 个字符',
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
            message: '密码长度在 1 到 12 个字符',
            trigger: ['blur', 'change']
          }
        ]
      },
      editVisible: false,
      assignVisible: false,
      // 分配表单的数据
      assignForm: {
        id: '',
        rid: '',
        username: ''
      },
      roleList: []
    }
  },
  created () {
    this.getMoneyList()
  },
  methods: {
    async getMoneyList () {
      const data = await this.$http.companyInfoList({ page: this.page, pageSize: this.pageSize })
      console.log(data.data)
      this.momeyManagementList = data.data
      this.total = data.count
      // console.log(this.$axios)
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      // debugger
      this.pageSize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.page = 1
      // 重新渲染

      this.getMoneyList()
    },
    handleCurrentChange (val) {
      this.page = val
      // 重新渲染
      this.getMoneyList()
    },
    showEditDialog (row) {
      this.editVisible = true
      console.log(row)
      // 回显基本的数据
      this.editForm.companyName = row.companyName
      this.editForm.companyAddress = row.companyAddress

      this.editForm.companyInfoId = row.companyInfoId
    },
    async delUser (id) {
      try {
        await this.$confirm('亲, 你确认要删除么?', '温馨提示', {
          type: 'warning'
        })
        const data = await this.$http.delCompanyInfo({ companyInfoId: id })
        // debugger
        if (data.code === 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      } catch (e) {
        console.log(e)
      }
      this.getMoneyList()
    },
    async editMoney () {
      const data = await this.$http.updateCompanyInfo(this.editForm)
      if (data.code === 0) {
        this.$message.success('修改成功')
      } else {
        this.$message.error('修改失败')
      }
      this.editVisible = false
      console.log(data)
      this.getMoneyList()
    },
    async moneyadd () {
      const data = await this.$http.saveCompanyInfo(this.form)
      if (data.code === 0) {
        this.$message.success('添加成功')
      } else {
        this.$message.error(data.errorMsg)
        // console.log(data.errorMsg)
      }
      this.getMoneyList()
      this.dialogVisible = false
      // console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  width: 300px;
  margin-bottom: 10px;
}
.addBtn {
  margin: 0 20px;
}
.el-pagination {
  margin-top: 10px;
}
.addBtn {
  margin-bottom: 10px;
}
</style>
