webpackJsonp([31],{GBIb:function(e,t){},HkiD:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Xxa5"),r=a.n(n),s=a("exGp"),u=a.n(s),l=a("t4zo"),c=a.n(l),o=a("uXZL"),i=a.n(o),d={data:function(){return{options:[{value:"1",label:"1月"},{value:"2",label:"2月"},{value:"3",label:"3月"},{value:"4",label:"4月"},{value:"5",label:"5月"},{value:"6",label:"6月"},{value:"7",label:"7月"},{value:"8",label:"8月"},{value:"9",label:"9月"},{value:"10",label:"5月"},{value:"11",label:"11月"},{value:"12",label:"12月"}],accountTitleValue:"",departmentvalue:"",departmentOptions:[],value:"",accountTitleOptions:[],dapartmentList:[],tableData:[],valueDate:[],startTime:"",endTime:"",budget:"",budgetDisable:!0,code:0,passBackEndData:{date:"",budgetSum:"",departmentId:"",accountTitleId:""}}},created:function(){var e=this.$hbteApi.nowTime();this.startTime=e.nowYear+"-"+e.nowMonth,this.endTime=e.nowYear+"-"+e.nowMonth,this.getkuaijiList(),this.getInOutList()},methods:{getInOutList:function(){var e=this;return u()(r.a.mark(function t(){var a,n,s;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=JSON.parse(localStorage.getItem("data")),t.next=3,e.$http.getDepartmentList({id:a.id});case 3:n=t.sent,s=n.data,e.departmentOptions=e.$hbteApi.getTreeData(s),e.dapartmentList=s;case 7:case"end":return t.stop()}},t,e)}))()},passDate:function(e){var t=this;return u()(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(""===t.passBackEndData.departmentId||""===t.passBackEndData.accountTitleId){e.next=9;break}return t.budgetDisable=!1,t.passBackEndData.budgetSum="",e.next=6,t.$http.getBudgetNum(t.passBackEndData);case 6:0==(a=e.sent).code?(t.code=0,t.passBackEndData.budgetSum=a.data.budgetSum):-1===a.code&&(t.code=a.code);case 9:case"end":return e.stop()}},e,t)}))()},departmentHandleChange:function(e){var t=this;return u()(r.a.mark(function a(){var n;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(t.passBackEndData.departmentId=e[e.length-1]||-1,""===t.passBackEndData.accountTitleId||""===t.passBackEndData.date){a.next=10;break}return t.budgetDisable=!1,t.passBackEndData.budgetSum="",a.next=8,t.$http.getBudgetNum(t.passBackEndData);case 8:0==(n=a.sent).code?(t.code=0,t.passBackEndData.budgetSum=n.data.budgetSum):-1===n.code&&(t.code=n.code);case 10:case"end":return a.stop()}},a,t)}))()},accountHandleChange:function(e){var t=this;return u()(r.a.mark(function a(){var n;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(t.passBackEndData.accountTitleId=e[e.length-1]||-1,""===t.passBackEndData.departmentId||""===t.passBackEndData.date){a.next=10;break}return t.budgetDisable=!1,t.passBackEndData.budgetSum="",a.next=7,t.$http.getBudgetNum(t.passBackEndData);case 7:0==(n=a.sent).code?(t.code=0,t.passBackEndData.budgetSum=n.data.budgetSum):-1===n.code&&(t.code=n.code);case 10:case"end":return a.stop()}},a,t)}))()},sureSubmit:function(){var e=this;return u()(r.a.mark(function t(){var a,n,s;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(-1!=e.passBackEndData.departmentId){t.next=6;break}return e.$message.info("请选择部门"),t.abrupt("return");case 6:if(""!==e.passBackEndData.budgetSum){t.next=11;break}return e.$message.info("请填写预算金额"),t.abrupt("return");case 11:if(-1!=e.passBackEndData.accountTitleId){t.next=16;break}return e.$message.info("请选择部门"),t.abrupt("return");case 16:if(null!=e.passBackEndData.date){t.next=19;break}return e.$message.info("请选择日期"),t.abrupt("return");case 19:if(a=function(){e.passBackEndData.departmentId="",e.passBackEndData.budgetSum="",e.passBackEndData.departmentId="",e.passBackEndData.accountTitleId="",e.passBackEndData.date="",e.departmentvalue="",e.accountTitleValue=""},0!==e.code){t.next=27;break}return t.next=23,e.$http.updateBudgetSum(e.passBackEndData);case 23:0===(n=t.sent).code?(e.$message.success("提交成功"),a()):e.$message.error(n.eroMsg),t.next=33;break;case 27:if(-1!==e.code){t.next=33;break}return t.next=30,e.$http.saveBudget(e.passBackEndData);case 30:0===(s=t.sent).code?(e.$message.success("提交成功"),a()):e.$message.error(s.eroMsg);case 33:e.getkuaijiList();case 34:case"end":return t.stop()}},t,e)}))()},NumFormat:function(e){for(var t=(e+"").split("."),a=t[0]+"",n=t[1]||"",r=a.length%3,s=a.substring(0,r),u=0;u<Math.floor(a.length/3);u++)s+=","+a.substring(r+3*u,r+3*(u+1));return 0===r&&(s=s.substring(1)),s+(n?"."+n:"")},roundDate:function(e){e?(this.startTime=e[0],this.endTime=e[1]):(this.startTime="",this.endTime=" "),this.getkuaijiList()},output:function(e){var t=document.querySelector("#table").cloneNode(!0);t.removeChild(t.querySelector(".el-table__fixed"));var a=i.a.utils.table_to_book(t,{raw:!0});this.companyReport;this.dataEndDate&&this.dataEndDate;var n=i.a.write(a,{bookType:"xlsx",bookSST:!0,type:"array"});try{c.a.saveAs(new Blob([n],{type:"application/octet-stream"}),"各部门收支汇总表.xlsx")}catch(e){}return n},getkuaijiList:function(){var e=this;return u()(r.a.mark(function t(){var a,n,s,u,l;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.getAccountTitleDepartmentSum({startTime:e.startTime,endTime:e.endTime});case 2:for(a=t.sent,n=a.data,s=n,u=[],l=0;l<s.length;l++)l>0&&l<s.length-1&&u.push(s[l]);e.tableData=u,e.accountTitleOptions=e.$hbteApi.getTreeData(n);case 9:case"end":return t.stop()}},t,e)}))()},lastCountRow:function(e,t){for(var a=0;a<e.budgets.length;a++)if(e.budgets[a].departmentId===t&&"0.00"!==e.budgets[a].budgetSum)return this.$hbteApi.addComma(e.budgets[a].budgetSum)},countRow:function(e){var t=Number(e);return""==t?"":this.$hbteApi.addComma(t)},queryList:function(e){this.getkuaijiList()}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"InOutQuery"},[a("div",{staticClass:"export"},[a("span",[a("el-row",[a("el-form",[a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"选择部门:"}},[a("el-cascader",{staticStyle:{width:"70% !important"},attrs:{options:e.departmentOptions,props:{checkStrictly:!1,label:"name",value:"id",children:"children"},clearable:"",placeholder:"请选择(默认为一级分类)"},on:{change:e.departmentHandleChange},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.data.name))])]}}]),model:{value:e.departmentvalue,callback:function(t){e.departmentvalue=t},expression:"departmentvalue"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"选择科目:"}},[a("el-cascader",{staticStyle:{width:"70% !important"},attrs:{options:e.accountTitleOptions,props:{label:"accountTitleName",value:"accountTitleId",children:"children"},clearable:"",placeholder:"请选择(默认为一级分类)"},on:{change:e.accountHandleChange},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.data.accountTitleCode)+"-"+e._s(t.data.accountTitleName))])]}}]),model:{value:e.accountTitleValue,callback:function(t){e.accountTitleValue=t},expression:"accountTitleValue"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"选择日期:"}},[a("el-date-picker",{staticStyle:{width:"70%"},attrs:{"value-format":"yyyy-MM",type:"month",placeholder:"选择日期"},on:{change:e.passDate},model:{value:e.passBackEndData.date,callback:function(t){e.$set(e.passBackEndData,"date",t)},expression:"passBackEndData.date"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:4}},[a("el-form-item",{attrs:{label:"预算金额:"}},[a("el-input",{attrs:{disabled:e.budgetDisable,type:"number"},model:{value:e.passBackEndData.budgetSum,callback:function(t){e.$set(e.passBackEndData,"budgetSum",t)},expression:"passBackEndData.budgetSum"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:4}},[a("el-button",{attrs:{type:"success"},on:{click:e.sureSubmit}},[e._v("提交")])],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"查询日期:"}},[a("el-date-picker",{staticStyle:{"margin-bottom":"0px"},attrs:{type:"monthrange",align:"right","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM"},on:{change:e.roundDate},model:{value:e.valueDate,callback:function(t){e.valueDate=t},expression:"valueDate"}})],1)],1)],1)],1)],1)]),e._v(" "),a("el-table",{staticStyle:{width:"100%","margin-bottom":"20px","margin-top":"10px"},attrs:{id:"table",data:e.tableData,border:"",size:"mini","row-key":"accountTitleId","tree-props":{children:"children",hasChildren:"hasChildren",label:"accountTitleName"}}},[a("el-table-column",{attrs:{prop:"accountTitleName",label:"预算明细/部门",fixed:"",width:"153"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"合计",prop:"accountCount"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(e._s(0==a.budgetSum?"":e.NumFormat(a.budgetSum)))]}}])}),e._v(" "),e._l(e.dapartmentList,function(t){return a("el-table-column",{key:t.id,attrs:{align:"center",label:t.name},scopedSlots:e._u([{key:"default",fn:function(a){var n=a.row;return[e._v(e._s(e.lastCountRow(n,t.id)))]}}],null,!0)},[e._v(" "),e._l(t.children,function(t){return a("el-table-column",{key:t.id,attrs:{align:"center",prop:"",label:t.name},scopedSlots:e._u([{key:"default",fn:function(a){var n=a.row;return[e._v(e._s(e.lastCountRow(n,t.id)))]}}],null,!0)},[e._v(" "),e._l(t.children,function(t){return a("el-table-column",{key:t.id,attrs:{align:"center",prop:"",label:t.name},scopedSlots:e._u([{key:"default",fn:function(a){var n=a.row;return[e._v(e._s(e.lastCountRow(n,t.id)))]}}],null,!0)},[e._v(" "),e._l(t.children,function(t){return a("el-table-column",{key:t.id,attrs:{align:"center",prop:"",label:t.name},scopedSlots:e._u([{key:"default",fn:function(a){var n=a.row;return[e._v(e._s(e.lastCountRow(n,t.id)))]}}],null,!0)})})],2)})],2)})],2)})],2)],1)},staticRenderFns:[]};var m=a("VU/8")(d,p,!1,function(e){a("GBIb")},"data-v-109e0462",null);t.default=m.exports}});
//# sourceMappingURL=31.77e68907f3ca8a9c596e.js.map