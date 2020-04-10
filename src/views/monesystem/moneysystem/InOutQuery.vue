<template>
  <div class="InOutQuery">
    <!-- 收支单据查询 -->
    <el-form>
      <el-row>
        <el-col :span="3">
          <el-button type="success"
                     @click="exportTable">导出</el-button>
        </el-col>
        <el-col :span="9">
          <div class="block">
            制单日期：
            <el-date-picker v-model="valueDate"
                            @change="roundDate(valueDate)"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </div>
        </el-col>
        <el-col :span="11">
          <el-form-item label="单据类型:">
            <el-select v-model="inoutwayid"
                       placeholder="请选择单据类型"
                       @change="dateidchange">
              <el-option v-for="item in dateoptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 单据模态框 -->
    <el-dialog :title="inOutTitle"
               :visible.sync="queryDialogVisible"
               width="40%">
      <div class="tempChapter">
        <div class="chapter"
             :style="chapter">
          <span>{{chapterTxt}}</span>
        </div>
      </div>
      <!-- <hr> -->
      <table class="selfTable"
             border="1">
        <tr class="tr">
          <td>
            <b>单据</b>
          </td>
          <td colspan="3">{{passForm.oddNumber}}</td>
        </tr>
        <tr>
          <td>
            <b>制单人</b>
          </td>
          <td>{{passForm.userInfo.name}}</td>
          <td>
            <b>制单日期</b>
          </td>
          <td>{{passForm.createDate}}</td>
        </tr>
        <tr>
          <td>
            <b>收付款方式</b>
          </td>
          <td>{{passForm.paymentTermName}}</td>
          <td>
            <b>货币信息</b>
          </td>
          <td>{{passForm.currencyInfo.currencyName}}</td>
        </tr>

        <tr>
          <td>
            <b>会计科目</b>
          </td>
          <td>{{passForm.accountTitle.accountTitleName}}</td>
          <td>
            <b>公司信息</b>
          </td>
          <td>{{passForm.companyInfo.companyName}}</td>
        </tr>
        <tr v-if="passForm.expenseBankName">
          <td>
            <b>报销人</b>
          </td>
          <td>
            <span v-if="passForm.expenseAmount">{{passForm.expenseUserInfo.name}}</span>
          </td>
          <td>
            <b>报销银行</b>
          </td>
          <td>
            <span v-if="passForm.expenseBankName">{{passForm.expenseBankName}}</span>
          </td>
        </tr>
        <tr v-if="passForm.expenseAccount">
          <td>
            <b>报销人账号</b>
          </td>
          <td colspan="3">
            <span v-if="passForm.expenseAccount">{{passForm.expenseAccount}}</span>
          </td>
        </tr>
        <tr v-if="passForm.supplier.supplierName">
          <td>
            <b>供应商</b>
          </td>
          <td colspan="3">
            <span v-if="passForm.supplier.supplierName">{{passForm.supplier.supplierName}}</span>
          </td>
        </tr>
        <tr v-if="passForm.incomeAmount">
          <td>
            <b>收入金额</b>
          </td>
          <td colspan="3">
            <span v-if="passForm.incomeAmount">{{passForm.incomeAmount}}</span></td>
        </tr>
        <tr v-if="passForm.expenseAmount">
          <td>
            <b>支出金额</b>
          </td>
          <td colspan="3">
            <span v-if="passForm.expenseAmount">{{passForm.expenseAmount}}</span>
          </td>
        </tr>

        <tr v-if="passForm.customerInfo.customerName">
          <td>
            <b>客户信息</b>
          </td>
          <td colspan="3">
            <span v-if="passForm.customerInfo.customerName">{{passForm.customerInfo.customerName}}</span>
          </td>
        </tr>
        <tr v-if="passForm.expenseAmount">
          <td>
            <b>部门</b>
          </td>
          <td colspan="3">
            <span v-if="passForm.expenseAmount">{{passForm.department.name}}</span>

          </td>
        </tr>

        <tr v-if="passForm.expenseAmount">
          <td>
            <b>项目信息</b>
          </td>
          <td colspan="3">
            <span v-if="passForm.expenseAmount">{{passForm.projectInfo.projectName}}</span>
          </td>
        </tr>
        <tr>
          <td>
            <b>摘要</b>
          </td>
          <td colspan="3">{{passForm.comment}}</td>
        </tr>
        <tr>
          <td colspan="4">
            <b>产品线分摊表</b>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <b>产品线</b>
          </td>
          <td>
            <b>比例</b>
          </td>
          <td>
            <b>金额</b>
          </td>
        </tr>
        <tr v-for="item in passForm.ieProductLines "
            :key="item.ieProductLineId">
          <td colspan="2">{{item.productLine.productLineName}}</td>
          <td>{{item.sumRatio}}</td>
          <td>{{item.practicalSum}}</td>
        </tr>
        <tr>
          <td colspan="4">
            <b>审批进度</b>
          </td>
        </tr>
        <tr>
          <td>
            <b>审核人</b>
          </td>
          <td>
            <b>审核时间</b>
          </td>
          <td>
            <b>备注</b>
          </td>
          <td>
            <b>状态</b>
          </td>
        </tr>
        <tr v-for=" item in passForm.eventInfo.actExecutions"
            :key="item.actExecutionId">
          <td>{{item.userInfo.name}}</td>
          <td>{{item.actExecutionTime}}</td>
          <td>{{item.actExecutionComment}}</td>
          <td>
            <span v-if="item.actExecutionStatus === 0">未处理</span>
            <span v-if="item.actExecutionStatus === 1">已同意</span>
            <span v-if="item.actExecutionStatus === 2">已拒绝</span>
          </td>
        </tr>
      </table>
      <el-form ref="form"
               :model="passForm"
               label-width="80px"></el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="queryDialogVisible = false">取 消</el-button>
        <el-button @click="queryDialogVisible = false"
                   type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 收支信息表格 -->
    <template>
      <el-table id="table-data"
                :data="tableData"
                style="width: 100%"
                border
                size="mini">
        <el-table-column type="index"
                         label="序号"
                         width="50"></el-table-column>
        <el-table-column label="单据类型">
          <template v-slot:default="obj">
            <!-- {{obj.row.incomeExpenseInfo.incomeExpenseType}} -->
            <span v-if="obj.row.incomeExpenseInfo.incomeExpenseType==0">收款单据</span>
            <span v-if="obj.row.incomeExpenseInfo.incomeExpenseType==1">付款单据</span>
            <span v-if="obj.row.incomeExpenseInfo.incomeExpenseType==2">报销单据</span>
            <!-- <span :v-show="obj.row.incomeExpenseType==3">收款单据</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="incomeExpenseInfo.userInfo.name"
                         label="制单人"></el-table-column>
        <el-table-column prop="incomeExpenseInfo.oddNumber"
                         label="制单号">
          <template v-slot:default="{ row }">
            <a href="###"
               @click="queryInout(row.incomeExpenseInfo.incomeExpenseInfoId)">{{row.incomeExpenseInfo.oddNumber}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="incomeExpenseInfo.createDate"
                         label="制单日期"></el-table-column>
        <el-table-column v-if="inoutwayid==2||inoutwayid==3"
                         prop="incomeExpenseInfo.expenseUserInfo.name"
                         label="报 销 人"></el-table-column>
        <el-table-column prop="incomeExpenseInfo.paymentTermName"
                         label="收付方式"></el-table-column>
        <el-table-column v-if="isShow && (inoutwayid==1||inoutwayid==3)"
                         prop="incomeExpenseInfo.expenseAmount"
                         label="支出金额"></el-table-column>
        <el-table-column v-if="isShow && (inoutwayid==0||inoutwayid==3)"
                         prop="incomeExpenseInfo.incomeAmount"
                         label="收入金额"></el-table-column>
        <el-table-column v-if="inoutwayid==0||inoutwayid==3"
                         prop="incomeExpenseInfo.customerInfo.customerName"
                         label="客户名称"></el-table-column>
        <el-table-column prop="incomeExpenseInfo.companyInfo.companyName"
                         label="公司名称"></el-table-column>
        <el-table-column v-if="inoutwayid==1||inoutwayid==3"
                         prop="incomeExpenseInfo.supplier.supplierName"
                         label="供应商名称"></el-table-column>
        <el-table-column v-if="inoutwayid==1||inoutwayid==3"
                         prop="incomeExpenseInfo.supplier.bankInfo.bankName"
                         label="供应商开户行"></el-table-column>
        <el-table-column v-if="inoutwayid==1||inoutwayid==3"
                         prop="incomeExpenseInfo.supplier.supplierAccount"
                         label="供应商银行账号">
          <!-- <template v-slot:default="{row}">
            <span v-if="inoutwayid==1||inoutwayid==3">{{10111401040006591}}*</span>
          </template> -->
        </el-table-column>
        <el-table-column v-if="inoutwayid==1||inoutwayid==3"
                         prop="incomeExpenseInfo.department.name"
                         label="部门名称"></el-table-column>
        <el-table-column v-if="inoutwayid==1||inoutwayid==3"
                         prop="incomeExpenseInfo.invoice"
                         label="发票"></el-table-column>
        <!-- <el-table-column prop="incomeExpenseInfo.projectInfo.projectName" label="项目名称"></el-table-column> -->
        <el-table-column prop="incomeExpenseInfo.accountTitle.accountTitleName"
                         label="会计科目"></el-table-column>
        <el-table-column prop="productLine.productLineName"
                         label="产品线名称"></el-table-column>
        <el-table-column prop="sumRatio"
                         label="产品线比例"></el-table-column>
        <el-table-column prop="practicalSum"
                         label="产品线金额"></el-table-column>
        <el-table-column prop="incomeExpenseInfo.comment"
                         label="摘要"></el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <el-pagination style="margin-top:10px"
                   background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="page"
                   :page-sizes="[30,50,80]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total"></el-pagination>
  </div>
</template>

<script>
import fileSaver from 'file-saver'
import xlsx from 'xlsx'
export default {
  data () {
    return {
      isShow: true,
      passForm: {
        expenseAccount: '',
        expenseBankName: '',
        actExecutions: [],
        eventInfo: { actExecutions: [], eventInfoId: '' },
        expenseUserInfo: { name: '' },
        actualName: '',
        clerk: '',
        incomeExpenseInfoId: '',
        comment: '',
        invoice: '',
        account: '',
        // aa: '',
        oddNumber: '',
        createDate: '',
        createTime: '',
        userInfo: {
          id: '',
          name: ''
        },
        supplier: { supplierName: '' },

        paymentTermId: '',
        currencyInfo: {
          currencyInfoId: '',
          currencyName: ''
        },
        incomeAmount: '',
        expenseAmount: '',

        customerInfo: {
          customerInfoId: '',
          customerName: ''
        },
        bankInfo: {
          bankInfoId: ''
        },
        actInfoId: '',
        accountTitle: {
          accountTitleId: ''
        },
        companyInfo: {
          companyInfoId: '',
          companyName: ''
        },
        department: {
          departmentId: ''
        },
        productLine: {
          productLineId: ''
        },
        projectInfo: {
          projectInfoId: ''
        },
        sumRatio: ''
      },
      chapter: 'border:3px solid red;color:red',
      chapterTxt: '',
      queryDialogVisible: false,
      exportTable () {
        let box = xlsx.utils.table_to_book(
          document.querySelector('#table-data')
        )
        let out = xlsx.write(box, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        })
        try {
          fileSaver.saveAs(
            new Blob([out], {
              type: 'application/octet-stream'
            }),
            '收支单查询.xlsx'
          )
        } catch (e) {
          // 错误处理方式
        }
        return out
      },
      inOutTitle: '',
      dateoptions: [
        {
          value: 0,
          label: '收款'
        },
        {
          value: 1,
          label: '付款'
        },
        {
          value: 2,
          label: '报销'
        },
        {
          value: 3,
          label: '全部'
        }
      ],
      queryinoutquery: {
        createDate: ''
      },
      total: 0,
      inoutwayid: 3,
      // 当前页
      page: 1,
      // 每页条数
      pageSize: 50,

      tableData: [],
      roundDateValue: '',
      startTime: '',
      endTime: '',
      valueDate: ''
    }
  },
  created () {
    this.getInOutList()
  },
  methods: {
    async queryInout (id) {
      console.log(2)
      this.queryDialogVisible = true
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/incomeExpense/getIncomeExpenseInfo',
        {
          params: { incomeExpenseInfoId: id }
        }
      )
      console.log(data.data)
      this.passForm = data.data
      if (data.data.incomeExpenseType == 0) {
        this.inOutTitle = '收款单据'
      } else if (data.data.incomeExpenseType == 1) {
        this.inOutTitle = '付款单据'
      } else if (data.data.incomeExpenseType == 2) {
        this.inOutTitle = '报销单据'
      } else {
        this.inOutTitle = '其他单据'
      }
      if (data.data.actStatus == 0) {
        this.chapterTxt = '进行中'
        this.chapter = 'border:3px solid #ccc;color:#ccc'
      } else if (data.data.actStatus == 1) {
        this.chapterTxt = '已同意'
        this.chapter =
          'border:3px solid rgb(103, 194, 58);color:rgb(103, 194, 58)'
      } else if (data.data.actStatus == 2) {
        this.chapterTxt = '已拒绝'
        this.chapter = 'border:3px solid red;color:red'
      } else {
      }
      // this.inOutTitle = data.data.incomeExpenseType
      // this.queryDialogVisible
    },
    roundDate (i) {
      console.log(i)
      if (i) {
        this.startTime = i[0]
        this.endTime = i[1]
        console.log(this.valueDate)
        this.getInOutList()
      } else {
        this.startTime = ''
        this.endTime = ''
      }
      this.getInOutList()
    },
    querydata (value) {
      // console.log(value)
      this.getInOutList()
    },
    dateidchange () {
      this.getInOutList()
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      this.pageSize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.page = 1
      // 重新渲染
      this.getInOutList()
    },
    // 只要当前页变化时, 触发函数
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 更新当前页
      this.page = val
      // 重新渲染
      this.getInOutList()
    },
    async getInOutList () {
      // let type = this.inoutwayid == 3 ? '' : this.inoutwayid
      // console.log(this.valueDate[0])
      const userInfo = JSON.parse(localStorage.getItem('data'))
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/productLine/getProductLineIe',
        {
          params: {
            page: this.page,
            pageSize: this.pageSize,
            incomeExpenseType: this.inoutwayid,
            startTime: this.startTime,
            endTime: this.endTime,
            id: userInfo.id
          }
        }
      )
      // console.log(data.data)
      this.tableData = data.data
      this.total = data.count
    }
  },
  computed: {
    trunDate (num) {
      return num + '*'
    }
  }
}
</script>

<style>
.chapter {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: raba(0, 0, 0, 0);
  transform: rotate(-25deg);
  position: relative;
}

.chapter span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
  font-size: 16px;
}
.tempChapter {
  position: absolute;
  right: 20px;
  top: 40px;
}
.el-dialog__body {
  padding-top: 40px;
}
</style>
<style style lang='scss' scoped>
.el-select {
  width: 30% !important;
}
.selfTable {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 10px;
  tr {
    height: 30px;
    td,
    th {
      border: 1px solid #000;
    }
    th {
      background-color: #000;
      color: white;
    }
    td {
      width: 25%;
      text-align: center;
    }
  }
}
</style>
