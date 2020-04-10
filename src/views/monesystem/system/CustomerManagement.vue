<template>
<!-- 客户管理 -->
  <div class="CustomerManagement">
    <!-- 按钮添加 -->
    <el-button
      class="addBtn"
      type="success"
      style="margin:0 0 10px 0"
      @click="dialogVisible = true"
    >添加</el-button>
    <el-button type="success" style="margin-bottom:20px" @click="daorubtn">导入</el-button>
    <!-- 导入模态框 -->
    <el-dialog title="导入" :visible.sync="daorudialogVisible" width="30%">
      <el-row>
        <!-- class="luruinput" -->
        <a href="###">
          <input type="file" ref="fileInput" @change="getFile" />
          <!-- 导&nbsp;&nbsp;&nbsp;&nbsp;入 -->
        </a>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="daorudialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureupload">确定录入</el-button>
      </span>
    </el-dialog>

    <!-- 列表 -->
    <el-table :data="CustomerManagement" border style="width: 100%" size="mini">
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="customerName" label="客户名称" />
      <el-table-column prop="customerPhone" label="客户联系电话" />
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
            @click="delUser(obj.row.customerInfoId)"
            type="danger"
            icon="el-icon-delete"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      style="margin-top:10px;"
      :current-page="page"
      @size-change="handleSizeChange"
      :page-sizes="[30, 50, 80]"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />
    <!-- 添加模态框 -->
    <el-dialog title="客户管理" :visible.sync="dialogVisible" width="35%">
      <span>
        <!-- 表单 -->
        <el-form :rules="rules" ref="ruleForm" :model="assignForm" label-width="80px">
          <el-form-item label="客户名称" prop="customerName">
            <el-input v-model="assignForm.customerName" placeholder="请输入客户名称" />
          </el-form-item>
          <el-form-item label="联系方式" prop="customerPhone">
            <el-input v-model="assignForm.customerPhone" placeholder="请输入联系方式" />
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">添 加</el-button>
      </span>
    </el-dialog>
    <!-- 编辑的对话框 -->
    <el-dialog title="修改" :visible.sync="editVisible" width="35%">
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px">
        <el-form-item label="客户名称">
          <el-input v-model="editForm.customerName" />
        </el-form-item>
        <el-form-item label="联系电话" prop="email">
          <el-input v-model="editForm.customerPhone" />
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
import $ from 'jquery'
export default {
  data () {
    return {
      baseurl: this.$store.state.baseurl,
      wenjian: '',
      form1: '',

      total: 0,
      // 当前页
      page: 1,
      // 每页条数
      pageSize: 50,
      CustomerManagement: [],
      dialogVisible: false,
      editVisible: false,
      // 添加表格
      assignForm: {
        customerName: '',
        customerPhone: ''
      },
      // 编辑表格
      editForm: {
        customerInfoId: '',
        customerName: '',
        customerPhone: ''
      },
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
      huixianame: '',
      errorMsg: '',
      successMsg: '',
      daorudialogVisible: false
    }
  },
  created () {
    this.getCMList()
  },
  methods: {
    daorubtn () {
      this.daorudialogVisible = true
    },
    async getFile (event) {
      let form = new FormData() // FormData 对象
      // console.log(form)
      this.form1 = form
      const files = event.target.files
      console.log(files[0])
      this.huixianame = files[0].name
      // console.log(event)
      this.wenjian = files[0]
      this.form1.append('file', this.wenjian) // 文件对象 注意第二个是一个文件对象
      this.form1.append('incomeExpenseType', 4) // 单据类型
      // 类似于 File { name: "付款.xls", lastModified: 1575285768023, lastModifiedDate: Mon Dec 02 2019 19: 22: 48 GMT + 0800(中国标准时间), webkitRelativePath: "", size: 22016, … }
    },
    async sureupload () {
      // this.huixianame = ''
      this.daorudialogVisible = false
      // console.log(this.wenjian)
      // console.log(this.form1)
      // let form = new FormData() // FormData 对象
      // form.append('file', this.wenjian ) // 文件对象
      let that = this
      $.ajax({
        url: `${that.baseurl}hbte-financial/hbte/customer/importCustomerInfo`,

        // 'http://192.168.2.38:8080/hbte-financial/hbte/customer/importCustomerInfo', // url地址
        type: 'POST', // 上传方式
        data: this.form1, // 上传formdata封装的数据
        dataType: 'JSON',
        cache: false, // 不缓存
        processData: false, // jQuery不要去处理发送的数据
        contentType: false, // jQuery不要去设置Content-Type请求头error
        success: function (data) {
          // 成功回调shu
          that.getCMList()
          console.log(data)
          if (data.code == 0) {
            that.$message.success('导入成功,不会覆盖原有数据')
          } else {
            that.$message.error(data.errorMsg)
          }
        },
        error: function (data) {
          // 失败回调
          console.log(data)
        }
      })
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      this.pageSize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.page = 1
      // 重新渲染
      this.getCMList()
    },
    // 只要当前页变化时, 触发函数
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 更新当前页
      this.page = val
      // 重新渲染
      this.getCMList()
    },
    async getCMList () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/customer/customerInfoList',
        { params: { page: this.page, pageSize: this.pageSize } }
      )
      console.log(data)
      this.CustomerManagement = data.data
      this.total = data.count
    },
    // 添加模态确定
    async addUser () {
      console.log(this.assignForm)

      try {
        console.log(this.assignForm)

        await this.$refs.ruleForm.validate()
        const { data } = this.$axios.post(
          'hbte-financial/hbte/customer/saveCustomerInfo',
          this.assignForm
        )
        this.getCMList()
        // this.assignForm.customerName = ''
        // this.assignForm.customerPhone = ''
        console.log(data)
        this.$message.success('添加成功')
        this.dialogVisible = false
      } catch (e) {
        console.log(e)
      }
      this.getCMList()
    },
    showEditDialog (row) {
      this.editVisible = true
      //  console.log(row)
      // 回显基本的数据
      this.editForm.customerName = row.customerName
      this.editForm.customerPhone = row.customerPhone

      this.editForm.customerInfoId = row.customerInfoId
    },
    async delUser (id) {
      console.log(id)

      // console.log(id)
      // console.log(data)
      try {
        await this.$confirm('亲, 你确认要删除么?', '温馨提示', {
          type: 'warning'
        })
        const { data } = await this.$axios.post(
          'hbte-financial/hbte/customer/delCustomerInfo',
          {
            customerInfoId: id
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

      this.getCMList()
    },
    // 编辑模态框
    async editMoney () {
      const { data } = await this.$axios.post(
        'hbte-financial/hbte/customer/updateCustomerInfo',
        this.editForm
      )
      if (data.code === 0) {
        this.$message.success('修改成功')
      } else {
        this.$message.error(data.errorMsg)
      }
      this.editVisible = false
      console.log(data)
      this.getCMList()
    }
  }
}
</script>

<style>
.luruinput {
  padding: 8px 20px 8px 20px;
  height: 20px;
  line-height: 20px;
  position: relative;
  cursor: pointer;
  color: rgb(103, 194, 58);
  background: rgb(240, 249, 235);
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  *display: inline;
  *zoom: 1;
}
.luruinput input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
}
.a-luruinput:hover {
  color: #444;
  background: #eee;
  border-color: #ccc;
  text-decoration: none;
}
</style>
