<template>
  <div class="users">
    <el-button type="success" @click="dialogVisible = true">添加</el-button>

    <!-- 表格组件 -->
    <el-table style="margin-top:20px;" :data="momeyManagementList" border size="mini">
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="productLineName" label="产品线名称" />

      <el-table-column
        prop="productLineCode"
        label="产品线编码"
        sortable
        :default-sort="{prop: 'date', order: 'descending'}"
      />

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
            @click="delUser(obj.row.productLineId)"
            type="danger"
            icon="el-icon-delete"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="page"
      @size-change="handleSizeChange"
      :page-sizes="[30,50,80]"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />
    <!-- 模态框 -->
    <el-dialog title="产品线管理" :visible.sync="dialogVisible" width="35%">
      <el-form ref="form" :model="form" status-icon label-width="100px">
        <el-form-item label="产品线名称">
          <el-input v-model="form.productLineName" placeholder="产品线名称" />
        </el-form-item>

        <el-form-item label="产品线编码">
          <el-input v-model="form.productLineCode" placeholder="产品线编码" />
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
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="100px">
        <el-form-item label="产品线名称">
          <el-input v-model="editForm.productLineName" />
        </el-form-item>
        <el-form-item label="产品线编码" prop="email">
          <el-input v-model="editForm.productLineCode" />
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
      // productLineId: '1',
      momeyManagementList: [], // userList: [],
      dialogVisible: false,
      // 表单的数据
      form: {
        productLineName: '',
        productLineCode: ''
      },
      editForm: {
        productLineId: '',
        productLineName: '',
        productLineCode: ''
      },

      // 表单校验规则
      rules: {
        moneyname: [
          {
            required: true,
            message: '请输入产品线名称',
            trigger: ['blur', 'change']
          },
          {
            min: 3,
            max: 12,
            message: '用户名长度在 1 到 12 个字符',
            trigger: ['blur', 'change']
          }
        ],
        moneyturn: [
          {
            required: true,
            message: '请输入产品线编码',
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
    this.getProductList()
  },
  methods: {
    async getProductList () {
      const data = await this.$http.productLineList({ page: this.page, pageSize: this.pageSize })
      console.log(data)
      this.momeyManagementList = data.data
      this.total = data.count
      // console.log(this.$axios)
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      this.pageSize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.page = 1
      // 重新渲染
      this.getProductList()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 更新当前页
      this.page = val
      // 重新渲染
      this.getProductList()
    },
    showEditDialog (row) {
      this.editVisible = true
      // console.log(row)
      // 回显基本的数据
      this.editForm.productLineName = row.productLineName
      this.editForm.productLineCode = row.productLineCode

      this.editForm.productLineId = row.productLineId
    },
    async delUser (id) {
      try {
        await this.$confirm('亲, 你确认要删除么?', '温馨提示', {
          type: 'warning'
        })
        const { data } = await this.$axios.post(
          'hbte-financial/hbte/productLine/delProductLine',
          {
            productLineId: id
          }
        )
        if (data.code === 0) {
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
      // if (data.code === 0) {
      //   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   })
      //     .then(() => {
      //       this.$message({
      //         type: 'success',
      //         message: '删除成功!'
      //       })
      //     })
      //     .catch(() => {
      //       this.$message({
      //         type: 'info',
      //         message: '已取消删除'
      //       })
      //     })
      this.getProductList()
      // } else {
      //   this.$message.error('删除失败')
      // }
    },
    async editMoney () {
      const data = await this.$http.updateProductLine(this.editForm)
      if (data.code === 0) {
        this.$message.success('修改成功')
      } else {
        this.$message.error(data.errorMsg)
      }
      this.editVisible = false
      // console.log(data)
      this.getProductList()
    },
    async moneyadd () {
      const data = await this.$http.saveProductLine(this.form)
      if (data.code === 0) {
        this.$message.success('添加成功')
      } else {
        this.$message.error(data.errorMsg)
        // console.log(data.errorMsg)
      }
      this.getProductList()
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
