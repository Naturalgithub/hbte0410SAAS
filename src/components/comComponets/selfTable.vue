<template>
  <div class="selfTable">
    <table class="selfTable" border="1">
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
          <b>供应商</b>
        </td>
        <td>{{passForm.supplier.supplierName}}</td>
      </tr>
      <tr>
        <td>
          <b>收款方式</b>
        </td>
        <td>{{passForm.paymentTermName}}</td>
        <td>
          <b>货币信息</b>
        </td>
        <td>{{passForm.currencyInfo.currencyName}}</td>
      </tr>
      <tr>
        <td>
          <b>收入金额</b>
        </td>
        <td>{{passForm.incomeAmount}}</td>
        <td>
          <b>支出金额</b>
        </td>
        <td>
          <span v-if="passForm.expenseAmount">{{passForm.expenseAmount}}</span>
          <span v-else>\</span>
        </td>
      </tr>
      <tr>
        <td>
          <b>摘要</b>
        </td>
        <td>{{passForm.comment}}</td>
        <td>
          <b>客户信息</b>
        </td>
        <td>{{passForm.customerInfo.customerName}}</td>
      </tr>
      <tr>
        <td>
          <b>账号</b>
        </td>

        <td>
          <span v-if="passForm.expenseAmount">{{passForm.account}}</span>
          <span v-else>\</span>
        </td>
        <td>
          <b>会计科目</b>
        </td>
        <td>{{passForm.accountTitle.accountTitleName}}</td>
      </tr>
      <tr>
        <td>
          <b>公司信息</b>
        </td>
        <td>{{passForm.companyInfo.companyName}}</td>
        <td>
          <b>部门</b>
        </td>
        <td>
          <span v-if="passForm.expenseAmount">{{passForm.department.name}}</span>
          <span v-else>\</span>
        </td>
      </tr>
      <tr>
        <td>
          <b>报销人</b>
        </td>
        <td>
          <span v-if="passForm.expenseAmount">{{passForm.expenseUserInfo.name}}</span>
          <span v-else>\</span>
        </td>
        <td>
          <b>制单日期</b>
        </td>
        <td>{{passForm.createDate}}</td>
      </tr>
      <tr>
        <td>
          <b>项目信息</b>
        </td>
        <td colspan="3">
          <span v-if="passForm.expenseAmount">{{passForm.projectInfo.projectName}}</span>
          <span v-else>\</span>
        </td>
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
      <tr v-for="item in passForm.ieProductLines " :key="item.ieProductLineId">
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
      <tr v-for=" item in passForm.eventInfo.actExecutions" :key="item.actExecutionId">
        <td>{{item.userInfo.name}}</td>
        <td>{{item.actExecutionTime}}</td>
        <td>{{item.actExecutionComment}}</td>
        <td>
          <el-link v-if="item.actExecutionStatus === 0" type="info" disabled size="small">未处理</el-link>
          <el-link v-if="item.actExecutionStatus === 1" type="success" disabled size="small">同意</el-link>
          <el-link v-if="item.actExecutionStatus === 2" type="danger" disabled size="small">拒绝</el-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { async } from 'q'
export default {
  name: 'selfTable',
  data () {
    return {
      passForm: {
        expenseUserInfo: { name: '' },
        actualName: '',
        clerk: '',
        incomeExpenseInfoId: '',
        comment: '',
        account: '',
        tempa: '',
        oddNumber: '',
        createDate: '',
        createTime: '',
        userInfo: {
          userInfoId: '',
          id: '',
          name: ''
        },
        paymentTermName: '',
        currencyInfo: {
          currencyInfoId: ''
        },
        supplier: { supplierName: '' },
        incomeAmount: '',
        expenseAmount: '',

        customerInfo: {
          customerInfoId: '',
          customerName: ''
        },
        bankInfo: {
          bankInfoId: '',
          bankName: ''
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
          departmentId: '',
          nameL: ''
        },
        productLine: {
          productLineId: ''
        },
        projectInfo: {
          projectInfoId: ''
        },
        sumRatio: '',
        actExecutions: [],
        eventInfo: {
          actExecutions: []
        }
      }
    }
  },
  created: queryInout,
  methods: {
    async queryInout (id) {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/incomeExpense/getIncomeExpenseInfo',
        {
          params: {
            incomeExpenseInfoId: id
          }
        }
      )
      this.passForm = data.data
    }
  }
}
</script>

<style style lang='scss'>
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
