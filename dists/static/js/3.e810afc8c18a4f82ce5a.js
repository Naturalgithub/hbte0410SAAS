webpackJsonp([3],{m22e:function(e,t){},rsJh:function(e,t){},tVlF:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Xxa5"),o=a.n(n),s=a("exGp"),r=a.n(s),i=a("t4zo"),p=a.n(i),l=a("uXZL"),c=a.n(l),u={data:function(){return{isShow:!0,passForm:{expenseAccount:"",expenseBankName:"",actExecutions:[],eventInfo:{actExecutions:[],eventInfoId:""},expenseUserInfo:{name:""},actualName:"",clerk:"",incomeExpenseInfoId:"",comment:"",invoice:"",account:"",oddNumber:"",createDate:"",createTime:"",userInfo:{id:"",name:""},supplier:{supplierName:""},paymentTermId:"",currencyInfo:{currencyInfoId:"",currencyName:""},incomeAmount:"",expenseAmount:"",customerInfo:{customerInfoId:"",customerName:""},bankInfo:{bankInfoId:""},actInfoId:"",accountTitle:{accountTitleId:""},companyInfo:{companyInfoId:"",companyName:""},department:{departmentId:""},productLine:{productLineId:""},projectInfo:{projectInfoId:""},sumRatio:""},chapter:"border:3px solid red;color:red",chapterTxt:"",queryDialogVisible:!1,exportTable:function(){var e=c.a.utils.table_to_book(document.querySelector("#table-data")),t=c.a.write(e,{bookType:"xlsx",bookSST:!0,type:"array"});try{p.a.saveAs(new Blob([t],{type:"application/octet-stream"}),"收支单查询.xlsx")}catch(e){}return t},inOutTitle:"",dateoptions:[{value:0,label:"收款"},{value:1,label:"付款"},{value:2,label:"报销"},{value:3,label:"全部"}],queryinoutquery:{createDate:""},total:0,inoutwayid:3,page:1,pageSize:50,tableData:[],roundDateValue:"",startTime:"",endTime:"",valueDate:""}},created:function(){this.getInOutList()},methods:{queryInout:function(e){var t=this;return r()(o.a.mark(function a(){var n,s;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.queryDialogVisible=!0,a.next=4,t.$axios.get("hbte-financial/hbte/incomeExpense/getIncomeExpenseInfo",{params:{incomeExpenseInfoId:e}});case 4:n=a.sent,s=n.data,t.passForm=s.data,0==s.data.incomeExpenseType?t.inOutTitle="收款单据":1==s.data.incomeExpenseType?t.inOutTitle="付款单据":2==s.data.incomeExpenseType?t.inOutTitle="报销单据":t.inOutTitle="其他单据",0==s.data.actStatus?(t.chapterTxt="进行中",t.chapter="border:3px solid #ccc;color:#ccc"):1==s.data.actStatus?(t.chapterTxt="已同意",t.chapter="border:3px solid rgb(103, 194, 58);color:rgb(103, 194, 58)"):2==s.data.actStatus&&(t.chapterTxt="已拒绝",t.chapter="border:3px solid red;color:red");case 10:case"end":return a.stop()}},a,t)}))()},roundDate:function(e){e?(this.startTime=e[0],this.endTime=e[1],this.getInOutList()):(this.startTime="",this.endTime=""),this.getInOutList()},querydata:function(e){this.getInOutList()},dateidchange:function(){this.getInOutList()},handleSizeChange:function(e){this.pageSize=e,this.page=1,this.getInOutList()},handleCurrentChange:function(e){this.page=e,this.getInOutList()},getInOutList:function(){var e=this;return r()(o.a.mark(function t(){var a,n,s;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=JSON.parse(localStorage.getItem("data")),t.next=3,e.$axios.get("hbte-financial/hbte/productLine/getProductLineIe",{params:{page:e.page,pageSize:e.pageSize,incomeExpenseType:e.inoutwayid,startTime:e.startTime,endTime:e.endTime,id:a.id}});case 3:n=t.sent,s=n.data,e.tableData=s.data,e.total=s.count;case 7:case"end":return t.stop()}},t,e)}))()}},computed:{trunDate:function(e){return e+"*"}}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"InOutQuery"},[a("el-form",[a("el-row",[a("el-col",{attrs:{span:3}},[a("el-button",{attrs:{type:"success"},on:{click:e.exportTable}},[e._v("导出")])],1),e._v(" "),a("el-col",{attrs:{span:9}},[a("div",{staticClass:"block"},[e._v("\n          制单日期：\n          "),a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:function(t){return e.roundDate(e.valueDate)}},model:{value:e.valueDate,callback:function(t){e.valueDate=t},expression:"valueDate"}})],1)]),e._v(" "),a("el-col",{attrs:{span:11}},[a("el-form-item",{attrs:{label:"单据类型:"}},[a("el-select",{attrs:{placeholder:"请选择单据类型"},on:{change:e.dateidchange},model:{value:e.inoutwayid,callback:function(t){e.inoutwayid=t},expression:"inoutwayid"}},e._l(e.dateoptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1)],1)],1),e._v(" "),a("el-dialog",{attrs:{title:e.inOutTitle,visible:e.queryDialogVisible,width:"40%"},on:{"update:visible":function(t){e.queryDialogVisible=t}}},[a("div",{staticClass:"tempChapter"},[a("div",{staticClass:"chapter",style:e.chapter},[a("span",[e._v(e._s(e.chapterTxt))])])]),e._v(" "),a("table",{staticClass:"selfTable",attrs:{border:"1"}},[a("tr",{staticClass:"tr"},[a("td",[a("b",[e._v("单据")])]),e._v(" "),a("td",{attrs:{colspan:"3"}},[e._v(e._s(e.passForm.oddNumber))])]),e._v(" "),a("tr",[a("td",[a("b",[e._v("制单人")])]),e._v(" "),a("td",[e._v(e._s(e.passForm.userInfo.name))]),e._v(" "),a("td",[a("b",[e._v("制单日期")])]),e._v(" "),a("td",[e._v(e._s(e.passForm.createDate))])]),e._v(" "),a("tr",[a("td",[a("b",[e._v("收付款方式")])]),e._v(" "),a("td",[e._v(e._s(e.passForm.paymentTermName))]),e._v(" "),a("td",[a("b",[e._v("货币信息")])]),e._v(" "),a("td",[e._v(e._s(e.passForm.currencyInfo.currencyName))])]),e._v(" "),a("tr",[a("td",[a("b",[e._v("会计科目")])]),e._v(" "),a("td",[e._v(e._s(e.passForm.accountTitle.accountTitleName))]),e._v(" "),a("td",[a("b",[e._v("公司信息")])]),e._v(" "),a("td",[e._v(e._s(e.passForm.companyInfo.companyName))])]),e._v(" "),e.passForm.expenseBankName?a("tr",[a("td",[a("b",[e._v("报销人")])]),e._v(" "),a("td",[e.passForm.expenseAmount?a("span",[e._v(e._s(e.passForm.expenseUserInfo.name))]):e._e()]),e._v(" "),a("td",[a("b",[e._v("报销银行")])]),e._v(" "),a("td",[e.passForm.expenseBankName?a("span",[e._v(e._s(e.passForm.expenseBankName))]):e._e()])]):e._e(),e._v(" "),e.passForm.expenseAccount?a("tr",[a("td",[a("b",[e._v("报销人账号")])]),e._v(" "),a("td",{attrs:{colspan:"3"}},[e.passForm.expenseAccount?a("span",[e._v(e._s(e.passForm.expenseAccount))]):e._e()])]):e._e(),e._v(" "),e.passForm.supplier.supplierName?a("tr",[a("td",[a("b",[e._v("供应商")])]),e._v(" "),a("td",{attrs:{colspan:"3"}},[e.passForm.supplier.supplierName?a("span",[e._v(e._s(e.passForm.supplier.supplierName))]):e._e()])]):e._e(),e._v(" "),e.passForm.incomeAmount?a("tr",[a("td",[a("b",[e._v("收入金额")])]),e._v(" "),a("td",{attrs:{colspan:"3"}},[e.passForm.incomeAmount?a("span",[e._v(e._s(e.passForm.incomeAmount))]):e._e()])]):e._e(),e._v(" "),e.passForm.expenseAmount?a("tr",[a("td",[a("b",[e._v("支出金额")])]),e._v(" "),a("td",{attrs:{colspan:"3"}},[e.passForm.expenseAmount?a("span",[e._v(e._s(e.passForm.expenseAmount))]):e._e()])]):e._e(),e._v(" "),e.passForm.customerInfo.customerName?a("tr",[a("td",[a("b",[e._v("客户信息")])]),e._v(" "),a("td",{attrs:{colspan:"3"}},[e.passForm.customerInfo.customerName?a("span",[e._v(e._s(e.passForm.customerInfo.customerName))]):e._e()])]):e._e(),e._v(" "),e.passForm.expenseAmount?a("tr",[a("td",[a("b",[e._v("部门")])]),e._v(" "),a("td",{attrs:{colspan:"3"}},[e.passForm.expenseAmount?a("span",[e._v(e._s(e.passForm.department.name))]):e._e()])]):e._e(),e._v(" "),e.passForm.expenseAmount?a("tr",[a("td",[a("b",[e._v("项目信息")])]),e._v(" "),a("td",{attrs:{colspan:"3"}},[e.passForm.expenseAmount?a("span",[e._v(e._s(e.passForm.projectInfo.projectName))]):e._e()])]):e._e(),e._v(" "),a("tr",[a("td",[a("b",[e._v("摘要")])]),e._v(" "),a("td",{attrs:{colspan:"3"}},[e._v(e._s(e.passForm.comment))])]),e._v(" "),a("tr",[a("td",{attrs:{colspan:"4"}},[a("b",[e._v("产品线分摊表")])])]),e._v(" "),a("tr",[a("td",{attrs:{colspan:"2"}},[a("b",[e._v("产品线")])]),e._v(" "),a("td",[a("b",[e._v("比例")])]),e._v(" "),a("td",[a("b",[e._v("金额")])])]),e._v(" "),e._l(e.passForm.ieProductLines,function(t){return a("tr",{key:t.ieProductLineId},[a("td",{attrs:{colspan:"2"}},[e._v(e._s(t.productLine.productLineName))]),e._v(" "),a("td",[e._v(e._s(t.sumRatio))]),e._v(" "),a("td",[e._v(e._s(t.practicalSum))])])}),e._v(" "),a("tr",[a("td",{attrs:{colspan:"4"}},[a("b",[e._v("审批进度")])])]),e._v(" "),a("tr",[a("td",[a("b",[e._v("审核人")])]),e._v(" "),a("td",[a("b",[e._v("审核时间")])]),e._v(" "),a("td",[a("b",[e._v("备注")])]),e._v(" "),a("td",[a("b",[e._v("状态")])])]),e._v(" "),e._l(e.passForm.eventInfo.actExecutions,function(t){return a("tr",{key:t.actExecutionId},[a("td",[e._v(e._s(t.userInfo.name))]),e._v(" "),a("td",[e._v(e._s(t.actExecutionTime))]),e._v(" "),a("td",[e._v(e._s(t.actExecutionComment))]),e._v(" "),a("td",[0===t.actExecutionStatus?a("span",[e._v("未处理")]):e._e(),e._v(" "),1===t.actExecutionStatus?a("span",[e._v("已同意")]):e._e(),e._v(" "),2===t.actExecutionStatus?a("span",[e._v("已拒绝")]):e._e()])])})],2),e._v(" "),a("el-form",{ref:"form",attrs:{model:e.passForm,"label-width":"80px"}}),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.queryDialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.queryDialogVisible=!1}}},[e._v("确 定")])],1)],1),e._v(" "),[a("el-table",{staticStyle:{width:"100%"},attrs:{id:"table-data",data:e.tableData,border:"",size:"mini"}},[a("el-table-column",{attrs:{type:"index",label:"序号",width:"50"}}),e._v(" "),a("el-table-column",{attrs:{label:"单据类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.incomeExpenseInfo.incomeExpenseType?a("span",[e._v("收款单据")]):e._e(),e._v(" "),1==t.row.incomeExpenseInfo.incomeExpenseType?a("span",[e._v("付款单据")]):e._e(),e._v(" "),2==t.row.incomeExpenseInfo.incomeExpenseType?a("span",[e._v("报销单据")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"incomeExpenseInfo.userInfo.name",label:"制单人"}}),e._v(" "),a("el-table-column",{attrs:{prop:"incomeExpenseInfo.oddNumber",label:"制单号"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("a",{attrs:{href:"###"},on:{click:function(t){return e.queryInout(n.incomeExpenseInfo.incomeExpenseInfoId)}}},[e._v(e._s(n.incomeExpenseInfo.oddNumber))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"incomeExpenseInfo.createDate",label:"制单日期"}}),e._v(" "),2==e.inoutwayid||3==e.inoutwayid?a("el-table-column",{attrs:{prop:"incomeExpenseInfo.expenseUserInfo.name",label:"报 销 人"}}):e._e(),e._v(" "),a("el-table-column",{attrs:{prop:"incomeExpenseInfo.paymentTermName",label:"收付方式"}}),e._v(" "),!e.isShow||1!=e.inoutwayid&&3!=e.inoutwayid?e._e():a("el-table-column",{attrs:{prop:"incomeExpenseInfo.expenseAmount",label:"支出金额"}}),e._v(" "),!e.isShow||0!=e.inoutwayid&&3!=e.inoutwayid?e._e():a("el-table-column",{attrs:{prop:"incomeExpenseInfo.incomeAmount",label:"收入金额"}}),e._v(" "),0==e.inoutwayid||3==e.inoutwayid?a("el-table-column",{attrs:{prop:"incomeExpenseInfo.customerInfo.customerName",label:"客户名称"}}):e._e(),e._v(" "),a("el-table-column",{attrs:{prop:"incomeExpenseInfo.companyInfo.companyName",label:"公司名称"}}),e._v(" "),1==e.inoutwayid||3==e.inoutwayid?a("el-table-column",{attrs:{prop:"incomeExpenseInfo.supplier.supplierName",label:"供应商名称"}}):e._e(),e._v(" "),1==e.inoutwayid||3==e.inoutwayid?a("el-table-column",{attrs:{prop:"incomeExpenseInfo.supplier.bankInfo.bankName",label:"供应商开户行"}}):e._e(),e._v(" "),1==e.inoutwayid||3==e.inoutwayid?a("el-table-column",{attrs:{prop:"incomeExpenseInfo.supplier.supplierAccount",label:"供应商银行账号"}}):e._e(),e._v(" "),1==e.inoutwayid||3==e.inoutwayid?a("el-table-column",{attrs:{prop:"incomeExpenseInfo.department.name",label:"部门名称"}}):e._e(),e._v(" "),1==e.inoutwayid||3==e.inoutwayid?a("el-table-column",{attrs:{prop:"incomeExpenseInfo.invoice",label:"发票"}}):e._e(),e._v(" "),a("el-table-column",{attrs:{prop:"incomeExpenseInfo.accountTitle.accountTitleName",label:"会计科目"}}),e._v(" "),a("el-table-column",{attrs:{prop:"productLine.productLineName",label:"产品线名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sumRatio",label:"产品线比例"}}),e._v(" "),a("el-table-column",{attrs:{prop:"practicalSum",label:"产品线金额"}}),e._v(" "),a("el-table-column",{attrs:{prop:"incomeExpenseInfo.comment",label:"摘要"}})],1)],e._v(" "),a("el-pagination",{staticStyle:{"margin-top":"10px"},attrs:{background:"","current-page":e.page,"page-sizes":[30,50,80],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],2)},staticRenderFns:[]};var _=a("VU/8")(u,m,!1,function(e){a("rsJh"),a("m22e")},"data-v-d2831b90",null);t.default=_.exports}});
//# sourceMappingURL=3.e810afc8c18a4f82ce5a.js.map