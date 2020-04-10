<template>
<!-- 货币管理 -->
  <div class="users">
    <!-- 搜索框 -->
    <!-- <el-input placeholder="请输入搜索关键字" v-model="query" class="input-with-select search">
      <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
    </el-input>-->
    <!-- 按钮添加 -->
    <el-button style class="addBtn" type="success" @click="dialogVisible = true">添加</el-button>

    <!-- 表格组件 -->
    <el-table style="margin-top:10px" :data="momeyManagementList" border size="mini">
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="currencyName" label="货币名称" />

      <el-table-column
        prop="currencyRatio"
        label="货币兑率"
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
            @click="delUser(obj.row.currencyInfoId)"
            type="danger"
            icon="el-icon-delete"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->

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
    <el-dialog title="货币管理" :visible.sync="dialogVisible" width="35%">
      <el-form :rules="rules" ref="ruleForm" :model="form" status-icon label-width="100px">
        <el-form-item label="货币名称" prop="currencyName">
          <el-input v-model="form.currencyName" placeholder="货币名称" />
        </el-form-item>

        <el-form-item label="货币兑率" prop="currencyRatio">
          <el-input v-model="form.currencyRatio" placeholder="货币兑率" />
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
        <el-form-item label="货币名称">
          <el-input v-model="editForm.currencyName" />
        </el-form-item>
        <el-form-item label="货币兑率" prop="email">
          <el-input v-model="editForm.currencyRatio" />
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
      // currencyInfoId: '1',
      momeyManagementList: [], // userList: [],
      dialogVisible: false,
      // 表单的数据
      form: {
        currencyName: '',
        currencyRatio: ''
      },
      editForm: {
        currencyInfoId: '',
        currencyName: '',
        currencyRatio: ''
      },

      // 表单校验规则
      rules: {
        currencyName: [
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
        currencyRatio: [
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
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/currency/currencyInfoList',
        { params: { page: this.page, pageSize: this.pageSize } }
      )
      console.log(data)
      this.momeyManagementList = data.data
      this.total = data.count
      // console.log(this.$axios)
    }, // getMoneyList () {
    // 只要每页条数变化了, 触发
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      this.pageSize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.page = 1
      // 重新渲染
      this.getMoneyList()
    },
    // 只要当前页变化时, 触发函数
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 更新当前页
      this.page = val
      // 重新渲染
      this.getMoneyList()
    },
    showEditDialog (row) {
      this.editVisible = true
      console.log(row)
      // 回显基本的数据
      this.editForm.currencyName = row.currencyName
      this.editForm.currencyRatio = row.currencyRatio

      this.editForm.currencyInfoId = row.currencyInfoId
    },
    async delUser (id) {
      // console.log(id)
      // console.log(data)
      try {
        await this.$confirm('亲, 你确认要删除么?', '温馨提示', {
          type: 'warning'
        })
        const { data } = await this.$axios.post(
          'hbte-financial/hbte/currency/delCurrencyInfo',
          {
            currencyInfoId: id
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
      this.getMoneyList()
      // } else {
      //   this.$message.error('删除失败')
      // }
    },
    async editMoney () {
      const { data } = await this.$axios.post(
        'hbte-financial/hbte/currency/updateCurrencyInfo',
        this.editForm
      )
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
      try {
        await this.$refs.ruleForm.validate()
        this.dialogVisible = false
        const { data } = await this.$axios.post(
          'hbte-financial/hbte/currency/saveCurrencyInfo',
          this.form
        )
        if (data.code === 0) {
          this.$message.success('添加成功')
        } else {
          this.$message.error(data.errorMsg)
          // console.log(data.errorMsg)
        }
        this.getMoneyList()

        // console.log(data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button+.el-button {
    margin-left: 10px!important;
}
.search {
  width: 300px;
  margin-bottom: 10px;
}

.el-pagination {
  margin-top: 10px;
}
.addBtn {
  margin-bottom: 10px;
}
</style>
