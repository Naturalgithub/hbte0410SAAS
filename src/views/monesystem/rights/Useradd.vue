<template>
  <div class="useradd">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 按钮添加 -->
    <el-button
      class="addBtn"
      type="success"
      plain
      style="margin-bottom:10px"
      @click="dialogVisible = true"
    >用户添加</el-button>
    <!-- 列表 -->
    <el-table :data="CustomerManagement" border style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="jobNumber" label="工号"></el-table-column>
      <el-table-column prop="userName" label="姓名"></el-table-column>
      <el-table-column label="操作">
        <template v-slot:default="obj">
          <el-button
            @click="showEditDialog(obj.row)"
            plain
            size="small"
            type="primary"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            @click="delUser(obj.row.customerInfoId)"
            plain
            size="small"
            type="danger"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="margin-top:10px"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[30,50,80]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加模态框 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%">
      <span>
        <!-- 表单 -->
        <el-form :model="assignForm" ref="assignForm" label-width="80px">
          <el-form-item label="用户工号">
            <el-input placeholder="请输入工号" v-model="assignForm.jobNumber"></el-input>
            <!-- <el-tag type="info">{{ assignForm.username }}</el-tag> -->
          </el-form-item>
          <el-form-item label="用户名称">
            <el-input placeholder="请输入用户名称" v-model="assignForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="用户密码">
            <el-input placeholder="请输入用户密码" v-model="assignForm.password"></el-input>
          </el-form-item>
          <el-form-item label="所在部门">
            <!-- 级联选择器 -->
            <div class="block">
              <el-cascader
                :options="options"
                :props="{
                    checkStrictly: true,
                    label: 'departmentName',
                    value: 'departmentId',
                    // value: '[accountTitleId,accountTitleName,accountTitleParentId]',
                    children: 'children'
                }"
                clearable
                @change="bmhandleChange"
                placeholder="请选择(默认为一级分类)"
              >
                <template v-slot:default="obj">
                  <span>{{ obj.data.departmentName}}</span>
                  <!-- <span v-if="!node.isLeaf">({{ data.children.length }})</span> -->
                </template>
              </el-cascader>
            </div>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      total: 0,
      // 当前页
      page: 1,
      // 每页条数
      pageSize: 50,
      CustomerManagement: [],
      dialogVisible: false,
      // 级联选择器
      options: [],
      value: '',
      // 添加表格
      assignForm: {
        jobNumber: '',
        userName: '',
        password: '',
        departmentId: ''
      }
    }
  },
  created () {
    this.getCMList()
    this.getdepartmentId()
  },
  methods: {
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
    bmhandleChange () {},
    async getdepartmentId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/department/departmentList'
      )
      console.log(data.data)
      this.options = data.data
    },
    async getCMList () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/userInfo/userInfoList',
        { params: { page: this.page, pageSize: this.pageSize } }
      )
      console.log(data)
      this.CustomerManagement = data.data
      this.total = data.count
    },
    addUser () {},
    showEditDialog () {},
    delUser () {}
    // 添加模态确定
    // async addUser () {
    //   console.log(this.assignForm)

    //   try {
    //     console.log(this.assignForm)

    //     await this.$refs.assignForm.validate()
    //     const { data } = this.$axios.post(
    //       'customer/saveCustomerInfo',
    //       this.assignForm
    //     )
    //     // this.assignForm.customerName = ''
    //     // this.assignForm.customerPhone = ''
    //     console.log(data)
    //     this.$message.success('添加成功')
    //     this.dialogVisible = false
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
  }
}
</script>

<style>
</style>
