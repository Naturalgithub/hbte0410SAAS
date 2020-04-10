let baseurl = 'hbte-dingding/sw/'
const SOFTWARE_API = {
  getProjectList: {
    method: 'get',
    url: `${baseurl}project/list`
  },
  updateProjectList: {
    method: 'post',
    url: `${baseurl}project/update`
  },
  addProjectList: {
    method: 'post',
    url: `${baseurl}project/add`
  },
  deleteProjectList: {
    method: 'post',
    url: `${baseurl}project/delete`
  },
  recordList: {
    method: 'get',
    url: `${baseurl}record/list`
  },
  getproductList: {
    method: 'get',
    url: `${baseurl}product/list`
  },
  getproductListget: {
    method: 'get',
    url: `${baseurl}product/get`
  },
  addproductList: {
    method: 'post',
    url: `${baseurl}product/add`
  },
  updateProductList: {
    method: 'post',
    url: `${baseurl}product/update`
  },
  deleteProductList: {
    method: 'post',
    url: `${baseurl}product/delete`
  },
  getSoftwareList: {
    method: 'get',
    url: `${baseurl}software/list`
  },
  softwareAdd: {
    method: 'post',
    url: `${baseurl}software/add`
  },
  recordadd: {
    method: 'post',
    url: `${baseurl}record/add`
  },
  recorddelete: {
    method: 'post',
    url: `${baseurl}record/delete`
  },
  tagList: {
    method: 'get',
    url: `${baseurl}tag/list`
  },
  softwaredelete: {
    method: 'post',
    url: `${baseurl}software/delete`
  },
  softwareupdate: {
    method: 'post',
    url: `${baseurl}software/update`
  },
  documentAdd: {
    method: 'post',
    url: `${baseurl}document/add`
  },
  documentUpdate: {
    method: 'post',
    url: `${baseurl}document/update`
  }

}
export default SOFTWARE_API
