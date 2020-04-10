<template>
  <div>
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
        <td>
          <span v-if="passForm.supplier.supplierName">{{passForm.supplier.supplierName}}</span>
          <span v-else>\</span>
        </td>
      </tr>
      <tr>
        <td>
          <b>收款方式</b>
        </td>
        <td>{{passForm.paymentTermName}}</td>
        <td>
          <b>货币信息</b>
        </td>
        <td>
          <span v-if="passForm.currencyInfo.currencyName">{{passForm.currencyInfo.currencyName}}</span>
          <span v-else>\</span>
        </td>
      </tr>
      <tr>
        <td>
          <b>收入金额</b>
        </td>
        <td>
          <span v-if="passForm.incomeAmount">{{passForm.incomeAmount}}</span>
          <span v-else>\</span>
        </td>
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
          <b>会计科目</b>
        </td>
        <td>{{passForm.accountTitle.accountTitleName}}</td>
        <td>
          <b>客户信息</b>
        </td>
        <td>
          <span v-if="passForm.customerInfo.customerName">{{passForm.customerInfo.customerName}}</span>
          <span v-else>\</span>
        </td>
      </tr>
      <tr>
        <td>
          <b>摘要</b>
        </td>
        <td colspan="3">{{passForm.comment}}</td>
      </tr>
      <tr>
        <td>
          <b>报销人账号</b>
        </td>
        <td>
          <span v-if="passForm.expenseAccount">{{passForm.expenseAccount}}</span>
          <span v-else>\</span>
        </td>
        <td>
          <b>报销银行</b>
        </td>
        <td>
          <span v-if="passForm.expenseBankName">{{passForm.expenseBankName}}</span>
          <span v-else>\</span>
        </td>
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
          <span v-if="passForm.department.name">{{passForm.department.name}}</span>
          <span v-else>\</span>
        </td>
      </tr>
      <tr>
        <td>
          <b>报销人</b>
        </td>
        <td>
          <span v-if="passForm.expenseUserInfo.name">{{passForm.expenseUserInfo.name}}</span>
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
          <span v-if="passForm.projectInfo.projectName">{{passForm.projectInfo.projectName}}</span>
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
      <tr
        v-for=" eventInfoItem in passForm.eventInfo.actExecutions"
        :key="eventInfoItem.actExecutionId"
      >
        <td>{{eventInfoItem.userInfo.name}}</td>
        <td>{{eventInfoItem.actExecutionTime}}</td>
        <td>{{eventInfoItem.actExecutionComment}}</td>
        <td>
          <span style="margin:3px 0" v-if="eventInfoItem.actExecutionStatus == 0">待处理</span>
          <span style="margin:3px 0" v-else-if="eventInfoItem.actExecutionStatus == 1">已同意</span>

          <span style="margin:3px 0" v-else>已拒绝</span>
          <!-- <span v-else >待处理</span> -->
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>
