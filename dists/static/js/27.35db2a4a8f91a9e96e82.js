webpackJsonp([27],{CEkt:function(t,e){},RmKb:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("Xxa5"),o=n.n(r),a=n("exGp"),i=n.n(a),s=n("mvHQ"),c=n.n(s),u=n("Dd8w"),l=n.n(u),p=n("4kSj"),m=n.n(p),d=n("+CIe"),f={components:l()({},d.a),computed:{sumMoneyRate:function(){return+this.currentduilv*+this.InoutwriteForm.expenseAmount}},data:function(){return{data:[],defaultProps:{children:"children",label:"title"},baseurl:this.$store.state.baseurl,id:"",imageUrl:"",InputDialogVisible:!1,tableData:[],aa:"",form1:"",formtest:{productLineId:"",productLineName:"",practicalSum:""},dialogVisible:!1,InoutwriteForm:{actualName:"",clerk:"",incomeExpenseType:1,ieProductLines:"",eventInfo:{eventComment:""},invoice:"",oddNumber:"",createDate:"",userInfo:{id:"",name:""},paymentTermName:"",currencyInfo:{currencyInfoId:""},incomeAmount:"",expenseAmount:"",comment:"",customerInfo:{customerInfoId:""},bankInfo:{bankInfoId:""},supplier:{supplierId:""},account:"",actInfoId:"",accountTitle:{accountTitleId:""},companyInfo:{companyInfoId:""},department:{id:""},projectInfo:{projectInfoId:""},actExecutions:[]},applyManOptions:[],fahoutailist:[],paymentOptions:[],currencyInfoOptions:[],khxxoptions:[],yhxxoptions:[],accountTitleOptions:[],companyOptions:[],departmentOptions:[],cpxxxoptions:[],projectOptions:[],valuepeople:[],syroptions:[],supplierOptions:[],currentduilv:"",turnRMB:"",fileds:"",returnName:"",choseDialogVisible:!1,approveManlist:[],accountList:[],departmentList:[]}},created:function(){var t=this;this.getproductLineId(),this.getpaymentTermId(),this.getcurrencyInfoId(),this.getcustomerInfoId(),this.getcompanyInfoId(),this.getId(),this.getaccountTitleId(),this.getprojectInfoId(),this.getUserInfoList(),this.getsupplierId(),this.getNameId(),this.applyManlist(),setTimeout(function(){"{}"!=c()(t.$route.query)&&t.getOrderNumber(t.$route.query)},500)},methods:{applyManlist:function(){var t=this;return i()(o.a.mark(function e(){var n,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.getUserInfoList();case 2:n=e.sent,r=n.data,t.applyManOptions=r;case 5:case"end":return e.stop()}},e,t)}))()},applyMancp:function(t){for(var e=this.applyManOptions.filter(function(e){return e.id===t}),n=0;n<this.approveManlist.length;n++)if(this.approveManlist[n].id==t)return void this.$message.error("已经选择相同人员了,请检查一波");this.approveManlist.push(e[0]);var r=this.approveManlist.map(function(t){return t.id});this.fahoutailist=r},handleClosecp:function(t){this.approveManlist=this.approveManlist.filter(function(e){return e.id!==t.id}),this.fahoutailist=this.approveManlist.map(function(t){return t.id})},handleNodeClickcp:function(t){for(var e=0;e<this.approveManlist.length;e++)if(this.approveManlist[e].id==t.id)return void this.$message.error("已经选择相同人员了,请检查一波");2==t.type&&(this.approveManlist.push(t),this.fahoutailist=this.approveManlist.map(function(t){return t.id}))},delApproveMancp:function(t){this.approveManlist=this.approveManlist.filter(function(e){return e.id!==t}),this.fahoutailist=this.approveManlist.map(function(t){return t.id})},showPeopleInfo:function(){this.choseDialogVisible=!0},inBtn:function(){this.InputDialogVisible=!0},getFile:function(t){var e=this;return i()(o.a.mark(function n(){var r,a;return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:r=new FormData,e.form1=r,a=t.target.files,e.returnName=a[0].name,e.fileds=a[0],e.form1.append("file",e.fileds),e.form1.append("id",e.id),e.form1.append("incomeExpenseType",e.InoutwriteForm.incomeExpenseType);case 9:case"end":return n.stop()}},n,e)}))()},sureUpload:function(){var t=this;return i()(o.a.mark(function e(){var n;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.InputDialogVisible=!1,n=t,m.a.ajax({url:n.baseurl+"hbte-financial/hbte/incomeExpense/importPaymentInfo",type:"POST",data:t.form1,dataType:"JSON",cache:!1,processData:!1,contentType:!1,success:function(t){0==t.code?n.$message.success("导入成功,不会覆盖原有数据"):n.$message.error(t.errorMsg)},error:function(t){}}),t.InputDialogVisible=!1;case 4:case"end":return e.stop()}},e,t)}))()},getNameId:function(){var t=JSON.parse(localStorage.getItem("data"));this.InoutwriteForm.userInfo.id=t.id,this.InoutwriteForm.userInfo.name=t.userName},moneyExchangeRate:function(t){var e=this.currencyInfoOptions.filter(function(e){return e.currencyInfoId==t})[0].currencyRatio;this.currentduilv=e;var n=+this.InoutwriteForm.expenseAmount;this.turnRMB=this.duilv*n},deleteRow:function(t,e){e.splice(t,1)},startIn:function(){this.dialogVisible=!0},addList:function(t){var e=this.formtest.productLineId,n=this.formtest.practicalSum;""!=n?(this.tableData.push({productLine:{productLineId:e,productLineName:this.aa},practicalSum:n}),this.InoutwriteForm.ieProductLines=this.tableData,this.dialogVisible=!1,this.formtest.productLineId="",this.formtest.productLineName="",this.formtest.practicalSum=""):this.$message.error("金额不能为空")},productLine:function(t){var e;e=this.cpxxxoptions.find(function(e){return e.productLineId===t}),this.aa=e.productLineName},getpaymentTermId:function(){var t=this;return i()(o.a.mark(function e(){var n,r,a,i,s,c,u,l;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.getPaymentTermId();case 2:n=e.sent,r=n.data,a=JSON.parse(localStorage.getItem("data")),t.id=a.id,t.paymentOptions=r,t.InoutwriteForm.paymentTermName=r[0].paymentTermName,i=parseInt(1e7*Math.random()),s=new Date,c=s.getFullYear(),u=s.getMonth()+1,l=s.getDate(),t.InoutwriteForm.oddNumber="HBTE-"+c+u+l+i,t.InoutwriteForm.createDate=c+"-"+u+"-"+l;case 15:case"end":return e.stop()}},e,t)}))()},getcurrencyInfoId:function(){var t=this;return i()(o.a.mark(function e(){var n,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.getCurrencyInfoId();case 2:n=e.sent,r=n.data,t.currencyInfoOptions=r,t.InoutwriteForm.currencyInfo.currencyInfoId=r[0].currencyInfoId;case 6:case"end":return e.stop()}},e,t)}))()},getcustomerInfoId:function(){var t=this;return i()(o.a.mark(function e(){var n,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.getCustomerInfoId();case 2:n=e.sent,r=n.data,t.khxxoptions=r;case 5:case"end":return e.stop()}},e,t)}))()},getcompanyInfoId:function(){var t=this;return i()(o.a.mark(function e(){var n,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.getcompanyInfoId();case 2:n=e.sent,r=n.data,t.companyOptions=r,t.InoutwriteForm.companyInfo.companyInfoId=r[0].companyInfoId;case 6:case"end":return e.stop()}},e,t)}))()},getaccountTitleId:function(){var t=this;return i()(o.a.mark(function e(){var n,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.getAccountTitleList({incomeExpenseType:1});case 2:n=e.sent,r=n.data,t.accountTitleOptions=t.$hbteApi.getTreeData(r);case 5:case"end":return e.stop()}},e,t)}))()},accountHandleChange:function(t){this.InoutwriteForm.accountTitle.accountTitleId=t[t.length-1]||-1},getId:function(){var t=this;return i()(o.a.mark(function e(){var n,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.getDepartmentList();case 2:n=e.sent,r=n.data,t.departmentOptions=t.$hbteApi.getTreeData(r);case 5:case"end":return e.stop()}},e,t)}))()},departmentHandleChange:function(t){this.InoutwriteForm.department.id=t[t.length-1]||-1},getproductLineId:function(){var t=this;return i()(o.a.mark(function e(){var n,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.getProductLine();case 2:n=e.sent,r=n.data,t.cpxxxoptions=r;case 5:case"end":return e.stop()}},e,t)}))()},getprojectInfoId:function(){var t=this;return i()(o.a.mark(function e(){var n,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.getProjectInfoList();case 2:n=e.sent,r=n.data,t.projectOptions=r,t.InoutwriteForm.projectInfo.projectInfoId=r[0].projectInfoId;case 6:case"end":return e.stop()}},e,t)}))()},getOrderNumber:function(t){var e=this;return i()(o.a.mark(function n(){var r,a;return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$axios.get("hbte-financial/hbte/incomeExpense/getIncomeExpenseInfo",{params:{incomeExpenseInfoId:t.incomeExpenseInfo.incomeExpenseInfoId}});case 2:r=n.sent,a=r.data,e.InoutwriteForm.projectInfo.projectInfoId=a.data.projectInfo.projectInfoId,e.InoutwriteForm.currencyInfo.currencyInfoId=a.data.currencyInfo.currencyInfoId,e.InoutwriteForm.paymentTermName=a.data.paymentTermName,e.InoutwriteForm.expenseAmount=a.data.expenseAmount,e.InoutwriteForm.companyInfo.companyInfoId=a.data.companyInfo.companyInfoId,e.InoutwriteForm.customerInfo.customerInfoId=a.data.customerInfo.customerInfoId,e.InoutwriteForm.comment=a.data.comment,e.InoutwriteForm.ieProductLines=a.data.ieProductLines,e.InoutwriteForm.actExecutions=a.data.userInfo.name,e.InoutwriteForm.invoice=a.data.invoice,e.InoutwriteForm.department.id=a.data.department.id,e.InoutwriteForm.supplier.supplierId=a.data.supplier.supplierId,e.departmentList=[],e.getSelectDepartmentId(e.departmentOptions,a.data.department.id),e.accountList=[],-1!=a.data.accountTitle.accountTitleParentId&&e.accountList.push(a.data.accountTitle.accountTitleParentId),e.accountList.push(a.data.accountTitle.accountTitleId),e.InoutwriteForm.accountTitle.accountTitleParentId=a.data.accountTitle.accountTitleParentId,e.InoutwriteForm.accountTitle.accountTitleId=a.data.accountTitle.accountTitleId,a.data.eventInfo.actExecutions.forEach(function(t){e.approveManlist.push(t.userInfo)}),a.data.ieProductLines.forEach(function(t){e.tableData.push({productLine:{productLineId:t.productLine.productLineId,productLineName:t.productLine.productLineName},practicalSum:t.practicalSum})});case 26:case"end":return n.stop()}},n,e)}))()},getSelectDepartmentId:function(t,e){for(var n=0;n<t.length;n++){var r=t[n];if(e==r.id)return void this.departmentList.push(e);if(void 0!=r.children&&(this.getSelectDepartmentId(r.children,e),0!=this.departmentList.length))return void this.departmentList.unshift(r.id)}},addListmodal:function(){var t=this;return i()(o.a.mark(function e(){var n,r,a,i,s,c,u,l,p,m;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:for(n=[],r=0;r<t.approveManlist.length;r++)a={userInfo:{id:t.approveManlist[r].id},actExecutionPriority:r},n.push(a);if(t.InoutwriteForm.actExecutions=n,""!=t.InoutwriteForm.projectInfo.projectInfoId){e.next=9;break}return t.$message.error("提交前,请确认项目信息是否漏填"),e.abrupt("return");case 9:if(""!=t.InoutwriteForm.currencyInfo.currencyInfoId){e.next=14;break}return t.$message.error("提交前,请确认币种是否漏填"),e.abrupt("return");case 14:if(""!=t.InoutwriteForm.expenseAmount){e.next=19;break}return t.$message.error("提交前,请确认支出金额是否漏填"),e.abrupt("return");case 19:if(""!=t.InoutwriteForm.supplier.supplierId){e.next=24;break}return t.$message.error("提交前,请确认供应商是否漏填"),e.abrupt("return");case 24:if(""!=t.InoutwriteForm.department.id){e.next=29;break}return t.$message.error("提交前,请确认所属部门是否漏填"),e.abrupt("return");case 29:if(""!=t.InoutwriteForm.accountTitle.accountTitleId){e.next=34;break}return t.$message.error("提交前,请确认会计科目是否漏填"),e.abrupt("return");case 34:if(""!=t.InoutwriteForm.companyInfo.companyInfoId){e.next=39;break}return t.$message.error("提交前,请确认所属公司是否漏填"),e.abrupt("return");case 39:if(""!=t.InoutwriteForm.paymentTermName){e.next=44;break}return t.$message.error("提交前,请确认付款方式是否漏填"),e.abrupt("return");case 44:if(""!=t.InoutwriteForm.createDate){e.next=49;break}return t.$message.error("提交前,请确认创建时间是否漏填"),e.abrupt("return");case 49:if(""!=t.InoutwriteForm.actExecutions){e.next=54;break}return t.$message.error("请确认审批人是否填写完整"),e.abrupt("return");case 54:if(""!=t.InoutwriteForm.ieProductLines){e.next=57;break}return t.$message.error("请确认产品线是否填写完整"),e.abrupt("return");case 57:return e.next=59,t.$axios.post("hbte-financial/hbte/incomeExpense/saveIncomeExpenseInfo",t.InoutwriteForm);case 59:i=e.sent,0==(s=i.data).code?(t.$message.success("数据录入成功"),t.InoutwriteForm.currencyInfo.currencyInfoId="",t.InoutwriteForm.companyInfo.companyInfoId="",t.InoutwriteForm.createDate="",t.InoutwriteForm.accountTitle.id="",t.InoutwriteForm.oddNumber="",t.InoutwriteForm.projectInfo.projectInfoId="",t.InoutwriteForm.comment="",t.InoutwriteForm.invoice="",t.InoutwriteForm.currencyInfo.currencyInfoId="",t.InoutwriteForm.expenseAmount="",t.InoutwriteForm.supplier.supplierId="",t.InoutwriteForm.companyInfo.companyInfoId="",t.InoutwriteForm.paymentTermName="",t.InoutwriteForm.eventInfo.eventComment="",t.approveManlist=[],t.tableData=[],c=parseInt(1e7*Math.random()),u=new Date,l=u.getFullYear(),p=u.getMonth()+1,m=u.getDate(),t.InoutwriteForm.oddNumber="HBTE-"+l+p+m+c,t.InoutwriteForm.createDate=l+"-"+p+"-"+m):t.$message.error(s.errorMsg);case 62:case"end":return e.stop()}},e,t)}))()},getUserInfoList:function(){var t=this;return i()(o.a.mark(function e(){var n,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.getDepartmentUserList();case 2:n=e.sent,r=n.data,t.syroptions=r;case 5:case"end":return e.stop()}},e,t)}))()},getsupplierId:function(){var t=this;return i()(o.a.mark(function e(){var n,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.getSupplierList();case 2:n=e.sent,r=n.data,t.supplierOptions=r,t.InoutwriteForm.supplier.supplierId=r[0].supplierId;case 6:case"end":return e.stop()}},e,t)}))()}}},I={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"InOutAddWrite"},[n("el-button",{staticStyle:{"margin-bottom":"20px"},attrs:{type:"success"},on:{click:t.inBtn}},[t._v("导入")]),t._v(" "),n("el-dialog",{attrs:{title:"导入",visible:t.InputDialogVisible,width:"30%"},on:{"update:visible":function(e){t.InputDialogVisible=e}}},[n("el-row",[n("a",{attrs:{href:"###"}},[n("input",{ref:"fileInput",attrs:{type:"file"},on:{change:t.getFile}})])]),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.InputDialogVisible=!1}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.sureUpload}},[t._v("确定录入")])],1)],1),t._v(" "),n("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.InoutwriteForm}},[n("el-row",[n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"单　　号"}},[n("el-input",{attrs:{lg:12},model:{value:t.InoutwriteForm.oddNumber,callback:function(e){t.$set(t.InoutwriteForm,"oddNumber",e)},expression:"InoutwriteForm.oddNumber"}})],1)],1),t._v(" "),n("el-col",{attrs:{span:6}}),t._v(" "),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"制单人员"}},[n("el-input",{attrs:{disabled:!0,placeholder:"请输入制单人"},model:{value:t.InoutwriteForm.userInfo.name,callback:function(e){t.$set(t.InoutwriteForm.userInfo,"name",e)},expression:"InoutwriteForm.userInfo.name"}})],1)],1),t._v(" "),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"项目信息"}},[n("div",{staticClass:"block"},[n("el-select",{attrs:{placeholder:"请选择"},model:{value:t.InoutwriteForm.projectInfo.projectInfoId,callback:function(e){t.$set(t.InoutwriteForm.projectInfo,"projectInfoId",e)},expression:"InoutwriteForm.projectInfo.projectInfoId"}},t._l(t.projectOptions,function(t){return n("el-option",{key:t.projectInfoId,attrs:{label:t.projectName,value:t.projectInfoId}})}),1)],1)])],1),t._v(" "),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"付款方式"}},[n("el-select",{attrs:{placeholder:"请选择"},model:{value:t.InoutwriteForm.paymentTermName,callback:function(e){t.$set(t.InoutwriteForm,"paymentTermName",e)},expression:"InoutwriteForm.paymentTermName"}},t._l(t.paymentOptions,function(t){return n("el-option",{key:t.paymentTermId,attrs:{label:t.paymentTermName,value:t.paymentTermName}})}),1)],1)],1)],1),t._v(" "),n("el-row",[n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"币　　种"}},[n("el-select",{attrs:{placeholder:"请选择"},on:{change:function(e){return t.moneyExchangeRate(t.InoutwriteForm.currencyInfo.currencyInfoId)}},model:{value:t.InoutwriteForm.currencyInfo.currencyInfoId,callback:function(e){t.$set(t.InoutwriteForm.currencyInfo,"currencyInfoId",e)},expression:"InoutwriteForm.currencyInfo.currencyInfoId"}},t._l(t.currencyInfoOptions,function(t){return n("el-option",{key:t.currencyInfoId,attrs:{label:t.currencyName,value:t.currencyInfoId}})}),1)],1)],1),t._v(" "),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"支出金额"}},[n("el-input",{attrs:{placeholder:"请输入支出金额",type:"number"},model:{value:t.InoutwriteForm.expenseAmount,callback:function(e){t.$set(t.InoutwriteForm,"expenseAmount",e)},expression:"InoutwriteForm.expenseAmount"}})],1)],1),t._v(" "),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"兑人民币"}},[n("el-input",{attrs:{placeholder:"请输入支出金额",disabled:""},model:{value:t.sumMoneyRate,callback:function(e){t.sumMoneyRate=e},expression:"sumMoneyRate"}})],1)],1),t._v(" "),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"供应商　"}},[n("el-select",{attrs:{placeholder:"请选择"},model:{value:t.InoutwriteForm.supplier.supplierId,callback:function(e){t.$set(t.InoutwriteForm.supplier,"supplierId",e)},expression:"InoutwriteForm.supplier.supplierId"}},t._l(t.supplierOptions,function(t){return n("el-option",{key:t.supplierId,attrs:{label:t.supplierName,value:t.supplierId}})}),1)],1)],1)],1),t._v(" "),n("el-row",[n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"所属部门"}},[n("el-cascader",{attrs:{options:t.departmentOptions,props:{label:"name",value:"id",children:"children"},filterable:"",placeholder:"请选择(默认为一级分类)"},on:{change:t.departmentHandleChange},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.data.name))])]}}]),model:{value:t.departmentList,callback:function(e){t.departmentList=e},expression:"departmentList"}})],1)],1),t._v(" "),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"会计科目"}},[n("div",{staticClass:"block"},[n("el-cascader",{attrs:{options:t.accountTitleOptions,props:{label:"accountTitleName",value:"accountTitleId",children:"children"},filterable:"",placeholder:"请选择(默认为一级分类)"},on:{change:t.accountHandleChange},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.data.accountTitleCode)+"-"+t._s(e.data.accountTitleName))])]}}]),model:{value:t.accountList,callback:function(e){t.accountList=e},expression:"accountList"}})],1)])],1),t._v(" "),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"所属公司"}},[n("div",{staticClass:"block"},[n("el-select",{attrs:{placeholder:"请选择"},model:{value:t.InoutwriteForm.companyInfo.companyInfoId,callback:function(e){t.$set(t.InoutwriteForm.companyInfo,"companyInfoId",e)},expression:"InoutwriteForm.companyInfo.companyInfoId"}},t._l(t.companyOptions,function(t){return n("el-option",{key:t.companyInfoId,attrs:{label:t.companyName,value:t.companyInfoId}})}),1)],1)])],1),t._v(" "),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"摘　　要"}},[n("el-input",{model:{value:t.InoutwriteForm.comment,callback:function(e){t.$set(t.InoutwriteForm,"comment",e)},expression:"InoutwriteForm.comment"}})],1)],1)],1),t._v(" "),n("el-row",[n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"发　　票"}},[n("el-input",{model:{value:t.InoutwriteForm.invoice,callback:function(e){t.$set(t.InoutwriteForm,"invoice",e)},expression:"InoutwriteForm.invoice"}})],1)],1),t._v(" "),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"制单日期"}},[n("div",{staticClass:"block"},[n("el-date-picker",{staticClass:"mr0",staticStyle:{width:"88%"},attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:t.InoutwriteForm.createDate,callback:function(e){t.$set(t.InoutwriteForm,"createDate",e)},expression:"InoutwriteForm.createDate"}})],1)])],1)],1),t._v(" "),n("div",[n("hbte-people-table",{attrs:{approveManlist:t.approveManlist,applyManOptions:t.applyManOptions,treePeopleOptions:t.syroptions},on:{"del-approve-mancp":t.delApproveMancp,"handle-node-click":t.handleNodeClickcp,"handle-close":t.handleClosecp,"apply-man":t.applyMancp}})],1),t._v(" "),n("div",[n("el-form-item",{attrs:{label:""}},[n("el-button",{staticStyle:{"margin-left":"0"},attrs:{type:"success"},on:{click:t.startIn}},[t._v("添加产品线")]),t._v(" "),n("el-button",{attrs:{type:"success"},on:{click:t.addListmodal}},[t._v("录入")])],1)],1)],1),t._v(" "),n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData}},[n("el-table-column",{attrs:{type:"index",label:"序号"}}),t._v(" "),n("el-table-column",{attrs:{prop:"productLine.productLineName",label:"产品线"}}),t._v(" "),n("el-table-column",{attrs:{prop:"practicalSum",label:"金　额"}}),t._v(" "),n("el-table-column",{attrs:{fixed:"right",label:"操作",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(n){return n.preventDefault(),t.deleteRow(e.$index,t.tableData)}}},[t._v("移除")])]}}])})],1),t._v(" "),n("el-dialog",{attrs:{title:"添加",visible:t.dialogVisible,width:"35%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[n("el-form",{ref:"formtest",attrs:{model:t.formtest,"label-width":"80px"}},[n("el-form-item",{attrs:{label:"产品线"}},[n("el-select",{attrs:{placeholder:"请选择"},on:{change:t.productLine},model:{value:t.formtest.productLineId,callback:function(e){t.$set(t.formtest,"productLineId",e)},expression:"formtest.productLineId"}},t._l(t.cpxxxoptions,function(t){return n("el-option",{key:t.productLineId,attrs:{label:t.productLineName,value:t.productLineId}})}),1)],1),t._v(" "),n("el-form-item",{attrs:{label:"金  额"}},[n("el-input",{staticClass:"lgpro",attrs:{type:"number"},model:{value:t.formtest.practicalSum,callback:function(e){t.$set(t.formtest,"practicalSum",e)},expression:"formtest.practicalSum"}})],1)],1),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.addList(t.formtest)}}},[t._v("保 存")])],1)],1)],1)},staticRenderFns:[]};var h=n("VU/8")(f,I,!1,function(t){n("CEkt")},"data-v-2f515928",null);e.default=h.exports}});
//# sourceMappingURL=27.35db2a4a8f91a9e96e82.js.map