<template>
  <div class="addArticle">
    <!-- 这是用户管理 -->
    <el-button type="success" class="four-btn" @click="AddUser">添加角色</el-button>
    <!-- 用户权限表格 -->

    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDescribe" label="角色描述"></el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="editthis(scope)"
            style="mragin-left:10px;margin-right:10"
          >编辑</el-link>&nbsp;&nbsp;|&nbsp;
          <el-link
            type="primary"
            @click="getpower(scope)"
            style="mragin-left:10px;margin-right:10"
          >应用授权</el-link>&nbsp;&nbsp;|&nbsp;
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
      :page-sizes="[30, 50, 80]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加的模态框 -->
    <el-dialog title="新增角色" :visible.sync="AdddialogVisible" width="30%">
      <el-form :model="Addform" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="Addform.roleName" placeholder="请输入角色名字"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="Addform.roleDescribe"></el-input>
        </el-form-item>
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
        <el-form-item label="角色名称">
          <el-input v-model="Editform.roleName" placeholder="请输入角色名字"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="Editform.roleDescribe"></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-input v-model="Editform.jueStatus"></el-input>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureedit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 授权的模态框 -->
    <el-dialog title="角色授权" :visible.sync="GetpowerdialogVisible" width="30%">
      <div>
        <!-- <el-tree
          :data="datademo"
          show-checkbox
          default-expand-all
          node-key="sysModuleId"
          ref="tree"
          highlight-current
          :props="defaultPropss"
        ></el-tree>-->
        <!-- <div v-for="item1 in datademo" :key="item1.sysModuleId"> -->
        <el-checkbox-group v-model="checkedCities" @change="getchange">
          <el-checkbox
            style="width:25%"
            v-for="item in datademo"
            :label="item.appInfoId"
            :key="item.appInfoId"
          >{{item.appName}}</el-checkbox>
        </el-checkbox-group>
        <!-- </div> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="GetpowerdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="surerole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkedCities: [],
      roleForm: {
        roloId: ''
      },
      datademo: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 总条数
      total: 0,
      // 当前页
      page: 1,
      // 每页条数
      pageSize: 50,
      data: [],
      defaultPropss: {
        children: 'appInfos',
        label: 'appName'
      },
      AdddialogVisible: false,
      EditdialogVisible: false,
      GetpowerdialogVisible: false,
      // 当前页数
      currentPage4: 4,
      value: true,
      // 添加表数据
      Addform: {
        roleDescribe: '',
        roleName: ''
        // jueStatus: false
      },
      // 编辑表数据
      Editform: {
        roleName: '',
        roleDescribe: ''
        // jueStatus: false
      },
      tableData: [
        {
          juename: '超级管理员',
          power: '信息高速公路,工时系统,财务系统'
        },
        {
          juename: '普通用户',
          power: '信息高速公路'
        }
      ]
    }
  },
  created () {
    this.getJueseList()
    this.gettreeList()
  },
  methods: {
    getchange () {
      console.log(this.checkedCities)
    },
    async surerole () {
      this.GetpowerdialogVisible = false
      // console.log(this.$refs.tree.getCheckedKeys())
      console.log(this.roleForm.roleId)

      const { data } = await this.$axios.post('hbte-dingding/role/updateRole', {
        roleId: this.roleForm.roleId,
        appInfoIds: this.checkedCities
      })
      console.log(data)
      if (data.code == 0) {
        this.$message.success('授权成功!')
      } else {
        this.$message.error(data.error)
      }
      this.getJueseList()
    },
    async gettreeList () {
      const { data } = await this.$axios('hbte-dingding/app/list')
      this.datademo = data.result.appInfos
      console.log(data.result)
    },
    async getJueseList () {
      const { data } = await this.$axios('hbte-dingding/role/list', {
        params: { page: this.page, pageSize: this.pageSize }
      })
      // console.log(data.result)
      this.tableData = data.result.roles
      this.total = data.count
      // console.log(this.quanlist)
    },
    // 添加用户按钮
    AddUser () {
      this.AdddialogVisible = true
    },
    async sureadd () {
      const { data } = await this.$axios.post(
        'hbte-dingding/role/addRole',
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
      this.Editform.roleName = obj.row.roleName
      this.Editform.roleDescribe = obj.row.roleDescribe
      this.Editform.roleId = obj.row.roleId
    },
    async sureedit () {
      const { data } = await this.$axios.post(
        'hbte-dingding/role/updateRole',
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
        let id = obj.row.roleId
        const { data } = await this.$axios.post('hbte-dingding/role/delete', {
          roleId: id
        })
        if (data.code == 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      } catch (e) {
        console.log(e)
      }

      this.getJueseList()
    },
    // 授权按钮
    async getpower (obj) {
      this.checkedCities = ''
      this.GetpowerdialogVisible = true
      // console.log(obj.row.roleId)
      this.roleForm.roloId = obj.row.roleId
      console.log(obj.row.roleId)
      const { data } = await this.$axios('hbte-dingding/role/getRole', {
        params: {
          roleId: obj.row.roleId
        }
      })
      this.roleForm.roleId = obj.row.roleId
      // console.log(data.result.role.appInfoIds)
      if (data.result.role.appInfoIds == undefined) {
      } else {
        this.checkedCities = data.result.role.appInfoIds
      }
    },
    // 只要每页条数变化了, 触发
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
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
