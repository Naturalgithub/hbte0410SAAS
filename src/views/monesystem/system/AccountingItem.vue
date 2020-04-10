/* eslint-disable no-sequences */
<template>
  <div class="AccountingItem">
    <!-- 按钮添加 -->
    <el-button class="addBtn"
               type="success"
               style="margin-bottom:10px"
               @click="dialogVisible = true">添加会计科目</el-button>
    <el-button class="addBtn  "
               type="success"
               style="margin-bottom:10px"
               @click="adddialogFormula">添加公式</el-button>

    <!-- 树形图 -->
    <!-- default-expand-all -->
    <div class="block "
         style="margin-top:10px">
      <el-tree class="fl"
               :data="data"
               node-key="id"
               style="width:20%"
               :props="defaultProps"
               :expand-on-click-node="false"
               @node-click="handleNodeClick">
        <span slot-scope="{ node, data }"
              class="custom-tree-node">
          <span class="el-icon-notebook-2">&nbsp;&nbsp;{{ data.accountTitleCode }}-{{ node.label }}</span>
          <span>
            <el-button type="text"
                       size="mini"
                       @click="() => append(data)">修改</el-button>
            <el-button type="text"
                       size="mini"
                       @click="() => remove(node, data)">删除</el-button>
          </span>
        </span>
      </el-tree>
    </div>

    <div class="fr">

      <el-table :data="projectList"
                border
                size="mini">
        <el-table-column align="center"
                         type="index"
                         label="序号">
        </el-table-column>
        <el-table-column align="center"
                         prop="arithmeticName"
                         label="算法名称">

        </el-table-column>
        <el-table-column align="center"
                         wdith:1000
                         prop="arithmeticEquation"
                         label="公式">

        </el-table-column>
        <el-table-column align="center"
                         prop="arithmeticComment"
                         label="备注">

        </el-table-column>
        <el-table-column align="center"
                         label="状态">
          <template v-slot:default="obj">
            <el-switch v-model="obj.row.arithmeticStatus"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       :active-value="1"
                       :inactive-value="2"
                       @change=changee($event,obj.row)>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label=编辑>
          <template v-slot:default="obj">
            <el-button plain
                       size="small"
                       @click="showEditDialog(obj.row)"
                       type="primary"
                       icon="el-icon-edit" />
            <el-button plain
                       size="small"
                       type="danger"
                       icon="el-icon-delete"
                       @click="delequation(obj.row)" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top:10px"
                     background
                     :current-page="page"
                     @size-change="handleSizeChange"
                     :page-sizes="[30, 50, 80]"
                     @current-change="handleCurrentChange"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total" />
    </div>
    <!-- 添加对话框 -->
    <!-- 添加的对话框 -->
    <el-dialog title="会计科目管理"
               :visible.sync="dialogVisible"
               width="35%">
      <el-form ref="form"
               :model="form"
               label-width="80px">
        <el-form-item label="会计科目">
          <!-- 级联选择器 -->
          <!-- <el-cascader :options="options"
                       :props="cprops"
                       clearable
                       placeholder="请选择(默认为一级分类)"
                       @change="handleChange">
            <template v-slot:default="obj">
              <span>{{ obj.data.accountTitleCode }}-{{ obj.data.accountTitleName }}</span>
            </template>
          </el-cascader> -->
          <el-select v-model="handleChangeValue"
                     @change='handleChange'
                     placeholder="请选择科目">
            <el-option v-for="item in options"
                       :key="item.accountTitleId"
                       :label="item.accountTitleName"
                       :value="item.accountTitleId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科目名称"
                      prop="name">
          <el-input v-model="form.accountTitleName"
                    placeholder="请输入会计科目名称" />
        </el-form-item>
        <el-form-item label="科目编码"
                      prop="email">
          <el-input v-model="form.accountTitleCode"
                    placeholder="请输入会计科目编码" />
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改框对话框 -->
    <el-dialog title="修改"
               :visible.sync="changedialogVisible"
               width="35%">
      <el-form ref="form"
               :model="changeform"
               label-width="80px">
        <el-form-item label="科目名称">
          <el-input v-model="changeform.accountTitleName" />
        </el-form-item>
        <el-form-item label="科目编码">
          <el-input v-model="changeform.accountTitleCode" />
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="changedialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="changeaddUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加公式的对话框 -->
    <el-dialog :title="title"
               :visible.sync="dialogFormula"
               width="35%">
      <el-form ref="equationPass"
               :model="equationPass"
               label-width="80px">
        <el-form-item label="算法名称">
          <!-- 级联选择器 -->
          <el-input v-model="equationPass.arithmeticName"></el-input>
        </el-form-item>
        <el-form-item label="算法描述">
          <!-- 级联选择器 -->
          <el-input v-model="equationPass.arithmeticComment"></el-input>
        </el-form-item>
        <el-form-item label="公式">
          <el-input v-model="equation"
                    @keyup.delete.native='backSpace'></el-input>
        </el-form-item>
        <el-form-item label="选择">
          <el-row>
            <el-col :span="12"
                    style="margin-right:10px;padding-right:10px">
              <div class="grid-content bg-purple">
                <el-select v-model="accountValue"
                           @change='accountValueChange'
                           placeholder="请选择科目">
                  <el-option v-for="item in options"
                             :key="item.accountTitleId"
                             :label="item.accountTitleName"
                             :value="item.accountTitleId">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="11">
              <div class="grid-content bg-purple-light">
                <el-select v-model="operateValue"
                           @change=operateValuechange
                           placeholder="请选择运算符">
                  <el-option v-for="item in operateOptions"
                             :key="item.id"
                             :label="item.value"
                             :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogFormula = false">取 消</el-button>
        <el-button type="primary"
                   @click="addFor">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
