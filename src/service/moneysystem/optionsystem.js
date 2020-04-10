let baseurl = 'hbte-financial/hbte/'
const OPTIONSYSTEM_API = {
  // 保存会计科目
  saveAccountTitle: {
    method: 'post',
    url: 'hbte-financial/hbte/accountTitle/saveAccountTitle'
  },
  updateAccountTitle: {
    method: 'post',
    url: 'hbte-financial/hbte/accountTitle/updateAccountTitle'
  },
  accountTitleList: {
    method: 'get',
    url: 'hbte-financial/hbte/accountTitle/accountTitleList'
  },
  delAccountTitle: {
    method: 'post',
    url: 'hbte-financial/hbte/accountTitle/delAccountTitle'
  },
  productLineList: {
    method: 'get',
    url: 'hbte-financial/hbte/productLine/productLineList'
  },
  updateProductLine: {
    method: 'post',
    url: 'hbte-financial/hbte/productLine/updateProductLine'
  },
  saveProductLine: {
    method: 'post',
    url: 'hbte-financial/hbte/productLine/saveProductLine'
  },
  bankInfoList: {
    method: 'get',
    url: 'hbte-financial/hbte/bank/bankInfoList'
  },
  delBankInfo: {
    method: 'post',
    url: 'hbte-financial/hbte/bank/delBankInfo'
  },
  updateBankInfo: {
    method: 'post',
    url: 'hbte-financial/hbte/bank/updateBankInfo'
  },
  saveBankInfo: {
    method: 'post',
    url: 'hbte-financial/hbte/bank/saveBankInfo'
  },
  companyInfoList: {
    method: 'get',
    url: 'hbte-financial/hbte/company/companyInfoList'
  },
  delCompanyInfo: {
    method: 'post',
    url: `${baseurl}company/delCompanyInfo`
  },
  updateCompanyInfo: {
    method: 'post',
    url: `${baseurl}company/updateCompanyInfo`
  },
  saveCompanyInfo: {
    method: 'post',
    url: `${baseurl}company/saveCompanyInfo`
  }
  // companyInfoList: {
  //   method: 'get',
  //   url: 'hbte-financial/hbte/company/companyInfoList'
  // }

}
export default OPTIONSYSTEM_API
