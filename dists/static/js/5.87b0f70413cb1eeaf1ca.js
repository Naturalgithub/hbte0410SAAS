webpackJsonp([5],{"+3bD":function(e,t){},DXX8:function(e,t){},nK2X:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Xxa5"),s=a.n(n),o=a("exGp"),r=a.n(o),i={data:function(){return{changearithmeticStatus:"",inOutWayId:4,dateOptions:[{value:0,label:"进行中"},{value:1,label:"已同意"},{value:2,label:"已拒绝"},{value:3,label:"已撤销"},{value:4,label:"全部"}],pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},inOutTitle:"",startTime:"",endTime:"",chapater:"",chapaterTxt:"",roundDateValue:"",valueDate:"",checkDatea:[],passForm:{expenseAccount:"",expenseBankName:"",expenseUserInfo:{name:""},actualName:"",clerk:"",incomeExpenseInfoId:"",comment:"",account:"",tempa:"",oddNumber:"",createDate:"",createTime:"",userInfo:{userInfoId:"",id:"",name:""},paymentTermName:"",currencyInfo:{currencyInfoId:""},supplier:{supplierName:""},incomeAmount:"",expenseAmount:"",customerInfo:{customerInfoId:"",customerName:""},bankInfo:{bankInfoId:"",bankName:""},actInfoId:"",accountTitle:{accountTitleId:""},companyInfo:{companyInfoId:"",companyName:""},department:{departmentId:"",nameL:""},productLine:{productLineId:""},projectInfo:{projectInfoId:""},sumRatio:"",actExecutions:[],eventInfo:{actExecutions:[]}},append:"",search:"",total:2,page:1,pageSize:30,userInfoId:"",tableData:[],form:{test:1,text:""},dialogVisible:!1,querydialogVisible:!1,eventStatus:"",Pdata:""}},created:function(){this.getEventInfoList()},methods:{chang:function(){},dateIdChange:function(e){if(4===e)return this.eventStatus="",void this.getEventInfoList();this.eventStatus=e,this.getEventInfoList()},roundDate:function(e){e?(this.startTime=e[0],this.endTime=e[1]):(this.startTime="",this.endTime=""),this.getEventInfoList()},checkDate:function(e){var t=this;return r()(s.a.mark(function a(){var n,o;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.dialogVisible=!0,a.next=3,t.$axios.get("hbte-financial/hbte/actExecution/getActExecution",{params:{eventInfoId:e}});case 3:n=a.sent,o=n.data,t.checkDatea=o.data;case 6:case"end":return a.stop()}},a,t)}))()},getEventInfoList:function(){var e=this;return r()(s.a.mark(function t(){var a,n,o;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=JSON.parse(localStorage.getItem("data")),e.userInfoId=a.id,t.next=4,e.$axios.get("hbte-financial/hbte/event/eventInfoList",{params:{page:e.page,pageSize:e.pageSize,id:e.userInfoId,startTime:e.startTime,endTime:e.endTime,eventStatus:e.eventStatus}});case 4:n=t.sent,o=n.data,e.tableData=o.data,e.total=o.count;case 8:case"end":return t.stop()}},t,e)}))()},revocation:function(e,t){var a=this;return r()(s.a.mark(function n(){var o,r;return s.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return o=JSON.parse(localStorage.getItem("data")),a.userInfoId=o.id,n.prev=2,n.next=5,a.$confirm("确认要撤销吗?","温馨提示",{type:"warning"});case 5:return n.next=7,a.$axios.post("hbte-financial/hbte/event/revocation",{eventInfoId:e,eventStatus:3,incomeExpenseInfo:{incomeExpenseInfoId:t}});case 7:r=n.sent,r.data,a.$message.success("撤销成功"),n.next=14;break;case 12:n.prev=12,n.t0=n.catch(2);case 14:a.getEventInfoList();case 15:case"end":return n.stop()}},n,a,[[2,12]])}))()},JumpModify:function(e){e.incomeAmount;0==e.incomeExpenseInfo.incomeExpenseType?this.$router.push({path:"/InOutWrite",query:e}):1==e.incomeExpenseInfo.incomeExpenseType?this.$router.push({path:"/InOutAddWrite",query:e}):2==e.incomeExpenseInfo.incomeExpenseType&&this.$router.push({path:"/ApplyWrite",query:e})},queryInout:function(e){var t=this;return r()(s.a.mark(function a(){var n,o;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.querydialogVisible=!0,a.next=3,t.$axios.get("hbte-financial/hbte/incomeExpense/getIncomeExpenseInfo",{params:{incomeExpenseInfoId:e}});case 3:n=a.sent,o=n.data,t.passForm=o.data,0==o.data.incomeExpenseType?t.inOutTitle="收款单据":1==o.data.incomeExpenseType?t.inOutTitle="付款单据":2==o.data.incomeExpenseType?t.inOutTitle="报销单据":t.inOutTitle="其他单据",0==o.data.actStatus?(t.chapaterTxt="进行中",t.chapater="border:3px solid #ccc;color:#ccc"):1==o.data.actStatus?(t.chapaterTxt="已同意",t.chapater="border:3px solid rgb(103, 194, 58);color:rgb(103, 194, 58)"):2==o.data.actStatus?(t.chapaterTxt="已拒绝",t.chapater="border:3px solid red;color:red"):3==o.data.actStatus&&(t.chapaterTxt="已撤销",t.chapater="border:3px solid #ccc;color:#ccc");case 8:case"end":return a.stop()}},a,t)}))()},handleSizeChange:function(e){this.pageSize=e,this.page=1,this.getEventInfoList()},handleCurrentChange:function(e){this.page=e,this.getEventInfoList()}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"ApplicationList"},[a("el-row",[a("el-col",{attrs:{span:10}},[e._v("\n      申请时间：\n      "),a("el-date-picker",{staticStyle:{"margin-bottom":"20px"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd"},on:{change:e.roundDate},model:{value:e.valueDate,callback:function(t){e.valueDate=t},expression:"valueDate"}})],1),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("\n      操作状态:  \n      "),a("el-select",{staticStyle:{"margin-bottom":"20px",width:"30%"},attrs:{placeholder:"请选择操作状态"},on:{change:e.dateIdChange},model:{value:e.inOutWayId,callback:function(t){e.inOutWayId=t},expression:"inOutWayId"}},e._l(e.dateOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData.filter(function(t){return!e.search||t.name.toLowerCase().includes(e.search.toLowerCase())}),border:"",size:"mini"}},[a("el-table-column",{attrs:{sortable:"",label:"单据类型"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",{directives:[{name:"show",rawName:"v-show",value:0==n.incomeExpenseInfo.incomeExpenseType,expression:"row.incomeExpenseInfo.incomeExpenseType==0"}]},[e._v("收款单据")]),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:1==n.incomeExpenseInfo.incomeExpenseType,expression:"row.incomeExpenseInfo.incomeExpenseType==1"}]},[e._v("付款单据")]),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:2==n.incomeExpenseInfo.incomeExpenseType,expression:"row.incomeExpenseInfo.incomeExpenseType==2"}]},[e._v("报销单据")])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"userInfo.name",sortable:"",label:"申请人"}}),e._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"eventTime",label:"申请日期"}}),e._v(" "),a("el-table-column",{attrs:{sortable:"",prop:"incomeExpenseInfo.oddNumber",label:"收支单据"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("a",{attrs:{href:"###"},on:{click:function(t){return e.queryInout(n.incomeExpenseInfo.incomeExpenseInfoId)}}},[e._v(e._s(n.incomeExpenseInfo.oddNumber))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"Pstate",label:"状态",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[0===n.eventStatus?a("el-button",{attrs:{type:"info",size:"small",disabled:""}},[e._v("进行中")]):e._e(),e._v(" "),1===n.eventStatus?a("el-button",{attrs:{type:"success",size:"small",disabled:""}},[e._v("已同意")]):e._e(),e._v(" "),2===n.eventStatus?a("el-button",{attrs:{type:"danger",size:"small",disabled:""}},[e._v("已拒绝")]):e._e(),e._v(" "),3===n.eventStatus?a("el-button",{attrs:{type:"info",size:"small",disabled:""}},[e._v("已撤销")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"eventComment",label:"操作",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[0===n.eventStatus?a("el-button",{attrs:{type:"warning",size:"small"},on:{click:function(t){return e.revocation(n.eventInfoId,n.incomeExpenseInfo.incomeExpenseInfoId)}}},[e._v("撤销")]):e._e(),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:3===n.eventStatus,expression:"row.eventStatus === 3"}],attrs:{type:"success",size:"small"},on:{click:function(t){return e.JumpModify(n)}}},[e._v("重录")])]}}])})],1),e._v(" "),a("el-pagination",{staticStyle:{"margin-top":"10px"},attrs:{background:"","current-page":e.page,"page-sizes":[30,50,80],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),e._v(" "),a("el-dialog",{attrs:{title:e.inOutTitle,visible:e.querydialogVisible,width:"40%"},on:{"update:visible":function(t){e.querydialogVisible=t}}},[a("div",{staticClass:"rongqi"},[a("div",{staticClass:"zhang",style:e.chapater},[a("span",[e._v(e._s(e.chapaterTxt))])])]),e._v(" "),a("table",{staticClass:"selfTable",attrs:{border:"1"}},[a("tr",{staticClass:"tr"},[a("td",[a("b",[e._v("单据")])]),e._v(" "),a("td",{attrs:{colspan:"3"}},[e._v(e._s(e.passForm.oddNumber))])]),e._v(" "),a("tr",[a("td",[a("b",[e._v("制单人")])]),e._v(" "),a("td",[e._v(e._s(e.passForm.userInfo.name))]),e._v(" "),a("td",[a("b",[e._v("制单日期")])]),e._v(" "),a("td",[e._v(e._s(e.passForm.createDate))])]),e._v(" "),a("tr",[a("td",[a("b",[e._v("收付款方式")])]),e._v(" "),a("td",[e._v(e._s(e.passForm.paymentTermName))]),e._v(" "),a("td",[a("b",[e._v("货币信息")])]),e._v(" "),a("td",[e._v(e._s(e.passForm.currencyInfo.currencyName))])]),e._v(" "),a("tr",[a("td",[a("b",[e._v("会计科目")])]),e._v(" "),a("td",[e._v(e._s(e.passForm.accountTitle.accountTitleName))]),e._v(" "),a("td",[a("b",[e._v("公司信息")])]),e._v(" "),a("td",[e._v(e._s(e.passForm.companyInfo.companyName))])]),e._v(" "),e.passForm.expenseBankName?a("tr",[a("td",[a("b",[e._v("报销人")])]),e._v(" "),a("td",[e.passForm.expenseAmount?a("span",[e._v(e._s(e.passForm.expenseUserInfo.name))]):e._e()]),e._v(" "),a("td",[a("b",[e._v("报销银行")])]),e._v(" "),a("td",[e.passForm.expenseBankName?a("span",[e._v(e._s(e.passForm.expenseBankName))]):e._e()])]):e._e(),e._v(" "),e.passForm.expenseAccount?a("tr",[a("td",[a("b",[e._v("报销人账号")])]),e._v(" "),a("td",{attrs:{colspan:"3"}},[e.passForm.expenseAccount?a("span",[e._v(e._s(e.passForm.expenseAccount))]):e._e()])]):e._e(),e._v(" "),e.passForm.supplier.supplierName?a("tr",[a("td",[a("b",[e._v("供应商")])]),e._v(" "),a("td",{attrs:{colspan:"3"}},[e.passForm.supplier.supplierName?a("span",[e._v(e._s(e.passForm.supplier.supplierName))]):e._e()])]):e._e(),e._v(" "),e.passForm.incomeAmount?a("tr",[a("td",[a("b",[e._v("收入金额")])]),e._v(" "),a("td",{attrs:{colspan:"3"}},[e.passForm.incomeAmount?a("span",[e._v(e._s(e.passForm.incomeAmount))]):e._e()])]):e._e(),e._v(" "),e.passForm.expenseAmount?a("tr",[a("td",[a("b",[e._v("支出金额")])]),e._v(" "),a("td",{attrs:{colspan:"3"}},[e.passForm.expenseAmount?a("span",[e._v(e._s(e.passForm.expenseAmount))]):e._e()])]):e._e(),e._v(" "),e.passForm.customerInfo.customerName?a("tr",[a("td",[a("b",[e._v("客户信息")])]),e._v(" "),a("td",{attrs:{colspan:"3"}},[e.passForm.customerInfo.customerName?a("span",[e._v(e._s(e.passForm.customerInfo.customerName))]):e._e()])]):e._e(),e._v(" "),e.passForm.expenseAmount?a("tr",[a("td",[a("b",[e._v("部门")])]),e._v(" "),a("td",{attrs:{colspan:"3"}},[e.passForm.expenseAmount?a("span",[e._v(e._s(e.passForm.department.name))]):e._e()])]):e._e(),e._v(" "),e.passForm.expenseAmount?a("tr",[a("td",[a("b",[e._v("项目信息")])]),e._v(" "),a("td",{attrs:{colspan:"3"}},[e.passForm.expenseAmount?a("span",[e._v(e._s(e.passForm.projectInfo.projectName))]):e._e()])]):e._e(),e._v(" "),a("tr",[a("td",[a("b",[e._v("摘要")])]),e._v(" "),a("td",{attrs:{colspan:"3"}},[e._v(e._s(e.passForm.comment))])]),e._v(" "),e.passForm.append?a("tr",[a("td",[a("b",[e._v("附加审批")])]),e._v(" "),a("td",{attrs:{colspan:"3"}},[e._v(e._s(e.passForm.append))])]):e._e(),e._v(" "),a("tr",[a("td",{attrs:{colspan:"4"}},[a("b",[e._v("产品线分摊表")])])]),e._v(" "),a("tr",[a("td",{attrs:{colspan:"2"}},[a("b",[e._v("产品线")])]),e._v(" "),a("td",[a("b",[e._v("比例")])]),e._v(" "),a("td",[a("b",[e._v("金额")])])]),e._v(" "),e._l(e.passForm.ieProductLines,function(t){return a("tr",{key:t.ieProductLineId},[a("td",{attrs:{colspan:"2"}},[e._v(e._s(t.productLine.productLineName))]),e._v(" "),a("td",[e._v(e._s(t.sumRatio))]),e._v(" "),a("td",[e._v(e._s(t.practicalSum))])])}),e._v(" "),a("tr",[a("td",{attrs:{colspan:"4"}},[a("b",[e._v("审批进度")])])]),e._v(" "),a("tr",[a("td",[a("b",[e._v("审核人")])]),e._v(" "),a("td",[a("b",[e._v("审核时间")])]),e._v(" "),a("td",[a("b",[e._v("备注")])]),e._v(" "),a("td",[a("b",[e._v("状态")])])]),e._v(" "),e._l(e.passForm.eventInfo.actExecutions,function(t){return a("tr",{key:t.actExecutionId},[a("td",[e._v(e._s(t.userInfo.name))]),e._v(" "),a("td",[e._v(e._s(t.actExecutionTime))]),e._v(" "),a("td",[e._v(e._s(t.actExecutionComment))]),e._v(" "),a("td",[0===t.actExecutionStatus?a("span",[e._v("未处理")]):e._e(),e._v(" "),1===t.actExecutionStatus?a("span",[e._v("已同意")]):e._e(),e._v(" "),2===t.actExecutionStatus?a("span",[e._v("已拒绝")]):e._e()])])})],2),e._v(" "),a("el-form",{ref:"form",attrs:{model:e.passForm,"label-width":"80px"}}),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.querydialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.querydialogVisible=!1}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var p=a("VU/8")(i,c,!1,function(e){a("DXX8"),a("+3bD")},null,null);t.default=p.exports}});
//# sourceMappingURL=5.87b0f70413cb1eeaf1ca.js.map