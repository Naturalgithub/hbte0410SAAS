<template>
<!-- 产品管理 -->
  <div class="AccountingItem">
    <div>
      <!-- style="border-bottom: 2px solid orange;margin-bottom:10px" -->
      <el-row>
        <el-col :span="6">
          <!-- 按钮添加 -->
          <el-button class="addBtn" type="success" @click="dialogVisible = true">添加</el-button>
        </el-col>

        <el-col :span="6">
          <el-form>
            <el-form-item label=" 上传时间:">
              <el-date-picker
                style="width:70%"
                v-model="timeValue"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="searchTime"
                value-format="yyyy-MM"
                clearable
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form>
            <el-form-item label="上传类型">
              <el-select
                style="width:70%"
                v-model="typeValue"
                placeholder="请选择"
                @change="upLoadType"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form>
            <el-form-item label="软件名称">
              <el-input v-model="PJName" style="width:50%" @keyup.native="searchPJName"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <!-- <el-form :inline="true">
      <el-row>
        <el-col :span="6">
          <el-form-item label="软件名称">
            <el-input :lg="12" v-model="customerName" @keyup.native="searchCst"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5"></el-col>
      </el-row>
    </el-form>-->
    <!-- 树形图 -->
    <!-- default-expand-all -->
    <div class="block fl" style="width:20%">
      <el-tree
        ref="treeBox"
        :data="data"
        node-key="id"
        :props="defaultProps"
        highlight-current
        @node-click="handleNodeClick"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span class="el-icon-notebook-2">&nbsp;&nbsp;{{ data.productName }}</span>
          <!-- <span class="el-icon-notebook-2">&nbsp;&nbsp;{{ data.productName }}-{{ node.label }}</span> -->
          <span>
            <el-button
              type="text"
              size="mini"
              @click="() => append(data)"
            >&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 修改</el-button>
            <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <div class="fr ml10">
      <el-table :data="projectList" border size="mini">
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column align="center" prop="name" label="名称"></el-table-column>

        <el-table-column align="center" prop="version" label="版本信息"></el-table-column>
        <el-table-column align="center" prop="user.name" label="上传人"></el-table-column>
        <el-table-column align="center" prop="uploadTime" label="上传时间"></el-table-column>
        <el-table-column align="center" prop="swProject.projectName" label="项目名称"></el-table-column>
        <el-table-column align="center" prop="swProject.comment" label="描述"></el-table-column>
        <el-table-column align="center" prop="downloadSize" label="下载次数"></el-table-column>
        <el-table-column align="center" prop="swProject.comment" label="操作">
          <template v-slot:default="obj">
            <el-button
              plain
              size="small"
              @click="showDownDialog(obj.row)"
              type="primary"
              icon="el-icon-download"
            ></el-button>
            <el-button
              plain
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="delCurrentProduct(obj.row)"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:10px"
        background
        :current-page="page"
        @size-change="handleSizeChange"
        :page-sizes="[30, 50, 80]"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </div>
    <!-- 添加对话框 -->
    <!-- 添加的对话框 -->
    <el-dialog title="产品线管理" :visible.sync="dialogVisible" width="40%">
      <el-form ref="form1" :model="form" label-width="80px">
        <el-form-item label="名称" prop="productName">
          <el-input v-model="form.productName" placeholder="名称" />
        </el-form-item>
        <el-form-item label="产品线">
          <el-cascader
            style="width:100%"
            :options="options"
            :props="cprops"
            clearable
            placeholder="请选择(默认为一级分类)"
            @change="handleChange"
          >
            <template v-slot:default="obj">
              <span>{{ obj.data.productName }}</span>
            </template>
          </el-cascader>
        </el-form-item>
        <!-- <el-form-item label="软件名称">
          <el-select v-model="softwareName" multiple placeholder="请选择">
            <el-option
              v-for="item in softwareListoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProdcutName">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改框对话框 -->
    <el-dialog title="修改" :visible.sync="changedialogVisible" width="40%">
      <el-form ref="form" :model="changeform" label-width="80px">
        <el-form-item label="产品名称">
          <el-input v-model="changeform.productName" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeProductList">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 下载 -->
    <el-dialog title="下载" :visible.sync="downdialogVisible" width="40%">
      <el-form ref="downForm" :model="downForm" :rules="rules" label-width="100px">
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model="downForm.customerName" />
        </el-form-item>
        <el-form-item label="使用人" prop="useName">
          <el-input v-model="downForm.useName" />
        </el-form-item>
        <el-form-item label="使用部门" prop="useDepartment">
          <el-input v-model="downForm.useDepartment" />
        </el-form-item>
        <el-form-item label="客户地址" prop="customerAddress">
          <el-input v-model="downForm.customerAddress" />
        </el-form-item>
        <el-form-item label="客户邮箱" prop="customerEmail">
          <el-input v-model="downForm.customerEmail" />
        </el-form-item>
        <!-- <el-form-item label="联系方式">
          <el-input v-model="downForm.phoneType" />
        </el-form-item>-->
        <el-form-item label="设备信息">
          <el-input v-model="downForm.deviceInfo" />
        </el-form-item>
        <el-form-item label="固件信息" prop>
          <el-input v-model="downForm.firmwareInfo" />
        </el-form-item>
        <el-form-item label="备注" prop>
          <el-input v-model="downForm.comment" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="downdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="downloadProduct">下 载</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      softwareName: [],
      softwareListoptions: [],
      typeValue: '',
      typeOptions: [
        { value: 2, label: '文档' }, { value: 1, label: '软件' }, { value: '', label: '全部' }
      ],
      uploadAddress: '',
      PJName: '',
      rules: {
        customerName: [
          { required: true, message: '请输入客户名称', trigger: ['blur', 'change'] }
        ],
        useName: [
          { required: true, message: '请输入使用人', trigger: ['blur', 'change'] }
        ],
        useDepartment: [
          { required: true, message: '请输入使用部门', trigger: ['blur', 'change'] }
        ],
        customerAddress: [
          { required: true, message: '请输入客户地址', trigger: ['blur', 'change'] }
        ],
        customerEmail: [
          { required: true, message: '请输入客户邮箱', trigger: ['blur', 'change'] }
        ]
      },
      startTime: '',
      endTime: '',
      passId: '',
      downdialogVisible: false,
      downForm: {
        user: { id: '' },
        software: { id: '' },
        customerName: '',
        useName: '',
        useDepartment: '',
        customerAddress: '',
        customerEmail: '',
        deviceInfo: '',
        firmwareInfo: '',
        comment: ''
      },
      timeValue: '',
      pagenum: '',
      total: 0,
      page: 1,
      pageSize: 50,
      // 级联数据
      options: [],
      // 树形显示
      defaultProps: {
        children: 'children',
        label: 'accountTitleName'
      },
      addData: '',
      // 级联选择器
      cprops: {
        checkStrictly: true,
        label: 'productName',
        value: 'id',
        // value: '[accountTitleId,accountTitleName,accountTitleParentId]',
        children: 'children'
      },
      data: [],
      dialogVisible: false,
      changedialogVisible: false,
      form: {
        parentId: '',
        productName: ''
      },
      changeform: {
        id: '',
        productName: ''
      },
      projectList: []
    }
  },
  created () {
    this.getSoftwareLists()
    this.getProductList()
    // this.getSoftwareList()
    this.downForm.user.id = +JSON.parse(localStorage.getItem('data')).id
    // console.log(this.userId)
    this.$nextTick(() => {
      this.$refs.treeBox.setCurrentKey(24) // treeBox 元素的ref   value 绑定的node-key
    })
  },
  methods: {
    async getSoftwareLists () {
      const res = await this.$http.getSoftwareList({ page: 1, pageSize: 1000 })
      console.log(res.result)
    },
    async delCurrentProduct (row) {
      console.log(row)
      try {
        await this.$confirm('亲, 你确认要删除么?', '温馨提示', {
          type: 'warning'
        })
        const res = await this.$http.deleteProductList({ id: this.passId, software: { id: row.id } })
        if (res.code == 0) {
          this.$message.success('删除成功')
          this.getSoftwareList()
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        console.log(e)
      }
    },
    upLoadType () { this.getSoftwareList() },
    async addProdcutName () {
      const data = await this.$http.addproductList(this.form)
      console.log(data)
      if (data.code == 0) {
        this.$refs.form1.resetFields()
        this.$message.success('添加成功')
      } else {
        this.$message.error(data.errMsg)
      }
      this.dialogVisible = false
      this.getProductList()
    },
    async changeProductList () {
      const res = await this.$http.updateProductList(this.changeform)

      if (res.code == 0) {
        this.$message.success('修改成功')
      } else {
        this.$message.error(res.message)
      }

      this.changedialogVisible = false
      this.getProductList()
    },
    // 会计科目级联选择器
    handleChange (value) {
      if (value == null) {
        this.form.parentId = ''
        return
      }
      console.log(value[value.length - 1])
      this.form.parentId = value[value.length - 1] || -1
    },
    // 树形图
    async append (data) {
      console.log(data.id)
      this.changeform.id = data.id
      this.changeform.productName = data.productName

      this.changedialogVisible = true
    },
    async getProductList () {
      const data = await this.$http.getproductList()
      console.log(data.result)
      // data.result = this.setDisable(2, data.result, 2)

      console.log(data.result)

      this.data = data.result
      this.options = this.setDisable(2, data.result, 2)
    },
    setDisable (count, data, maxNum) {
      if (count > maxNum) {
        data.forEach(v => {
          v.disabled = true
        })
      } else {
        data.forEach(v => {
          v.count = count // 设置最外层数据的初始count
          if (v.children && v.children.length) {
            v.count++
            this.setDisable(v.count, v.children, maxNum) // 子级循环时把这一层数据的count传入
          }
        })
      }
      return data
    },

    async remove (node, data) {
      console.log(data.id)

      try {
        await this.$confirm(
          '确认要删除么?',
          '温馨提示',
          {
            type: 'warning'
          }
        )

        // 能到这里, 说明确认了
        const { aa } = await this.$http.deleteProductList({ id: data.id })
        // console.log(aa)
        if (aa.code === 0) {
          this.$message.success('删除成功')
          // 重新渲染
        } else {
          this.$message.error(aa.errMsg)
        }
      } catch (e) {
        // console.log(e)
      }
      this.getProductList()
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      this.pagesize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.pagenum = 1
      // 重新渲染
      this.getProjectList()
    },
    handleCurrentChange (val) {
      // 更新当前页
      this.pagenum = val
      // 重新渲染
      this.getProjectList()
    },
    async handleNodeClick (data, checked, node) {
      console.log(data.id)
      this.passId = data.id
      this.getSoftwareList()
    },
    async getSoftwareList () {
      const res = await this.$http.getSoftwareList({ id: this.passId, page: this.page, pageSize: this.pageSize, startTime: this.startTime, endTime: this.endTime, name: this.PJName, fileType: this.typeValue })
      console.log(res)
      this.total = res.result.length
      this.projectList = res.result
    },
    async showDownDialog (row) {
      this.uploadAddress = row.uploadAddress
      this.downForm.software.id = row.id
      console.log(row.fileType)
      if (row.fileType == 2) {
        let baseurl = this.$store.state.baseurl
        const data = await this.$http.recordadd({ user: { id: this.downForm.user.id }, software: { id: row.id } })
        if (data.code == 0) {
          this.$message.success('正在下载...')
          window.location.href = baseurl + this.uploadAddress
        } else {
          this.$message.error(data.message)
        }
      } else {
        this.downdialogVisible = true
      }
    },
    downloadProduct () {
      let type = 2
      if (
        type == 2
      ) {
        this.$refs['downForm'].validate((valid) => {
          if (valid) {
            console.log('submit!!')
            this.UpdateRecordadd()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    async  UpdateRecordadd (v) {
      const res = await this.$http.recordadd(this.downForm)
      if (res.code == 0) {
        this.$message.success('保存成功,准备下载')
        this.downdialogVisible = false
        console.log(res)
        let baseurl = this.$store.state.baseurl
        window.location.href = baseurl + this.uploadAddress
        this.getSoftwareList()
      } else {
        this.$message.error(res.message)
      }
    },
    searchPJName (value) {
      console.log(value)
      this.getSoftwareList()
    },
    searchTime (routeTime) {
      console.log(routeTime)
      if (routeTime == null) {
        this.startTime = ''
        this.endTime = ''
        this.getSoftwareList()
        return
      }
      this.startTime = routeTime[0]
      this.endTime = routeTime[1]
      this.getSoftwareList()
    }
  }
}
</script>

<style lang='scss' scoped>
.AccountingItem {
  width: 100%;
  height: 100%;
}
.fl {
  float: left;
  background-color: #fff;
  height: 90%;
}
.fr {
  padding-left: 24%;
  padding-right: 1%;
}
.ml10 {
  width: 74%;
}
</style>
