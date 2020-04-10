<template>
  <!-- 付款录入 -->
  <div class="InOutAddWrite">
    <!-- 导入功能 -->
    <el-button type="success"
               style="margin-bottom:20px"
               @click="inBtn">导入</el-button>
    <!-- 导入模态框 -->
    <el-dialog title="导入"
               :visible.sync="InputDialogVisible"
               width="30%">
      <el-row>
        <!-- class="luruinput" -->
        <a href="###">
          <input type="file"
                 ref="fileInput"
                 @change="getFile" />
          <!-- 导&nbsp;&nbsp;&nbsp;&nbsp;入 -->
        </a>
      </el-row>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="InputDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="sureUpload">确定录入</el-button>
      </span>
    </el-dialog>
    <!-- 分栏 -->

    <el-form :inline="true"
             :model="InoutwriteForm"
             class="demo-form-inline">
      <!-- <el-row :gutter="10"> -->
      <el-row>
        <el-col :span="6">
          <el-form-item label="单　　号">
            <el-input v-model="InoutwriteForm.oddNumber"
                      :lg="12"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6"></el-col>
        <el-col :span="6">
          <el-form-item label="制单人员">
            <el-input :disabled="true"
                      placeholder="请输入制单人"
                      v-model="InoutwriteForm.userInfo.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目信息">
            <!-- 级联选择器 -->
            <div class="block">
              <el-select v-model="InoutwriteForm.projectInfo.projectInfoId"
                         placeholder="请选择">
                <el-option v-for="item in projectOptions"
                           :key="item.projectInfoId"
                           :label="item.projectName"
                           :value="item.projectInfoId"></el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="付款方式">
            <el-select v-model="InoutwriteForm.paymentTermName"
                       placeholder="请选择">
              <el-option v-for="item in paymentOptions"
                         :key="item.paymentTermId"
                         :label="item.paymentTermName"
                         :value="item.paymentTermName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="币　　种">
            <el-select @change="moneyExchangeRate(InoutwriteForm.currencyInfo.currencyInfoId)"
                       v-model="InoutwriteForm.currencyInfo.currencyInfoId"
                       placeholder="请选择">
              <el-option v-for="item in currencyInfoOptions"
                         :key="item.currencyInfoId"
                         :label="item.currencyName"
                         :value="item.currencyInfoId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="支出金额">
            <el-input placeholder="请输入支出金额"
                      type="number"
                      v-model="InoutwriteForm.expenseAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="兑人民币">
            <el-input placeholder="请输入支出金额"
                      v-model="sumMoneyRate"
                      disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="供应商　">
            <el-select v-model="InoutwriteForm.supplier.supplierId"
                       placeholder="请选择">
              <el-option v-for="item in supplierOptions"
                         :key="item.supplierId"
                         :label="item.supplierName"
                         :value="item.supplierId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="所属部门">
            <el-cascader v-model="departmentList"
                         :options="departmentOptions"
                         :props="{
                label: 'name',
                value: 'id',
                // value: '[accountTitleId,accountTitleName,accountTitleParentId]',
                children: 'children'
                }"
                         filterable
                         @change="departmentHandleChange"
                         placeholder="请选择(默认为一级分类)">
              <template v-slot:default="obj">
                <span>{{ obj.data.name}}</span>
                <!-- <span v-if="!node.isLeaf">({{ data.children.length }})</span> -->
              </template>
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="会计科目">
            <!-- 级联选择器 -->
            <div class="block">
              <!-- <el-cascader v-model="InoutwriteForm.accountTitleId"></el-cascader> -->
              <!-- 级联选择器 -->
              <el-cascader v-model="accountList"
                           :options="accountTitleOptions"
                           :props="{
                label: 'accountTitleName',
                value: 'accountTitleId',
                // value: '[accountTitleId,accountTitleName,accountTitleParentId]',
                children: 'children'
              }"
                           filterable
                           @change="accountHandleChange"
                           placeholder="请选择(默认为一级分类)">
                <template v-slot:default="obj">
                  <span>{{ obj.data.accountTitleCode}}-{{obj.data.accountTitleName}}</span>
                  <!-- <span v-if="!node.isLeaf">({{ data.children.length }})</span> -->
                </template>
              </el-cascader>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="所属公司">
            <div class="block">
              <!-- <el-cascader v-model="InoutwriteForm.companyInfoId"></el-cascader> -->
              <el-select v-model="InoutwriteForm.companyInfo.companyInfoId"
                         placeholder="请选择">
                <el-option v-for="item in companyOptions"
                           :key="item.companyInfoId"
                           :label="item.companyName"
                           :value="item.companyInfoId"></el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="摘　　要">
            <el-input v-model="InoutwriteForm.comment"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- </el-row> -->
      <!-- <el-row>
       </el-row> -->
      <el-row>
        <el-col :span="6">
          <el-form-item label="发　　票">
            <el-input v-model="InoutwriteForm.invoice"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="制单日期">
            <div class="block">
              <el-date-picker style="width:88%"
                              class="mr0"
                              v-model="InoutwriteForm.createDate"
                              type="date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd"></el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- /////审批人 -->
      <div>
        <hbte-people-table :approveManlist="approveManlist"
                           :applyManOptions="applyManOptions"
                           :treePeopleOptions="syroptions"
                           @del-approve-mancp="delApproveMancp"
                           @handle-node-click="handleNodeClickcp"
                           @handle-close="handleClosecp"
                           @apply-man="applyMancp"></hbte-people-table>
      </div>
      <div>
        <el-form-item label>
          <el-button type="success"
                     @click="startIn"
                     style="margin-left:0;">添加产品线</el-button>
          <el-button type="success"
                     @click="addListmodal">录入</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column type="index"
                       label="序号"></el-table-column>
      <el-table-column prop="productLine.productLineName"
                       label="产品线"></el-table-column>
      <el-table-column prop="practicalSum"
                       label="金　额"></el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)"
                     type="text"
                     size="small">移除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-button type="success" style="margin:10px;float:left" disabled>立即录入</el-button> -->

    <!-- 立即录入的模态框 -->
    <el-dialog title="添加"
               :visible.sync="dialogVisible"
               width="35%">
      <el-form ref="formtest"
               :model="formtest"
               label-width="80px">
        <el-form-item label="产品线">
          <el-select v-model="formtest.productLineId"
                     @change="productLine"
                     placeholder="请选择">
            <el-option v-for="item in cpxxxoptions"
                       :key="item.productLineId"
                       :label="item.productLineName"
                       :value="item.productLineId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="金  额">
          <el-input type="number"
                    v-model="formtest.practicalSum"
                    class='lgpro'></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addList(formtest)">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import $ from 'jquery'