export default {
  data () {
    return {
      handleChangeValue: '',
      title: '',
      pageSize: 30,
      total: 0,
      page: 1,
      accountValue: '',
      operateValue: '',
      operateOptions: [
        {
          value: '+',
          label: '+',
          id: 1
        },
        {
          value: '-',
          label: '-',
          id: 2
        },
        {
          value: '*',
          label: '*',
          id: 3
        },
        {
          value: '/',
          label: '/',
          id: 4
        },
        {
          value: '=',
          label: '=',
          id: 5
        },
        {
          value: '(',
          label: '(',
          id: 6
        },
        {
          value: ')',
          label: ')',
          id: 7
        }
      ],
      AcctountOptions: [],
      // 级联数据
      options: [],
      // 树形显示
      defaultProps: {
        children: 'children',
        label: 'accountTitleName'
      },
      // 级联选择器
      cprops: {
        checkStrictly: true,
        label: 'accountTitleName',
        value: 'accountTitleId',
        // value: '[accountTitleId,accountTitleName,accountTitleParentId]',
        children: 'children'
      },
      data: [],
      addTit: false,
      addForm: false,
      dialogFormula: false,
      dialogVisible: false,
      changedialogVisible: false,
      changedialogFormula: false,
      form: {
        accountTitleId: '',
        accountTitleName: '',
        accountTitleCode: ''
      },
      changeform: {
        accountTitleId: '',
        accountTitleName: '',
        accountTitleCode: ''
      },
      formaa: {},
      ddd: '',
      projectList: [],
      postArr: [],
      equation: '',
      equations: [],
      equationPass: {
        id: '',
        arithmeticName: '',
        arithmeticComment: '',
        equations: [],
        arithmeticStatus: ''
        // 'operandAddresInfos': [{
        //   'accountTitle': {
        //     'accountTitleId': 1
        //   },
        //   'priority': 1
        // }, {
        //   'accountTitle': {
        //     'accountTitleId': 2
        //   },
        //   'priority': 2
        // }],
        // 'operatorInfos': [{
        //   'operatorType': '+',
        //   'priority': 2
        // }, {
        //   'operatorType': '-',
        //   'priority': 3
        // }]
      }
    }
  },
  created () {
    this.getAccountingItemList()
    this.getArithmeticList()
  },
  methods: {
    async changee ($event, row) {
      console.log($event, row.id)
      const { data } = await this.$axios.post(
        'hbte-financial/hbte/arithmetic/update_status',
        {
          arithmeticStatus: $event,
          id: row.id
        }
      )
      if (data.code == 0) {
        this.$message.success('修改成功')
        this.getArithmeticList()
      } else {
        this.$message.error(data.errorMsg)
      }
    },
    async delequation (row) {
      console.log(row)
      try {
        await this.$confirm('亲, 你确认要删除么?', '温馨提示', {
          type: 'warning'
        })
        const { data } = await this.$axios.post(
          'hbte-financial/hbte/arithmetic/delete',
          {
            id: row.id
          }
        )
        if (data.code === 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getArithmeticList()
        } else {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    showEditDialog (row) {
      console.log(row)

      this.equationPass.id = row.id
      this.equation = []
      this.equationPass.equations = []
      this.dialogFormula = true
      this.$nextTick(() => {
        this.equationPass.arithmeticName = row.arithmeticName
        this.equationPass.arithmeticEquation = row.arithmeticEquation
        this.equationPass.arithmeticComment = row.arithmeticComment
        this.equationPass.arithmeticStatus = row.arithmeticStatus
        // this.equationPass.arithmeticComment = row.arithmeticComment
        // this.passAddForm.content = row.content
        // this.passAddForm.id = row.id
        this.title = '修改公式'
      })
    },
    adddialogFormula () {
      this.dialogFormula = true
      this.title = '添加公式'
      this.equationPass.arithmeticName = ''
      this.equationPass.arithmeticEquation = ''
      this.equationPass.arithmeticComment = ''
      this.equation = []
      // this.equationPass.equations = []
    },
    async getArithmeticList () {
      const data = await this.$axios.get(
        'hbte-financial/hbte/arithmetic/list',
        { params: { page: this.page, pageSize: this.pageSize } }
      )
      console.log(data.data.data);
      // eslint-disable-next-line no-unused-expressions
      (this.projectList = data.data.data), (this.total = data.data.data.length)
    },
    backSpace () {
      console.log(2)
      this.postArr.pop()
      this.equationPass.equations.pop()
      this.equation = this.postArr.join('')
      // console.log(this.postArr)
    },
    accountValueChange (v) {
      this.operateValue = ''
      // console.log(v)

      // console.log(this.postArr)
      // console.log(this.options)

      this.equationPass.equations.push(v.toString())
      let obj = this.options.filter(item => item.accountTitleId == v)
      console.log(obj[0].accountTitleName)
      this.postArr.push(obj[0].accountTitleName)

      this.equation = this.postArr.join('')
      // console.log(this.equations)
    },
    operateValuechange (v) {
      this.accountValue = ''
      console.log(v)
      this.postArr.push(v)
      this.equationPass.equations.push(v)
      console.log(this.postArr)
      this.equation = this.postArr.join('')
      console.log(this.equations)
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      this.pageSize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.page = 1
      // 重新渲染
      // this.getMoneyList()
    },
    // 只要当前页变化时, 触发函数
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 更新当前页
      this.page = val
      // 重新渲染
      // this.getMoneyList()
    },
    // 添加科目名称框
    async addUser () {
      const data = await this.$http.saveAccountTitle(this.form)
      console.log(data)
      this.dialogVisible = false
      if (data.code == 0) {
        this.$message.success('添加成功')
      } else {
        this.$message.error(data.errorMsg)
      }
      this.getAccountingItemList()
    },
    async changeaddUser () {
      const { data } = await this.$http.updateAccountTitle(this.changeform)
      // console.log(data)
      this.$message.success('修改成功')
      this.changedialogVisible = false
      this.getAccountingItemList()
    },
    // 添加公式名称框
    async addFor () {
      console.log(this.equationPass.equations)

      console.log(
        this.equationPass.equations[this.equationPass.equations.length - 1]
      )
      // eslint-disable-next-line standard/computed-property-even-spacing
      let num = this.equationPass.equations[
        this.equationPass.equations.length - 1
      ]
      console.log(num)

      if (
        num == '+' ||
        num == '-' ||
        num == ')' ||
        num == '=' ||
        num == '/' ||
        num == '(' ||
        num == '*' ||
        num == '='
      ) {
        return
      }
      // else {
      // this.equationPass.equations = this.equationPass.equations.join('')
      if (this.title == '修改公式') {
        const { data } = await this.$axios.post(
          'hbte-financial/hbte/arithmetic/update',
          this.equationPass
        )

        if (data.code == 0) {
          this.$message.success('操作成功')
          this.dialogFormula = false
          this.getArithmeticList()
        } else {
          this.$message.error(data.errorMsg)
        }
      } else {
        const { data } = await this.$axios.post(
          'hbte-financial/hbte/arithmetic/add',
          this.equationPass
        )
        // console.log(data.operatorInfos.operatorType)
        this.dialogFormula = false
        if (data.code == 0) {
          this.$message.success('添加成功')
          this.equationPass.arithmeticName = ''
          this.equationPass.arithmeticComment = ''
          this.equation = ''
          this.dialogFormula = false
          this.getArithmeticList()
        } else {
          this.$message.error(data.errorMsg)
        }
      }

      // this.$message.success('添加成功')
      // this.getAccountingItemList()
      // }
    },
    async changeaddFor () {
      const { data } = await this.$http.updateArith()
      console.log(data)
      // this.$message.success('修改成功')
      this.changedialogFormula = false
      // this.getAccountingItemList()
    },
    // 会计科目级联选择器
    handleChange (value) {
      // console.log(value[value.length - 1])
      this.form.accountTitleId = value
    },
    // 树形图
    append (data) {
      // console.log(data)
      this.changedialogVisible = true
      this.changeform.accountTitleId = data.accountTitleId
      this.changeform.accountTitleName = data.accountTitleName
      this.changeform.accountTitleCode = data.accountTitleCode
    },
    async getAccountingItemList () {
      const { data } = await this.$http.accountTitleList()
      // console.log(data)
      // setDisable
      this.data = data
      this.options = data
    },

    async remove (node, dataa) {
      try {
        await this.$confirm(
          '确认要删除么?(若删除父级目录则子目录内容全部删除)',
          '温馨提示',
          {
            type: 'warning'
          }
        )
        // 能到这里, 说明确认了

        const data = await this.$http.delAccountTitle({
          accountTitleId: dataa.accountTitleId
        })
        // console.log(dat)
        if (data.code == 0) {
          this.$message.success('删除成功')
          // 重新渲染
        } else {
          console.log(22)

          this.$message.error(data.errorMsg)
        }
      } catch (e) {
        // console.log(e)
      }
      this.getAccountingItemList()
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    async handleNodeClick (data, checked, node) {
      console.log(data.id)
      this.passId = data.id
      this.getProjectList()
    },

    async getProjectList () {
      const res = await this.$http.delAccountTitle({
        accountTitleId: data.accountTitleId
      })
      console.log(res)
      this.total = res.result.length
      this.projectList = res.result
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

<style >
.ps {
  position: relative;
}
.psSon {
  position: absolute;
  top: -60px;
}
.dialog-cont {
  margin-left: 35%;
}
.el-cascader-menu__wrap {
  width: 100%;
}
.AccountingItem {
  width: 100%;
  height: 100%;
}
.el-button + .el-button {
  margin-left: 10px !important;
}
.el-select {
  width: 100%;
}
.fl {
  float: left;
  background-color: #fff;
  height: 90%;
}
.fr {
  padding-left: 35%;
  /* padding-right: 1%; */
}
.ml10 {
  width: 70%;
}
.el-cascader {
  width: 100% !important;
}
</style>
