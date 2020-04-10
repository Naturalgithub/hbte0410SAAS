<template>
  <div class="addArticle">
    <!-- 这是用户管理 -->
    <el-button type="success" class="four-btn" @click="AddUser">添加模块</el-button>
    <!-- 用户权限表格 -->

    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="moduleName" label="模块名称"></el-table-column>
      <!-- <el-table-column prop="roleDescribe" label="模块描述"></el-table-column> -->
      <el-table-column label="停用/启用">
        <template slot-scope="scope">
          <!-- {{scope.row.isDisable}} -->
          <el-switch
            @change="changeState(scope.row)"
            v-model="scope.row.isDisable"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="editthis(scope)"
            style="mragin-left:10px;margin-right:10"
          >编辑</el-link>&nbsp;&nbsp;|&nbsp;
          <!-- <el-link type="primary" @click="getpower" style="mragin-left:10px;margin-right:10">授权</el-link> -->
          <el-link type="danger" style="mragin-left:10px;margin-right:10" @click="delrole(scope)">删除</el-link>
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
      :page-sizes="[2,30, 50, 80]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加的模态框 -->
    <el-dialog title="新增模块" :visible.sync="AdddialogVisible" width="30%">
      <el-form :model="Addform" label-width="80px">
        <el-form-item label="模块名称">
          <el-input v-model="Addform.moduleName" placeholder="请输入模块名字"></el-input>
        </el-form-item>
        <el-form-item label="选择应用">
          <el-select v-model="Addform.appInfoIds" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.appInfoId"
              :label="item.appName"
              :value="item.appInfoId"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="模块描述">
          <el-input v-model="Addform.roleDescribe"></el-input>
        </el-form-item>-->
        <!-- <el-form-item label="状态">
          <el-input v-model="Addform.jueStatus"></el-input>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AdddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureadd">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑模态框 -->
    <el-dialog title="编辑" :visible.sync="EditdialogVisible" width="30%">
      <el-form :model="Editform" label-width="80px">
        <el-form-item label="模块名称">
          <el-input v-model="Editform.moduleName" placeholder="请输入模块名字"></el-input>
        </el-form-item>
        <el-form-item label="选择应用">
          <el-select v-model="Editform.appInfoIds" multiple placeholder="请选择">
            <el-option
              v-for="item1 in options"
              :key="item1.appInfoId"
              :label="item1.appName"
              :value="item1.appInfoId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureedit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 授权的模态框 -->
    <el-dialog title="模块授权" :visible.sync="GetpowerdialogVisible" width="30%">
      <el-tabs type="border-card">
        <el-tab-pane label="信息高速公路">信息高速公路</el-tab-pane>
        <el-tab-pane label="财务系统">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps"
          ></el-tree>
        </el-tab-pane>
        <el-tab-pane label="工时系统">工时系统</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="GetpowerdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="GetpowerdialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: '',
      optionss: '',
      // value: '',
      // 总条数
      total: 0,
      // 当前页
      page: 1,
      // 每页条数
      pageSize: 50,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      AdddialogVisible: false,
      EditdialogVisible: false,
      GetpowerdialogVisible: false,
      // 当前页数
      currentPage4: 4,
      value: true,
      // 添加表数据
      Addform: {
        // roleDescribe: '',
        moduleName: '',
        appInfoIds: ''
        // jueStatus: false
      },
      // 编辑表数据
      Editform: {
        moduleName: '',
        appInfoIds: ''
        // roleDescribe: ''
        // jueStatus: false
      },
      tableData: []
    }
  },
  created () {
    this.getJueseList()
    this.getappList()
  },
  methods: {
    async getappList () {
      const { data } = await this.$axios('hbte-dingding/app/list')
      console.log(data)
      this.options = data.result.appInfos
    },
    async changeState (row) {
      console.log(row.isDisable)
      if (row.isDisable == 2) {
        const { data } = await this.$axios.post('hbte-dingding/sys/update', {
          isDisable: row.isDisable,
          sysModuleId: row.sysModuleId
        })
        console.log(data)
        this.$message.info('停用后,首页将没有此模块')
        this.getJueseList()
      } else {
        const { data } = await this.$axios.post('hbte-dingding/sys/update', {
          isDisable: row.isDisable,
          sysModuleId: row.sysModuleId
        })
        console.log(data)
        this.getJueseList()
      }
    },
    async getJueseList () {
      const { data } = await this.$axios('hbte-dingding/sys/list', {
        params: { page: this.page, pageSize: this.pageSize }
      })
      console.log(data.result.sysModules)
      this.tableData = data.result.sysModules
      this.total = data.count
    },
    // 添加用户按钮
    AddUser () {
      this.AdddialogVisible = true
    },
    async sureadd () {
      const { data } = await this.$axios.post(
        'hbte-dingding/sys/add',
        this.Addform
      )
      console.log(data)
      if (data.code == 0) {
        this.$message.success('添加成功')
      } else {
        this.$message.error('添加失败')
      }
      this.getJueseList()
      this.AdddialogVisible = false
    },
    // 编辑按键
    editthis (obj) {
      this.EditdialogVisible = true
      console.log(obj.row)
      this.Editform.moduleName = obj.row.moduleName
      this.Editform.roleDescribe = obj.row.roleDescribe
      this.Editform.sysModuleId = obj.row.sysModuleId
      this.Editform.appInfoIds = obj.row.appInfoIds
    },
    async sureedit () {
      const { data } = await this.$axios.post(
        'hbte-dingding/sys/update',
        this.Editform
      )
      if (data.code == 0) {
        this.$message.success('修改成功')
      } else {
        this.$message.error('修改失败')
      }
      this.getJueseList()
      this.EditdialogVisible = false
    },
    // 删除
    async delrole (obj) {
      try {
        await this.$confirm('亲, 你确认要删除么?', '温馨提示', {
          type: 'warning'
        })
        let id = obj.row.sysModuleId
        const { data } = await this.$axios.post('hbte-dingding/sys/delete', {
          sysModuleId: id
        })
        if (data.code == 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          this.$message.error(data.message)
        }
      } catch (e) {
        console.log(e)
      }

      this.getJueseList()
    },
    // 授权按钮
    getpower () {
      this.GetpowerdialogVisible = true
    },
    // 只要每页条数变化了, 触发
    handleSizeChange (val) {
      // console.loSg(`每页 ${val} 条`)
      // 更新每页条数
      this.pageSize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.page = 1
      // 重新渲染
      this.getJueseList()
    },
    // 只要当前页变化时, 触发函数
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 更新当前页
      this.page = val
      // 重新渲染
      this.getJueseList()
    }
  }
}
</script>

<style lang='scss' scoped>
.four-btn {
  margin-bottom: 10px;
}
</style>
