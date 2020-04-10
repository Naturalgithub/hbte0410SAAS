<template>
  <!-- 收款录入 -->
  <div class="InOutWrite">
    <!-- 导入功能 -->
    <el-button type="success"
               style="margin-bottom:20px"
               @click="Inbtn">导入</el-button>
    <!-- 导入模态框 -->
    <el-dialog title="导入"
               :visible.sync="daorudialogVisible"
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
        <el-button @click="daorudialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="sureupload">确定录入</el-button>
      </span>
    </el-dialog>

    <el-form :inline="true"
             :rules="rules"
             ref="ruleForm"
             :model="InoutwriteForm"
             class="demo-form-inline">
      <!-- <el-row :gutter="10"> -->
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="单　　号">
              <el-input v-model="InoutwriteForm.oddNumber"
                        placeholder></el-input>
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="6">
          <!-- </el-row> -->
          <el-form-item label="制单人员">
            <el-input :disabled="true"
                      placeholder="请输入制单人"
                      v-model="InoutwriteForm.userInfo.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="币　　种">
            <el-form-item>
              <el-select @change="currencyChange(InoutwriteForm.currencyInfo.currencyInfoId)"
                         v-model="InoutwriteForm.currencyInfo.currencyInfoId"
                         placeholder="请选择">
                <el-option v-for="item in currencyInfoOptions"
                           :key="item.currencyInfoId"
                           :label="item.currencyName"
                           :value="item.currencyInfoId"></el-option>
              </el-select>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="收款方式">
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
          <el-form-item label="收入金额">
            <el-input placeholder="请输入收入金额"
                      type="number"
                      v-model="InoutwriteForm.incomeAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="兑人民币">
            <el-input type="number"
                      placeholder="请输入支出金额"
                      v-model="sumMoneyRate"
                      disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6">
          <el-form-item label="所属公司">
            <div class="block">
              <el-select v-model="InoutwriteForm.companyInfo.companyInfoId"
                         placeholder="请选择">
                <el-option v-for="item in companyOptions"
                           :key="item.companyInfoId"
                           :label="item.companyName"
                           :value="item.companyInfoId"
                           comp></el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="客户信息">
            <el-select v-model="InoutwriteForm.customerInfo.customerInfoId"
                       placeholder="请选择">
              <el-option v-for="item in customInfoOptions"
                         :key="item.customerInfoId"
                         :label="item.customerName"
                         :value="item.customerInfoId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row></el-row>

      <el-row>
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
                           @change="accoutTitleChange"
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
          <el-form-item label="摘　　要">
            <el-input v-model="InoutwriteForm.comment"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="制单日期"
                        style="padding:0;margin:0">
            <el-form-item>
              <el-date-picker style="width:88%"
                              class="mr0 pd0"
                              v-model="InoutwriteForm.createDate"
                              type="date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row></el-row>

      <div style="margin-top:20px"
           v-if="false">
        <el-form-item label="审批人员">
          <ul class="shenpiren">
            <li v-for="item in approveManlist"
                :key="item.id">
              <img :src="item.avatar"
                   alt />
              <span style="cursor: pointer;"
                    class="el-icon-circle-close"
                    @click="delChosePeople(item.id)"></span>&nbsp;
              >&nbsp;&nbsp;
            </li>
          </ul>

          <ul class="shenpiren">
            <li style="padding-top:5px;">
              <span style=" font-size:35px; cursor: pointer;"
                    class="el-icon-circle-plus-outline"
                    @click="showPeopleInfo"></span>
            </li>
          </ul>
        </el-form-item>
      </div>
      <div>
        <el-form-item label>
          <el-button type="success"
                     @click="startIn"
                     style="margin-left:0;">添加产品线</el-button>
        </el-form-item>
        <el-button type="success"
                   @click="addListmoban">录入</el-button>
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
        <el-form-item label="产品线"
                      class="tppro">
          <el-select v-model="formtest.productLineId"
                     @change="choseProductLine"
                     placeholder="请选择">
            <el-option v-for="item in productLineInfoOption"
                       :key="item.productLineId"
                       :label="item.productLineName"
                       :value="item.productLineId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="金　额">
          <el-input type="number"
                    v-model="formtest.practicalSum"
                    class="lgpro"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addList(formtest)">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 选择人员模态框 -->
    <el-dialog title="选人"
               :visible.sync="choseDialogVisible"
               closable="false"
               width="35%">
      <div class="hbtePeopleTree">
        <vuescroll :ops="ops">
          <div>
            <div class="fl">
              <!-- 可以搜索 -->
              <el-select style="margin-bottom:10px;  margin-top: 10px; "
                         v-model="valuepeople1"
                         @change="applyMan(valuepeople1)"
                         filterable
                         placeholder="请选择(可以搜索)">
                <el-option v-for="item in applyManOptions"
                           :key="item.id "
                           :label="item.name"
                           :value="item.id "
                           :currentObj="item.name"></el-option>
              </el-select>
              <el-tag :key="tag.id"
                      v-for="tag in approveManlist"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(tag)">
                <img class="approveManImg"
                     :src="tag.avatar"
                     alt />
                {{tag.title||tag.name}}
              </el-tag>
            </div>
            <el-tree class="fr"
                     node-key="id"
                     :default-expanded-keys="[1]"
                     accordion
                     :data="syroptions"
                     :props="defaultProps"
                     @node-click="handleNodeClick"
                     ref="PeopleTree"
                     style="height: 550px;">
              <span slot-scope="{ node, data }"
                    class="custom-tree-node">
                <span v-if="data.type==1"
                      class="el-icon-office-building"></span>
                <span v-else>
                  <span class="touxiang">
                    <img :src="data.avatar"
                         alt />
                  </span>
                </span>&nbsp;
                <span>{{ data.title }}</span>
              </span>
            </el-tree>
          </div>
        </vuescroll>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import $ from 'jquery'