import HBTE_COMPONETS from '../../../components/hbteComponents/index'
export default {
  components: { ...HBTE_COMPONETS },
  computed: {
    sumMoneyRate () {
      return +this.currentduilv * +this.InoutwriteForm.expenseAmount
    }
  },
  data () {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      baseurl: this.$store.state.baseurl,
      id: '', // 登录人的id
      imageUrl: '',
      InputDialogVisible: false,
      tableData: [],
      aa: '',
      form1: '',
      formtest: {
        productLineId: '',
        productLineName: '',
        practicalSum: ''
      },
      dialogVisible: false,
      InoutwriteForm: {
        actualName: '',
        clerk: '',
        incomeExpenseType: 1,
        ieProductLines: '',
        eventInfo: {
          eventComment: ''
        },
        invoice: '',
        oddNumber: '',
        createDate: '',
        // createTime: '',
        userInfo: {
          id: '',
          name: ''
        },
        paymentTermName: '',
        currencyInfo: {
          currencyInfoId: ''
        },
        incomeAmount: '',
        expenseAmount: '',
        comment: '',
        customerInfo: {
          customerInfoId: ''
        },
        bankInfo: {
          bankInfoId: ''
        },
        supplier: {
          supplierId: ''
        },
        account: '',
        actInfoId: '',
        accountTitle: {
          accountTitleId: ''
        },
        companyInfo: {
          companyInfoId: ''
        },
        department: {
          id: ''
        },
        projectInfo: {
          projectInfoId: ''
        },
        actExecutions: []
      },
      applyManOptions: [],
      fahoutailist: [],
      // 收款方式级联选择器
      paymentOptions: [],
      // 货币信息选择器
      currencyInfoOptions: [],
      // 客户信息选择器
      khxxoptions: [],
      // 银行信息选择器
      yhxxoptions: [],
      // 会计级联选择器
      accountTitleOptions: [],
      // 公司信息选择器
      companyOptions: [],
      // 部门信息选择器
      departmentOptions: [],
      // 产品线信息选择器
      cpxxxoptions: [],
      // 项目信息选择器
      projectOptions: [],
      valuepeople: [],
      syroptions: [],
      supplierOptions: [],
      currentduilv: '',
      turnRMB: '',
      fileds: '',
      returnName: '',
      choseDialogVisible: false,
      approveManlist: [],
      accountList: [],
      departmentList: []
    }
  },
  created () {
    this.getproductLineId()
    this.getpaymentTermId()
    this.getcurrencyInfoId()
    this.getcustomerInfoId()
    this.getcompanyInfoId()
    this.getId()
    this.getaccountTitleId()
    this.getprojectInfoId()
    this.getUserInfoList()
    // this.getbankInfoId()
    this.getsupplierId()
    this.getNameId()
    this.applyManlist()

    setTimeout(() => {
      if (JSON.stringify(this.$route.query) != '{}') {
        this.getOrderNumber(this.$route.query)
      }
    }, 500)
  },
  methods: {
    async applyManlist () {
      const { data } = await this.$http.getUserInfoList()
      this.applyManOptions = data
    },
    applyMancp (v) {
      let currentManObj = this.applyManOptions.filter(item => {
        return item.id === v
      })
      console.log(currentManObj[0])
      for (var i = 0; i < this.approveManlist.length; i++) {
        if (this.approveManlist[i].id == v) {
          // this.choseDialogVisible = false
          this.$message.error('已经选择相同人员了,请检查一波')
          return
        }
      }
      this.approveManlist.push(currentManObj[0])
      let temp = this.approveManlist
      let aa = temp.map(item => {
        return item.id
      })
      this.fahoutailist = aa
      console.log(this.fahoutailist)
    },
    handleClosecp (tag) {
      this.approveManlist = this.approveManlist.filter(item => {
        return item.id !== tag.id
      })
      this.fahoutailist = this.approveManlist.map(item => {
        return item.id
      })
      console.log(this.fahoutailist)
    },
    handleNodeClickcp (data) {
      console.log(data)
      for (var i = 0; i < this.approveManlist.length; i++) {
        if (this.approveManlist[i].id == data.id) {
          // this.choseDialogVisible = false
          this.$message.error('已经选择相同人员了,请检查一波')
          return
        }
      }

      if (data.type == 2) {
        this.approveManlist.push(data)
        // this.choseDialogVisible = false
        console.log(this.approveManlist)
        this.fahoutailist = this.approveManlist.map(item => {
          return item.id
        })
        console.log(this.fahoutailist)
      }
      // console.log(this.InoutwriteForm.actExecutions)
    },
    delApproveMancp (id) {
      console.log(22)

      console.log(2)
      this.approveManlist = this.approveManlist.filter(item => {
        return item.id !== id
      })
      this.fahoutailist = this.approveManlist.map(item => {
        return item.id
      })
      console.log(this.fahoutailist)
    },
    showPeopleInfo () {
      this.choseDialogVisible = true
    },
    inBtn () {
      this.InputDialogVisible = true
    },
    async getFile (event) {
      let form = new FormData() // FormData 对象
      // console.log(form)
      this.form1 = form
      const files = event.target.files
      console.log(files[0].name)
      this.returnName = files[0].name
      // console.log(event)
      this.fileds = files[0]
      this.form1.append('file', this.fileds) // id 文件对象
      this.form1.append('id', this.id) // 登录人的id
      this.form1.append(
        'incomeExpenseType',
        this.InoutwriteForm.incomeExpenseType
      ) // 单据类型
    },
    async sureUpload () {
      this.InputDialogVisible = false
      let that = this
      $.ajax({
        url: `${that.baseurl}hbte-financial/hbte/incomeExpense/importPaymentInfo`, // url地址
        type: 'POST', // 上传方式
        data: this.form1, // 上传formdata封装的数据
        dataType: 'JSON',
        cache: false, // 不缓存
        processData: false, // jQuery不要去处理发送的数据
        contentType: false, // jQuery不要去设置Content-Type请求头
        success: function (data) {
          // 成功回调
          // console.log(data)
          if (data.code == 0) {
            that.$message.success('导入成功,不会覆盖原有数据')
          } else {
            that.$message.error(data.errorMsg)
          }
        },
        error: function (data) {
          // 失败回调
          // console.log(data)
        }
      })

      this.InputDialogVisible = false
    },
    getNameId () {
      const data = JSON.parse(localStorage.getItem('data'))
      // console.log(data.id)
      this.InoutwriteForm.userInfo.id = data.id
      this.InoutwriteForm.userInfo.name = data.userName
    },
    // 计算货币兑率反显
    moneyExchangeRate (duilv) {
      // console.log(this.currencyInfoOptions)
      const hb = this.currencyInfoOptions
      let needhblv = hb.filter(item => {
        return item.currencyInfoId == duilv
      })
      // console.log(needhblv)
      // 当前兑率
      let currentduilv = needhblv[0].currencyRatio
      this.currentduilv = currentduilv
      // console.log(duilv)
      // console.log(this.currentduilv)

      let num = +this.InoutwriteForm.expenseAmount
      // console.log(num)
      this.turnRMB = this.duilv * num
      // console.log(this.turnRMB)
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    startIn () {
      this.dialogVisible = true
    },
    addList (formtest) {
      // console.log(11)
      let productLineId = this.formtest.productLineId
      let practicalSum = this.formtest.practicalSum
      if (practicalSum == '') {
        this.$message.error('金额不能为空')
        return
      }
      // console.log(this.aa)
      this.tableData.push({
        productLine: {
          productLineId: productLineId,
          productLineName: this.aa
        },
        practicalSum: practicalSum
      })
      this.InoutwriteForm.ieProductLines = this.tableData
      // console.log(this.tableData)
      this.dialogVisible = false
      // this.$refs.formtest.resetFields()
      this.formtest.productLineId = ''
      this.formtest.productLineName = ''
      this.formtest.practicalSum = ''
    },
    productLine (value) {
      var obj = {}
      obj = this.cpxxxoptions.find(function (item) {
        return item.productLineId === value
      })
      // console.log(obj)
      this.aa = obj.productLineName
      // obj 就是被选中的那个对象，
    },
    async getpaymentTermId () {
      const { data } = await this.$http.getPaymentTermId()
      let aa = JSON.parse(localStorage.getItem('data'))
      // console.log(aa.id)
      this.id = aa.id

      // this.InoutwriteForm.userInfo.userName = aa.userName
      // this.InoutwriteForm.userInfo.userInfoId = aa.userInfoId
      // console.log(data)
      this.paymentOptions = data
      this.InoutwriteForm.paymentTermName = data[0].paymentTermName
      var cca = parseInt(Math.random() * 10000000)
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1 // 月份从0开始
      var day = date.getDate() // 日期
      // let asc = cca.slice(3)
      // console.log(asc)

      this.InoutwriteForm.oddNumber = `HBTE-${year}${month}${day}${cca}`
      this.InoutwriteForm.createDate = `${year}-${month}-${day}`
    },
    // 获取货币信息id
    async getcurrencyInfoId () {
      const { data } = await this.$http.getCurrencyInfoId()
      // console.log(data)
      this.currencyInfoOptions = data
      this.InoutwriteForm.currencyInfo.currencyInfoId = data[0].currencyInfoId
    },
    // // 获取客户信息id
    async getcustomerInfoId () {
      const { data } = await this.$http.getCustomerInfoId()
      this.khxxoptions = data
    },
    async getcompanyInfoId () {
      const { data } = await this.$http.getcompanyInfoId()
      // console.log(data.data)
      this.companyOptions = data
      // console.log(this.yhxxoptions)
      this.InoutwriteForm.companyInfo.companyInfoId = data[0].companyInfoId
    },
    async getaccountTitleId () {
      const { data } = await this.$http.getAccountTitleList({ incomeExpenseType: 1 })
      this.accountTitleOptions = this.$hbteApi.getTreeData(data)
    },
    accountHandleChange (value) {
      // console.log(value)
      this.InoutwriteForm.accountTitle.accountTitleId =
        value[value.length - 1] || -1
    },
    async getId () {
      const { data } = await this.$http.getDepartmentList()
      // console.log(data.data)
      this.departmentOptions = this.$hbteApi.getTreeData(data)
    },
    departmentHandleChange (value) {
      // console.log(value.length - 1)
      this.InoutwriteForm.department.id = value[value.length - 1] || -1
    },
    // 获取产品线信息id
    async getproductLineId () {
      const { data } = await this.$http.getProductLine()
      this.cpxxxoptions = data
    },
    // 获取项目信息id
    async getprojectInfoId () {
      const { data } = await this.$http.getProjectInfoList()
      // console.log(data.data)
      this.projectOptions = data
      // console.log(this.projectOptions)
      this.InoutwriteForm.projectInfo.projectInfoId = data[0].projectInfoId
    },
    async getOrderNumber (tmp) {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/incomeExpense/getIncomeExpenseInfo',
        {
          params: {
            incomeExpenseInfoId: tmp.incomeExpenseInfo.incomeExpenseInfoId
          }
        }
      )
      console.log(data)
      this.InoutwriteForm.projectInfo.projectInfoId = data.data.projectInfo.projectInfoId// 项目信息
      this.InoutwriteForm.currencyInfo.currencyInfoId = data.data.currencyInfo.currencyInfoId// 币种
      this.InoutwriteForm.paymentTermName = data.data.paymentTermName// 付款方式
      this.InoutwriteForm.expenseAmount = data.data.expenseAmount// 支出金额
      this.InoutwriteForm.companyInfo.companyInfoId = data.data.companyInfo.companyInfoId// 所属公司
      this.InoutwriteForm.customerInfo.customerInfoId = data.data.customerInfo.customerInfoId
      this.InoutwriteForm.comment = data.data.comment
      // this.InoutwriteForm.accountTitle.accountTitleId = data.data.accountTitle.accountTitleId;
      this.InoutwriteForm.ieProductLines = data.data.ieProductLines
      this.InoutwriteForm.actExecutions = data.data.userInfo.name// 会计科目
      this.InoutwriteForm.invoice = data.data.invoice
      this.InoutwriteForm.department.id = data.data.department.id// 所属部门
      this.InoutwriteForm.supplier.supplierId = data.data.supplier.supplierId// 供应商

      this.departmentList = []
      this.getSelectDepartmentId(this.departmentOptions, data.data.department.id)

      this.accountList = []
      if (data.data.accountTitle.accountTitleParentId != -1) {
        this.accountList.push(data.data.accountTitle.accountTitleParentId)
      }
      this.accountList.push(data.data.accountTitle.accountTitleId)// 会计科目1级列表

      this.InoutwriteForm.accountTitle.accountTitleParentId = data.data.accountTitle.accountTitleParentId
      this.InoutwriteForm.accountTitle.accountTitleId = data.data.accountTitle.accountTitleId

      // 审批人员
      data.data.eventInfo.actExecutions.forEach(item => {
        this.approveManlist.push(item.userInfo)
      })
      data.data.ieProductLines.forEach(item => {
        this.tableData.push({
          productLine: {
            productLineId: item.productLine.productLineId,
            productLineName: item.productLine.productLineName
          },
          practicalSum: item.practicalSum
        })
      })
    },
    getSelectDepartmentId (departmentList, selectId) {
      for (var i = 0; i < departmentList.length; i++) {
        var item = departmentList[i]
        if (selectId == item.id) {
          this.departmentList.push(selectId)
          return
        }
        if (item.children != undefined) {
          this.getSelectDepartmentId(item.children, selectId)
          if (this.departmentList.length != 0) {
            this.departmentList.unshift(item.id)
            return
          }
        }
      }
    },

    async addListmodal () {
      // actExecutions
      const arr1 = []
      for (let i = 0; i < this.approveManlist.length; i++) {
        var aa = {
          userInfo: { id: this.approveManlist[i].id },
          actExecutionPriority: i
        }
        arr1.push(aa)
      }
      console.log(this.approveManlist)

      this.InoutwriteForm.actExecutions = arr1

      if (this.InoutwriteForm.projectInfo.projectInfoId == '') {
        this.$message.error('提交前,请确认项目信息是否漏填')
        return
      } else if (this.InoutwriteForm.currencyInfo.currencyInfoId == '') {
        this.$message.error('提交前,请确认币种是否漏填')
        return
      } else if (this.InoutwriteForm.expenseAmount == '') {
        this.$message.error('提交前,请确认支出金额是否漏填')
        return
      } else if (this.InoutwriteForm.supplier.supplierId == '') {
        this.$message.error('提交前,请确认供应商是否漏填')
        return
      } else if (this.InoutwriteForm.department.id == '') {
        this.$message.error('提交前,请确认所属部门是否漏填')
        return
      } else if (this.InoutwriteForm.accountTitle.accountTitleId == '') {
        this.$message.error('提交前,请确认会计科目是否漏填')
        return
      } else if (this.InoutwriteForm.companyInfo.companyInfoId == '') {
        this.$message.error('提交前,请确认所属公司是否漏填')
        return
      } else if (this.InoutwriteForm.paymentTermName == '') {
        this.$message.error('提交前,请确认付款方式是否漏填')
        return
      } else if (this.InoutwriteForm.createDate == '') {
        this.$message.error('提交前,请确认创建时间是否漏填')
        return
      } else if (this.InoutwriteForm.actExecutions == '') {
        this.$message.error('请确认审批人是否填写完整')
        return
      } else if (this.InoutwriteForm.ieProductLines == '') {
        this.$message.error('请确认产品线是否填写完整')
        return
      }

      const { data } = await this.$axios.post(
        'hbte-financial/hbte/incomeExpense/saveIncomeExpenseInfo',
        this.InoutwriteForm
      )
      // console.log(22)

      // console.log(data)
      if (data.code == 0) {
        this.$message.success('数据录入成功')
        this.InoutwriteForm.currencyInfo.currencyInfoId = ''
        this.InoutwriteForm.companyInfo.companyInfoId = ''
        this.InoutwriteForm.createDate = ''
        this.InoutwriteForm.accountTitle.id = ''
        this.InoutwriteForm.oddNumber = ''
        this.InoutwriteForm.projectInfo.projectInfoId = ''
        this.InoutwriteForm.comment = ''
        this.InoutwriteForm.invoice = ''
        this.InoutwriteForm.currencyInfo.currencyInfoId = ''
        this.InoutwriteForm.expenseAmount = ''
        this.InoutwriteForm.supplier.supplierId = ''
        this.InoutwriteForm.companyInfo.companyInfoId = ''
        this.InoutwriteForm.paymentTermName = ''
        this.InoutwriteForm.eventInfo.eventComment = ''
        this.approveManlist = []
        this.tableData = []
        // window.location.reload()
        var cca = parseInt(Math.random() * 10000000)
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1 // 月份从0开始
        var day = date.getDate() // 日期
        // let asc = cca.slice(3)
        // console.log(asc)
        this.InoutwriteForm.oddNumber = `HBTE-${year}${month}${day}${cca}`
        this.InoutwriteForm.createDate = `${year}-${month}-${day}`
      } else {
        // console.log(data)
        this.$message.error(data.errorMsg)
      }
    },
    async getUserInfoList () {
      const { data } = await this.$http.getDepartmentUserList()
      // console.log(data.data)
      this.syroptions = data
    },
    async getsupplierId () {
      const { data } = await this.$http.getSupplierList()
      this.supplierOptions = data
      this.InoutwriteForm.supplier.supplierId = data[0].supplierId
    }
  }
}
</script>

<style lang="scss" scoped>
.luruinput {
  padding: 8px 5px 8px 5px;
  height: 20px;
  line-height: 20px;
  position: relative;
  cursor: pointer;
  color: #fff;
  background: rgb(103, 194, 58);
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
.mr0 {
  margin-right: 0;
}
.el-select {
  width: 93%;
}
.el-input {
  width: 100%;
}
.el-date-editor {
  width: 88%;
}
.el-cascader {
  width: 93% !important;
}
.touxiang {
  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    vertical-align: middle;
  }
}

.approveMan {
  float: left;
  li {
    position: relative;
    float: left;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .el-icon-circle-close {
      position: absolute;
      left: 28px;
    }
  }
}
>>> .el-tree-node__content {
  height: 42px !important;
}
.pd0 {
  padding: 0;
}
.lgpro {
  width: 93% !important;
}
</style>
