const INOUTSYSTEM_API = {
  //  // 获取支付信息
  getPaymentTermId: {
    method: 'get',
    url: '/hbte-financial/hbte/paymentTerm/paymentTermList'
  },
  // 获取货币信息
  getCurrencyInfoId: {
    method: 'get',
    url: 'hbte-financial/hbte/currency/currencyInfoList'
  },
  // 获取客户信息
  getCustomerInfoId: {
    method: 'get',
    url: 'hbte-financial/hbte/customer/customerInfoList'
  },
  // 获取银行信息
  getBankInfoId: {
    method: 'get',
    url: 'hbte-financial/hbte/bank/bankInfoList'
  },
  // 获取公司信息
  getcompanyInfoId: {
    method: 'get',
    url: 'hbte-financial/hbte/company/companyInfoList'
  },
  // 获取会计科目列表
  getAccountTitleList: {
    method: 'get',
    url: 'hbte-financial/hbte/accountTitle/accountTitleList'
  },
  // 获取产品线信息
  getProductLineList: {
    method: 'get',
    url: 'hbte-financial/hbte/productLine/productLineList'
  },
  // 获取收款账户信息
  getReimbInfoId: {
    method: 'get',
    url: 'hbte-financial/hbte/apply_account/get'
  },
  // 获取项目信息
  getProjectInfoList: {
    method: 'get',
    url: 'hbte-financial/hbte/project/projectInfoList'
  },
  // 获取部门用户信息
  getDepartmentUserList: {
    method: 'get',
    url: 'hbte-financial/hbte/department/departmentUserList'
  },
  // 获取人员信息表
  getUserInfoList: {
    method: 'get',
    url: 'hbte-financial/hbte/userInfo/userInfoList'
  },
  // 获取人员信息表
  getDepartmentList: {
    method: 'get',
    url: 'hbte-financial/hbte/department/departmentList'
  },
  // 获取产品线信息表
  getProductLine: {
    method: 'get',
    url: 'hbte-financial/hbte/productLine/productLineList'
  },
  // 获取供应商列表
  getSupplierList: {
    method: 'get',
    url: 'hbte-financial/hbte/supplier/supplierList'
  },
  // 获取会计部门总数
  getAccountTitleDepartmentSum: {
    method: 'get',
    url: 'hbte-financial/hbte/accountTitle/getAccountTitleDepartmentSum'
  },
  // 添加预算
  saveBudget: {
    method: 'post',
    url: 'hbte-financial/hbte/budget/save'
  },
  // 回显预算金额
  getBudgetNum: {
    method: 'get',
    url: 'hbte-financial/hbte/budget/get'
  },
  // 修改预算金额
  updateBudgetSum: {
    method: 'post',
    url: 'hbte-financial/hbte/budget/update'
  },
  batchHand: {
    method: 'post',
    url: 'hbte-finncial/hbte/actExecution/updateActExecution'
  },
  //算法列表
  arithList:{
    method: 'get',
    url: 'hbte-financial/hbte/arithmetic/list'
  },
  //添加算法
  addArith:{
    method: 'post',
    url: 'hbte-financial/hbte/arithmetic/add'
  },
  //更新算法
  updateArith:{
    method: 'get',
    url: 'hbte-financial/hbte/arithmetic/update'
  },
  //更新算法
  staupdateArith:{
    method: 'get',
    url: 'hbte-financial/hbte/arithmetic/update_status'
  },
  //删除算法
  deleteArith:{
    method: 'post',
    url: 'hbte-financial/hbte/arithmetic/delete'
  },
}
export default INOUTSYSTEM_API