import vuescroll from 'vuescroll'
// import { hbtePeopleTable } from '@/components/hbteComponents/index'
export default {
  components: { vuescroll },
  computed: {
    sumMoneyRate () {
      return +this.currentduilv * +this.InoutwriteForm.incomeAmount
    }
  },
  data () {
    return {
      backupPeople: [],
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, // 是否只有滚动的时候才显示滚动条
          background: '#ccc'
        }
      },

      rules: {
        region: [
          { required: true, message: '请选择币种', trigger: ['blur', 'change'] }
        ]
      },
      approveManlist: [],
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      value: null,
      props: { multiple: true, children: 'children', label: 'title', id: 'id' },
      baseurl: this.$store.state.baseurl,
      huixianame: '',
      id: '',
      tableData: [],
      aa: '',
      formtest: {
        productLineId: '',
        productLineName: '',
        practicalSum: ''
      },
      dialogVisible: false,
      InoutwriteForm: {
        actualName: '',
        clerk: '',
        incomeExpenseType: 0,
        ieProductLines: '',
        eventInfo: {
          eventComment: ''
        },
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
        account: '',
        actInfoId: '',
        accountTitle: {
          accountTitleId: ''
        },
        companyInfo: {
          companyInfoId: ''
        },
        department: {
          departmentId: ''
        },
        projectInfo: {
          projectInfoId: ''
        },
        actExecutions: []
      },
      // 收款方式级联选择器
      paymentOptions: [],
      // 货币信息选择器
      currencyInfoOptions: [],
      // 客户信息选择器
      customInfoOptions: [],
      // 银行信息选择器
      UserInfoOptions: [],
      // 会计级联选择器
      accountTitleOptions: [],
      // 公司信息选择器
      companyOptions: [],
      // 部门信息选择器
      departmentOptions: [],
      // 产品线信息选择器
      productLineInfoOption: [],
      // 项目信息选择器
      xmxxoptions: [],
      valuepeople: [],
      syroptions: [],
      duiRMB: '',
      currentduilv: '',
      daorudialogVisible: false,
      choseDialogVisible: false,
      fahoutailist: [],
      filterText: '',
      applyManOptions: [],
      valuepeople1: '',
      currentObj: {},
      accountList: []
    }
  },
  created () {
    this.getProductLineId()
    this.getPaymentTermId()
    this.getCurrencyInfoId()
    this.getCustomerInfoId()
    this.getCompanyInfoId()
    this.getdepartmentId()
    this.getAccountTitleId()
    // this.getprojectInfoId()
    this.getUserInfoList()
    this.getBankInfoId()
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
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/userInfo/userInfoList'
      )
      // console.log(data.data)

      this.applyManOptions = data.data
    },
    applyMan (v) {
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
    handleClose (tag) {
      console.log(tag.id)
      console.log(2)
      this.approveManlist = this.approveManlist.filter(item => {
        return item.id !== tag.id
      })
      this.fahoutailist = this.approveManlist.map(item => {
        return item.id
      })
      console.log(this.fahoutailist)
    },
    delChosePeople (id) {
      // console.log(2)
      this.approveManlist = this.approveManlist.filter(item => {
        return item.id !== id
      })
      this.fahoutailist = this.approveManlist.map(item => {
        return item.id
      })
      console.log(this.fahoutailist)

      // this.fahoutailist
    },
    handleNodeClick (data) {
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
    },
    showPeopleInfo () {
      this.choseDialogVisible = true
    },
    normalizer (node) {
      // 去掉children=[]的children属性
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.id,
        label: node.title,
        children: node.children
      }
    },
    peopleInfo (value) {
      console.log(value)
    },
    // 点击导入按钮
    Inbtn () {
      this.daorudialogVisible = true
    },
    async getFile (event) {
      let form = new FormData() // FormData 对象
      // console.log(form)
      this.form1 = form
      const files = event.target.files
      // console.log(files[0].name)
      this.huixianame = files[0].name
      // console.log(event)
      this.wenjian = files[0]
      this.form1.append('file', this.wenjian) // id 文件对象
      this.form1.append('id', this.id) // 登录人的id
      this.form1.append(
        'incomeExpenseType',
        this.InoutwriteForm.incomeExpenseType
      ) // 单据类型
    },
    async sureupload () {
      this.daorudialogVisible = false
      this.huixianame = ''
      // console.log(this.wenjian)
      // console.log(this.form1)
      // let form = new FormData() // FormData 对象
      // form.append('file', this.wenjian ) // 文件对象
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
      // const { data } = await this.$axios.post(
      //   '/hbte-financial/hbte/incomeExpense/importPaymentInfo',
      //   { file: this.wenjian }
      // )
      // console.log(data)

      this.daorudialogVisible = false
    },
    // 计算货币兑率反显
    getNameId () {
      const data = JSON.parse(localStorage.getItem('data'))
      // console.log(data.id)
      this.id = data.id
      this.InoutwriteForm.userInfo.id = data.id
      // console.log( this.InoutwriteForm.userInfo.id)
    },
    currencyChange (duilv) {
      // console.log(this.currencyInfoOptions)
      const hb = this.currencyInfoOptions
      let needhblv = hb.filter(item => {
        return item.currencyInfoId == duilv
      })
      console.log(needhblv)
      // 当前兑率
      let currentduilv = needhblv[0].currencyRatio
      this.currentduilv = currentduilv
      // console.log(duilv)
      // console.log(this.currentduilv)

      let num = +this.InoutwriteForm.expenseAmount
      // console.log(num)
      this.duiRMB = this.duilv * num
      // console.log(this.duiRMB)
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
      console.log(this.tableData)
      this.dialogVisible = false
      // this.$refs.formtest.resetFields()
      this.formtest.productLineId = ''
      this.formtest.productLineName = ''
      this.formtest.practicalSum = ''
    },
    choseProductLine (value) {
      var obj = {}
      obj = this.productLineInfoOption.find(function (item) {
        return item.productLineId === value
      })
      // console.log(obj)
      this.aa = obj.productLineName
      // obj 就是被选中的那个对象，
    },
    async getPaymentTermId () {
      const { data } = await this.$http.getPaymentTermId()
      // console.log(data)
      let aa = JSON.parse(localStorage.getItem('data'))

      this.InoutwriteForm.userInfo.name = aa.userName
      // this.InoutwriteForm.userInfo.userInfoId = aa.userInfoId
      console.log(data)
      this.paymentOptions = data
      this.InoutwriteForm.paymentTermName = data[0].paymentTermName
      var cca = parseInt(Math.random() * 10000000)
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1 // 月份从0开始
      var day = date.getDate() // 日期
      // let asc = cca.slice(3)
      // console.log(asc)
      // this.InoutwriteForm.oddNumber = `HBTE-${year}${month}${day}${cca}`
      this.InoutwriteForm.oddNumber = `HBTE-${year}${month}${day}${cca}`
      this.InoutwriteForm.createDate = `${year}-${month}-${day}`
      // this.currencyInfoOptions = data.data
      // this.InoutwriteForm.paymentTermName = data.data[1].paymentTermId
    },
    // 获取货币信息id
    async getCurrencyInfoId () {
      const data = await this.$http.getCurrencyInfoId()
      this.currencyInfoOptions = data.data
      this.InoutwriteForm.currencyInfo.currencyInfoId = data.data[0].currencyInfoId
    },
    // // 获取收款id
    // async getCurrencyInfoId () {
    //   const data = await this.$http.getCurrencyInfoId()
    //   this.currencyInfoOptions = data.data
    //   this.InoutwriteForm.currencyInfo.currencyInfoId =  data.data[4].currencyName
    // },
    // // 获取客户信息id
    async getCustomerInfoId () {
      const { data } = await this.$http.getCustomerInfoId()
      console.log(data)
      this.customInfoOptions = data
      this.InoutwriteForm.customerInfo.customerInfoId = data[0].customerInfoId
    },
    async getBankInfoId () {
      const { data } = await this.$http.getBankInfoId()
      this.UserInfoOptions = data.data
    },
    // // 获取公司信息id
    async getCompanyInfoId () {
      const { data } = await this.$http.getcompanyInfoId()
      this.companyOptions = data
      this.InoutwriteForm.companyInfo.companyInfoId = data[0].companyInfoId
    },
    async getAccountTitleId () {
      // console.log(this.$hbteApi.getTreeData('sb'))
      const { data } = await this.$http.getAccountTitleList({ incomeExpenseType: 0 })
      // console.log(data)
      this.accountTitleOptions = this.$hbteApi.getTreeData(data)
      console.log(this.accountTitleOptions)
    },
    accoutTitleChange (value) {
      // console.log(value)
      this.InoutwriteForm.accountTitle.accountTitleId =
        value[value.length - 1] || -1
    },
    async getdepartmentId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/department/departmentList'
      )
      // console.log(data.data)
      this.departmentOptions = data.data
    },
    // // 获取时间
    // async getdatatId () {
    //   const { data } = await this.$http.getdatatId()
    //   this.departmentOptions = data.data
    // },
    departmentHandleChange (value) {
      // console.log(value.length - 1)
      this.InoutwriteForm.department.departmentId =
        value[value.length - 1] || -1
    },
    // 获取产品线信息id
    async getProductLineId () {
      const { data } = await this.$http.getProductLineList()
      this.productLineInfoOption = data
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

      this.InoutwriteForm.currencyInfo.currencyInfoId = data.data.currencyInfo.currencyInfoId// 币种
      this.InoutwriteForm.paymentTermName = data.data.paymentTermName// 收付款方式
      this.InoutwriteForm.incomeAmount = data.data.incomeAmount// 收入金额
      console.log('id: ' + data.data.companyInfo.companyInfoId)

      this.InoutwriteForm.companyInfo.companyInfoId = data.data.companyInfo.companyInfoId// 所属公司
      this.InoutwriteForm.customerInfo.customerInfoId = data.data.customerInfo.customerInfoId// 客户信息
      this.InoutwriteForm.comment = data.data.comment// 摘要
      // this.InoutwriteForm.accountTitle.accountTitleId = data.data.accountTitle.accountTitleId;//会计科目2级列表
      this.InoutwriteForm.ieProductLines = data.data.ieProductLines// 产品线信息
      this.InoutwriteForm.actExecutions = data.data.userInfo.id// 会计科目2级

      this.accountList = []
      if (data.data.accountTitle.accountTitleParentId != -1) {
        this.accountList.push(data.data.accountTitle.accountTitleParentId)
      }
      this.accountList.push(data.data.accountTitle.accountTitleId)// 会计科目1级列表

      this.InoutwriteForm.accountTitle.accountTitleParentId = data.data.accountTitle.accountTitleParentId
      this.InoutwriteForm.accountTitle.accountTitleId = data.data.accountTitle.accountTitleId

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

    // 立即录入
    async addListmoban () {
      /**
       * 时间:2020/4/2
       * 修改人:杨跃勋
       * 内容: 增加审批人
       */
      const arr1 = []
      for (let i = 0; i < this.approveManlist.length; i++) {
        var aa = {
          userInfo: { id: this.approveManlist[i].id },
          actExecutionPriority: i
        }
        arr1.push(aa)
      }

      this.InoutwriteForm.actExecutions = arr1

      // this.$refs.ruleForm.validate()
      if (this.InoutwriteForm.currencyInfo.currencyInfoId == '') {
        this.$message.error('请确认币种是否填写完整')
        return
      } else if (this.InoutwriteForm.paymentTermName == '') {
        this.$message.error('请确认收款方式是否填写完整')
        return
      } else if (this.InoutwriteForm.incomeAmount == '') {
        this.$message.error('请确认收入金额是否填写完整')
        return
      } else if (this.InoutwriteForm.companyInfo.companyInfoId == '') {
        this.$message.error('请确认所属公司是否填写完整')
        return
      } else if (this.InoutwriteForm.customerInfo.customerInfoId == '') {
        this.$message.error('请确认客户是否填写完整')
        return
      } else if (this.InoutwriteForm.accountTitle.accountTitleId == '') {
        this.$message.error('请确认会计科目是否填写完整')
        return
      } else if (this.InoutwriteForm.createDate == '') {
        this.$message.error('请确认制单时间是否填写完整')
        return
      } else if (this.InoutwriteForm.actExecutions == '') {
        // this.$message.error('请确认审批人是否填写完整')
        // return
      } else if (this.InoutwriteForm.ieProductLines == '') {
        this.$message.error('请确认产品线是否填写完整')
        return
      }

      const { data } = await this.$axios.post(
        'hbte-financial/hbte/incomeExpense/saveIncomeExpenseInfo',
        this.InoutwriteForm
      )
      if (data.code === 0) {
        this.InoutwriteForm.actExecutions = ''
        this.InoutwriteForm.currencyInfo.currencyInfoId = ''
        this.InoutwriteForm.oddNumber = ''
        this.InoutwriteForm.paymentTermName = ''
        this.InoutwriteForm.incomeAmount = ''
        this.InoutwriteForm.companyInfo.companyInfoId = ''
        this.InoutwriteForm.customerInfo.customerInfoId = ''
        this.InoutwriteForm.comment = ''
        this.InoutwriteForm.createDate = ''
        this.InoutwriteForm.eventInfo.eventComment = ''
        this.approveManlist = []
        this.tableData = []
        this.$message.success('数据录入成功')
        var cca = parseInt(Math.random() * 10000000)
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1 // 月份从0开始
        var day = date.getDate() // 日期
        // let asc = cca.slice(3)
        // console.log(asc)

        this.InoutwriteForm.oddNumber = `HBTE-${year}${month}${day}${cca}`
        this.InoutwriteForm.createDate = `${year}-${month}-${day}`

        // this.$refs.ruleForm.resetFields()
      } else {
        this.$message.error(data.errorMsg)
      }
    },
    async getUserInfoList () {
      const { data } = await this.$http.getDepartmentUserList()
      this.syroptions = data
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
  width: 87%;
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

.shenpiren {
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
.fl {
  float: left;
  width: 70%;
}
.fr {
  float: right;
}
.el-tag + .el-tag {
  margin-left: 10px;
  margin-bottom: 10px;
}
.approveManImg {
  width: 25px;
  height: 25px;
  margin-right: 5px;
  border-radius: 50%;
  vertical-align: middle;
}
// .tppro{
//   margin-top: 20px !important;
// }
.lgpro {
  width: 93% !important;
}
</style>
