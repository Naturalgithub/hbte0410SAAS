<template>
<!-- 部门管理           -->
  <div class="AccountingItem">
    <!-- 按钮添加 -->
    <el-button
      class="addBtn"
      type="success"
      plain
      style="margin-bottom:10px"
      @click="dialogVisible = true"
    >部门添加</el-button>
    <!-- 树形图 -->
    <!-- default-expand-all -->
    <div class="block">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        :expand-on-click-node="false"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{data.title}}</span>
          <span>
            <el-button type="text" size="mini" @click="() => append(data)">修改</el-button>
            <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <!-- 添加对话框 -->
    <!-- 添加的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="25%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="部门选择">
          <!-- 级联选择器 -->
          <el-cascader
            :options="options"
            :props="cprops"
            clearable
            placeholder="请选择(默认为一级部门)"
            @change="handleChange"
          >
            <template v-slot:default="obj">
              <span>{{ obj.data.departmentName }}</span>
              <!-- <span v-if="!node.isLeaf">({{ data.children.length }})</span> -->
            </template>
          </el-cascader>
          <!-- <div class="block">
            <el-cascader :props="cprops" :options="options" @change="handleChange"></el-cascader>
          </div>-->
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="form.departmentName" placeholder="请输入部门名称"/>
        </el-form-item>
        <el-form-item label="部门编码" prop="email">
          <el-input v-model="form.departmentCode" placeholder="请输入部门编码"/>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改框对话框 -->
    <el-dialog title="修改部门" :visible.sync="changedialogVisible" width="25%">
      <el-form ref="form" :model="changeform" label-width="80px">
        <el-form-item label="部门名称">
          <el-input v-model="changeform.departmentName"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeaddUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
      // 级联数据
      options: [],
      // 树形显示
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      // 级联选择器
      cprops: {
        checkStrictly: true,
        label: 'title',
        value: 'id',
        // value: '[departmentId,accountTitleName,accountTitleParentId]',
        children: 'children'
      },
      data: [],
      dialogVisible: false,
      changedialogVisible: false,
      form: {
        departmentId: '',
        departmentName: '',
        departmentCode: ''
      },
      changeform: {
        departmentId: '',
        departmentName: ''
      }
    }
  },
  created () {
    this.getAccountingItemList()
  },
  methods: {
    async addUser () {
      // try {
      //   await this.$refs.ruleForm.validate()
      // } catch (e) {
      //   console.log(e)
      // }
      this.dialogVisible = false
      const aa = await this.$axios.post(
        'hbte-financial/hbte/department/saveDepartment',
        this.form
      )
      // console.log(aa)
      if (aa.status === 200) {
        this.$message.success('录入成功')
      } else {
        this.$message.error('aa.errMsg')
      }
      this.getAccountingItemList()
    },
    changeaddUser () {},
    // 会计科目级联选择器
    handleChange (value) {
      // console.log(value[value.length - 1])
      this.form.departmentId = value[value.length - 1] || -1
      // console.log(this.form.departmentId)
    },
    // 树形图
    append (data) {
      // console.log(data)
      this.changedialogVisible = true
      this.changeform.departmentId = data.departmentId
      this.changeform.departmentName = data.departmentName
    },
    async getAccountingItemList () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/department/departmentUserList'
      )
      // console.log(data.data)
      this.data = data.data
      this.options = data.data
    },

    async remove (node, data) {
      // const { aa } = await this.$axios.post(
      //   'hbte-financial/hbte/accountTitle/delAccountTitle',
      //   data.departmentId
      // )
      // console.log(2323)
      try {
        await this.$confirm('亲, 你确认要删除么?', '温馨提示', {
          type: 'warning'
        })
        // console.log(data.departmentId)

        // 能到这里, 说明确认了
        const { aa } = await this.$axios.post(
          'hbte-financial/hbte/department/delDepartment',
          { departmentId: data.departmentId }
        )
        // console.log(aa)
        if (aa.code === 0) {
          this.$message.success('录入成功')
          // 重新渲染
        } else {
          this.$message.error('录入失败')
        }
      } catch (e) {
        console.log(e)
      }
      this.getAccountingItemList()
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },

    renderContent (h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      )
    }
  }
}
</script>

<style>
</style>
