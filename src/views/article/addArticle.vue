<template>
  <div class="addArticle">
    <!-- 这是用户管理 -->
    <!-- <el-button type="success" class="four-btn" @click="AddUser">添加用户按钮</el-button> -->
    <!-- 用户权限表格 -->

    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <!-- <el-table-column label="停用/启用">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>-->
      <el-table-column prop="jobnumber" label="工号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="position" label="职位"></el-table-column>
      <!-- <el-table-column prop="tel" label="分机号"></el-table-column> -->
      <el-table-column prop="email" label="电子邮箱"></el-table-column>
      <el-table-column prop="workPlace" label="办公地点"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="editthis(scope)"
            style="mragin-left:10px;margin-right:10"
          >分配角色</el-link>
          <!-- <el-link type="danger" style="mragin-left:10px;margin-right:10">删除</el-link> -->
        </template>
      </el-table-column>
      <el-table-column label="后台管理权限">
        <template slot-scope="scope">
          <!-- {{scope.row.isDisable}} -->
          <el-switch
            @change="changeState(scope.row)"
            v-model="scope.row.isSysAdmin"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->

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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[30, 50, 80]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 编辑模态框 -->
    <el-dialog title="分配角色" :visible.sync="EditdialogVisible" width="30%">
      <el-form :model="Editform" label-width="80px">
        <!-- <el-form-item label="登录名">
          <el-input v-model="Editform.loginname" placeholder="请输入登录名字"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="Editform.userName"></el-input>
        </el-form-item>-->
        <el-form-item label="分配角色">
          <el-select v-model="Editform.roleIds" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="联系电话">
          <el-input v-model="Editform.mobileNumber"></el-input>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="Editform.address"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="Editform.email"></el-input>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureedit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      AdddialogVisible: false,
      EditdialogVisible: false,
      // 当前页数
      // 总条数
      total: 0,
      // 当前页
      page: 1,
      // 每页条数
      pageSize: 50,
      value: true,
      // 添加表数据
      Addform: {
        loginname: '',
        userName: '',
        mobileNumber: '',
        address: '',
        email: '',
        jueName: ''
      },
      Editform: {
        loginname: '',
        userName: '',
        mobileNumber: '',
        address: '',
        email: '',
        jueName: '',
        roleIds: [],
        id: ''
      },
      tableData: [
        {
          mobileNumber: '15615655656',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          jueName: '超级管理员',
          value: true,
          email: '5555@qq.com'
        },
        {
          mobileNumber: '12215655656',
          name: '赵小虎',
          address: '北京市朝阳区某江路 898 号',
          jueName: '普通用户',
          value: false,
          email: '5555@qq.com'
        }
      ],
      options: [
        {
          value: '选项1',
          label: '超级管理员'
        },
        {
          value: '选项2',
          label: '普通用户'
        }
      ],
      value1: []
    }
  },
  created () {
    this.getUserlist()
    this.getuserrole()
  },
  methods: {
    async changeState (row) {
      console.log(row)
      console.log(row.userId)

      if (row.isDisable == 2) {
        const { data } = await this.$axios.post('hbte-dingding/user/update', {
          isSysAdmin: row.isSysAdmin,
          userId: row.userId
        })
        console.log(data)
        this.$message.info('停用后,用户无法访问后台管理系统')
        this.getUserlist()
      } else {
        const { data } = await this.$axios.post('hbte-dingding/user/update', {
          isSysAdmin: row.isSysAdmin,
          userId: row.userId
        })
        console.log(data)
        this.getUserlist()
      }
    },
    async getuserrole () {
      const { data } = await this.$axios('hbte-dingding/role/list')
      console.log(data.result.roles)
      this.options = data.result.roles
    },
    async getUserlist () {
      const { data } = await this.$axios.get('hbte-dingding/user/list', {
        params: { page: this.page, pageSize: this.pageSize }
      })
      console.log(data)
      this.tableData = data.result.users
      this.total = data.count
    },

    // 编辑按键
    editthis (scope) {
      console.log(scope.row.id)
      // /user/update
      this.Editform.id = scope.row.id
      this.Editform.roleIds = scope.row.roleIds
      this.EditdialogVisible = true
    },
    async sureedit () {
      this.EditdialogVisible = false
      const { data } = await this.$axios.post(
        'hbte-dingding/user/update',
        this.Editform
      )
      if (data.code == 0) {
        this.$message.success('添加成功')
        this.Editform.roleIds = []
        this.getUserlist()
      } else {
        this.Editform.roleIds = []
        this.$message.error(data.error)
      }
      this.getUserlist()
    },

    // 只要每页条数变化了, 触发
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      this.pageSize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.page = 1
      // 重新渲染
      this.getUserlist()
    },
    // 只要当前页变化时, 触发函数
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 更新当前页
      this.page = val
      // 重新渲染
      this.getUserlist()
    }
  }
}
</script>

<style lang='scss' scoped>
.four-btn {
  margin-bottom: 10px;
}
</style>
