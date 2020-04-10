<template>
  <div class="processMenu" v-if="showProcessSystem">
    <!-- 工序系统 -->
    <el-submenu index="15">
      <template slot="title">
        <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
        <span style="font-size:12px" class="fw">&nbsp;&nbsp;&nbsp;生产管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/Project">项目</el-menu-item>
        <el-menu-item index="/MoneyManagement">生产任务</el-menu-item>
        <el-menu-item index="/CustomerManagement">生产看板</el-menu-item>
        <el-menu-item index="/BankManagement">生产报表</el-menu-item>
        <el-menu-item index="/AitemLine">销售订单</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="16">
      <template slot="title">
        <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
        <span style="font-size:12px" class="fw">&nbsp;&nbsp;&nbsp;物料管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/BudgetManagements">项目</el-menu-item>
        <el-menu-item index="/MoneyManagements">生产任务</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="17">
      <template slot="title">
        <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
        <span style="font-size:12px" class="fw">&nbsp;&nbsp;&nbsp;质量管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/BudgetManagemenst">项目</el-menu-item>
        <el-menu-item index="/MoneyManagements">生产任务</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="18">
      <template slot="title">
        <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
        <span style="font-size:12px" class="fw">&nbsp;&nbsp;&nbsp;物流管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/BudgetManasgement">项目</el-menu-item>
        <el-menu-item index="/MoneyManasgement">生产任务</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="19">
      <template slot="title">
        <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
        <span style="font-size:12px" class="fw">&nbsp;&nbsp;&nbsp;设备维护</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/BudgetsManagement">项目</el-menu-item>
        <el-menu-item index="/MoneyMsanagement">生产任务</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/MoneyMsanagement">
      <span
        style="font-size:12px"
        class="fw"
      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;意见及反馈</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: 'processMenu',
  data () {
    return {
      showProcessSystem: false
    }
  },
  created () {
    let temp = JSON.parse(localStorage.getItem('asidedata'))
    console.log(temp)
    this.showProcessSystem = temp.aside === 'processSystem'
  }
}
</script>

<style>
</style>
