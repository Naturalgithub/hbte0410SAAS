webpackJsonp([12],{MCaa:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("Xxa5"),n=e.n(s),i=e("exGp"),r=e.n(i),o={data:function(){return{touxiang:"touxiang",boduo:!1,userid:"",userinfo:{name:"",position:"",workPlace:"",avatar:""},personinfo:"",data:[],defaultProps:{children:"children",label:"title"},rotate:!1}},created:function(){this.getdepartmentname(),this.getPersoninfo(),this.getUserInfo()},methods:{start:function(){this.rotate=!this.rotate},getPersoninfo:function(){var t=JSON.parse(localStorage.getItem("data"));this.personinfo=t,this.userid=t.id},showdetile:function(t){},getUserInfo:function(){var t=this;return r()(n.a.mark(function a(){var e;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.$axios.get("hbte-financial/hbte/userInfo/getUserInfo",{params:{id:t.userid}});case 2:e=a.sent,t.userinfo=e.data.data;case 5:case"end":return a.stop()}},a,t)}))()},getdepartmentname:function(){var t=this;return r()(n.a.mark(function a(){var e,s;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.$axios.get("hbte-financial/hbte/department/departmentUserList");case 2:e=a.sent,s=e.data,t.data=s.data;case 5:case"end":return a.stop()}},a,t)}))()},handleNodeClick:function(t){39==t.id?this.boduo=!0:this.boduo=!1,2==t.type&&(this.userid=t.id,this.getUserInfo())}}},c={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"department",staticStyle:{height:"100%"}},[e("div",{staticClass:"container bgcgreen"},[e("div",{staticClass:"fl w260"},[e("el-tree",{attrs:{data:t.data,"node-key":"id","default-expanded-keys":[1],accordion:"",props:t.defaultProps},on:{"node-click":t.handleNodeClick},scopedSlots:t._u([{key:"default",fn:function(a){a.node;var s=a.data;return e("span",{staticClass:"custom-tree-node"},[1==s.type?e("span",{staticClass:"el-icon-office-building"}):e("span",[e("span",{staticClass:"touxiang"},[e("img",{attrs:{src:s.avatar,alt:""}})])]),t._v(" \n          "),e("span",[t._v(t._s(s.title))])])}}])})],1),t._v(" "),e("div",{staticClass:"fl de_main"},[e("div",{staticClass:"de_main_header"},[e("div",[e("div",{staticClass:"header"},[e("div",{staticClass:"touxianglogo",on:{click:t.start}},[e("img",{class:[t.rotate?"go":"aa"],attrs:{src:t.userinfo.avatar,alt:""}})])]),t._v(" "),e("div",{staticClass:"header2"},[e("span",{staticClass:"el-icon-user"},[t._v("  "+t._s(t.userinfo.name)+"  |")]),t._v(" "),e("span",{staticClass:"el-icon-money"},[t._v(" "+t._s(t.userinfo.position)+"  |")]),t._v(" "),e("span",{staticClass:"el-icon-position"},[t._v(" "+t._s(t.userinfo.workPlace)+"  ")])]),t._v(" "),e("div",[t._v("功能开发中")])])])])])])},staticRenderFns:[]};var d=e("VU/8")(o,c,!1,function(t){e("SBa1")},"data-v-af70a310",null);a.default=d.exports},SBa1:function(t,a){}});
//# sourceMappingURL=12.f136250b910f83e2f96c.js.map