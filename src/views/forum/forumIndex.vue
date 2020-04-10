<template>
  <div class="forumIndex">
    <el-form :inline="true" class="demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item style="width:70%">
            <el-date-picker
              style="width:100%"
              v-model="timeValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @change="searchTime"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-select
              clearable
              v-model="fmTagNameid"
              placeholder="请选择标签"
              style="width:80%"
              @change="clickproblemType"
            >
              <el-option
                v-for="item in fmTaglist"
                :key="item.id"
                :label="item.fmTagName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-select
              style="width:90%"
              clearable
              v-model="problemTypeInfos.id"
              placeholder="请选择问题类型"
              @change="clickproblemType"
            >
              <el-option
                v-for="item in problemTypeInfoslist"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item>
            <el-input
              v-model="bttitle"
              style="width:80%"
              placeholder="标题"
              :lg="12"
              @keyup.native="titlechange"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="forumList" border size="mini">
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="title" label="标题">
        <template v-slot:default="{row}">
          <el-link type="primary" @click="showdialog(row)" v-html="row.title"></el-link>
        </template>
      </el-table-column>
      <!-- <el-table-column label="内容" :show-overflow-tooltip="true">
        <template v-slot:default="{row}">
          <el-link style="color:rgb(64, 158, 255)" @click="showdialog(row)" v-html="row.content"></el-link>
        </template>
      </el-table-column>-->
      <el-table-column label="标签" width="150" size="mini">
        <template v-slot:default="{row}">
          <!-- {{row}} -->
          <el-tag v-for=" item in row.fmTags" :key="item.id" size="mini">{{item.fmTagName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template v-slot:default="{row}">
          <span v-if="row.status==1">已解决</span>
          <span v-else>待解决</span>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="提问人" width="100" />
      <el-table-column prop="user.name" label="提交人" width="100" />

      <el-table-column prop="problemTypeInfo.name" label="问题类型" width="100" />
      <el-table-column prop="datatime" label="时间" width="100" />
    </el-table>
    <el-pagination
      style="margin-top:10px"
      background
      :current-page="page"
      @size-change="handleSizeChange"
      :page-sizes="[30,50,80]"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />

    <!-- 详情模态框 -->
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      top="10vh"
      width="70%"
      :before-close="handleClose"
    >
      <div class="main">
        <h2>{{responsedialog.title}}</h2>
        <p>
          <span class="span1">{{responsedialog.user.name}}</span>
          <span>最后发布于</span>
          <span style="font-size:12px">{{responsedialog.datatime}}</span>
        </p>
        <div class="content">
          <div v-html="responsedialog.content"></div>
        </div>
        <div class="foot">
          <div class="footcontent">
            <div class="img">
              <img :src="selfavatar" alt />
            </div>
            <div>
              <el-input v-model="content" type="textarea" width="100%;" placeholder="想对同事说点什么?"></el-input>
            </div>
            <el-button
              class="fr"
              style="margin-top:3px"
              type="sccuss"
              size="mini"
              @click="sentcontent(responsedialog.id)"
            >发送</el-button>
          </div>
        </div>
        <div class="foottwo">
          <ul>
            <li v-for="item1 in commentlist" :key="item1.id" style="padding-top:10px">
              <div class="foottwoimg">
                <img :src="item1.user.avatar" alt />
                <span class="f700">{{item1.user.name}}</span>
                <span class="font12">{{item1.datetime}}</span>
                <p>
                  <span
                    class="pading200"
                    style="font-size:14px"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item1.content}}</span>

                  <span style="posright">
                    <span>
                      <el-link type="primary" @click="response(item1)">回复</el-link>
                    </span>
                    <span>
                      <span v-if="outuserId==loginId?true:false&&item1.accept!=1">
                        &nbsp;|
                        <el-link type="primary" @click="acceptitem1(item1)">采纳</el-link>
                      </span>

                      <!-- <span v-if="item1.accept==0">已采纳</span> -->
                    </span>
                    <span>
                      <span v-if="item1.user.id==loginId?true:false">
                        &nbsp;|
                        <el-link type="danger" @click="delitem1(item1)">删除</el-link>
                      </span>
                    </span>
                    <span
                      v-if="item1.accept==1"
                      style="font-weight:700;font-size:14px;padding-top:3px;"
                    >&nbsp;&nbsp;&nbsp;&nbsp;已采纳</span>
                  </span>
                </p>
                <ul style="padding-left:20px;padding-bottom:20px;">
                  <li
                    v-for="item2 in item1.children"
                    :key="item2.id"
                    style="padding-top:10px;padding-bottom:10px"
                  >
                    <div class="foottwoimg">
                      <img :src="item2.user.avatar" alt />
                      <span class="f700">{{item2.user.name}}</span>
                      <!-- <span>回复</span>
                      <span class="f700">kye</span>-->
                      <span class="font12">{{item2.datetime}}</span>
                      &nbsp; &nbsp; &nbsp; &nbsp;
                      <span
                        class="pading200"
                      >{{item2.content}}</span>
                      <span>
                        <span>
                          <el-link type="primary" @click="response2(item2)">回复</el-link>
                        </span>
                        <span>
                          <!-- <el-link type="primary">采纳</el-link> -->
                          <span v-if="outuserId==loginId?true:false">
                            &nbsp;|
                            <el-link type="primary" @click="acceptitem2(item2)">采纳</el-link>
                          </span>
                        </span>
                        <span>
                          <!-- <el-link type="danger">
                            <span v-if="item2.user.id==loginId?true:false">删除</span>
                          </el-link>-->
                          <span v-if="item2.user.id==loginId?true:false">
                            &nbsp;|
                            <el-link type="danger" @click="delitem2(item2)">删除</el-link>
                          </span>
                          <span
                            v-if="item2.accept==1"
                            style="font-weight:700;font-size:14px;padding-top:3px;"
                          >&nbsp;&nbsp;&nbsp;&nbsp;已采纳</span>
                        </span>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="test"></div>
      <el-dialog width="30%" title="回复" :visible.sync="innerVisiblecontent1" append-to-body>
        <el-form label-width="50px">
          <el-form-item label="内容">
            <el-input
              v-model="responsecontent1"
              placeholder="请输入回复内容"
              :lg="12"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 6}"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="innerVisiblecontent1add">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog width="30%" title="回复" :visible.sync="innerVisiblecontent2" append-to-body>
        <el-form label-width="50px">
          <el-form-item label="内容">
            <el-input
              v-model="responsecontent2"
              placeholder="请输入回复内容"
              :lg="12"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 6}"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="innerVisiblecontent2add">确 定</el-button>
        </span>
      </el-dialog>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>-->
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      outuserId: '',
      loginId: JSON.parse(localStorage.getItem('data')).id,
      forumId: '',
      responsecontent1: '',
      responsecontent2: '',
      bttitle: '',
      innerVisiblecontent1: false,
      innerVisiblecontent2: false,
      selfavatar: JSON.parse(localStorage.getItem('data')).avatar,
      datetime: '',
      problemTypeInfoslist: [],
      problemTypeInfos: { id: '' },
      startTime: '',
      endTime: '',
      timeValue: [],
      inputValue: [],
      fmTaglist: [],
      content: '',
      responsedialog: { user: { name } },
      dialogVisible: false,
      total: 0,
      page: 1,
      pageSize: 50,
      item1: {},
      item2: {},
      testobj: {
        name: 2
      },
      fmTagNameid: '',
      forumList: [],
      commentlist: []
    }
  },
  created () {
    this.getcommentlist()
    this.getForumList()
    this.getfmTaglist()
    this.getproblemTypeInfoslist()
    let aa = this.$hbteApi.nowTime()
    this.datetime = `${aa.nowYear}-${aa.nowMonth}-${aa.nowDate} ${aa.nowHours}:${aa.nowMinutess}`
  },
  // watch: {
  //   commentlist (n, old) {
  //     this.commentlist = n
  //   }
  // },
  methods: {
    async  acceptitem1 (item1) {
      const res = await this.$http.commentlistaccept({ id: item1.id, accept: 1 })
      if (res.code == 0) {
        this.$message.success('操作成功')
        this.getcommentlist()
      } else {
        this.$message.error(res.message)
      }
    },
    async  acceptitem2 (item2) {
      const res = await this.$http.commentlistaccept({ id: item2.id, accept: 1 })
      if (res.code == 0) {
        this.$message.success('操作成功')
        this.getcommentlist()
      } else {
        this.$message.error(res.message)
      }
    },
    async delitem1 (item1) {
      // alert(item1.id)
      const res = await this.$http.commentlistdelete({ id: item1.id })
      this.getcommentlist()
      if (res.code == 0) {
        this.$message.success('删除成功')
      }
    },
    async delitem2 (item2) {
      // alert(item1.id)
      const res = await this.$http.commentlistdelete({ id: item2.id })
      if (res.code == 0) {
        this.$message.success('删除成功')
        this.getcommentlist()
      }
      // this.getcommentlist()
    },
    titlechange () {
      console.log(2)

      this.getForumList()
    },
    async innerVisiblecontent2add () {
      const res = await this.$http.commentadd({
        content: this.responsecontent2,
        parentId: this.item2.parentId,
        user: { id: this.loginId },
        forumId: this.forumId,
        datetime: this.datetime
      })
      if (res.code == 0) {
        this.$message.success('回复成功')
        this.getcommentlist()
        this.responsecontent2 = ''
        this.innerVisiblecontent2 = false
      } else {
        this.$message.error(res.message)
      }
    },
    async innerVisiblecontent1add () {
      const res = await this.$http.commentadd({
        content: this.responsecontent1,
        parentId: this.item1.id,
        user: { id: this.loginId },
        forumId: this.forumId,
        datetime: this.datetime
      })
      if (res.code == 0) {
        this.$message.success('回复成功')
        this.getcommentlist()
        this.responsecontent1 = ''
        this.innerVisiblecontent1 = false
      } else {
        this.$message.error(res.message)
      }
    },
    response (v) {
      this.item1 = v
      this.innerVisiblecontent1 = true
    },
    response2 (v) {
      this.item2 = v
      this.innerVisiblecontent2 = true
    },
    async  sentcontent (id) {
      const res = await this.$http.commentadd({ datetime: this.datetime, user: { id: JSON.parse(localStorage.getItem('data')).id }, forumId: id, content: this.content })
      if (res.code == 0) {
        this.$message.success('发表成功')
        this.content = ''
        this.showdialog()
        this.getcommentlist()
      } else {
        this.$message.error(res.message)
      }
    },
    async getcommentlist (id) {
      if (id == undefined) {
        id = this.$store.state.forumId
      }
      const res = await this.$http.commentlist({ forumId: id })
      this.commentlist = res.result
    },
    async  showdialog (row) {
      console.log(row)
      this.$store.state.forumId = row.id
      this.forumId = row.id
      this.outuserId = row.user.id
      const res = await this.$http.commentlist({ forumId: row.id })
      console.log(res.result)
      this.commentlist = res.result
      this.responsedialog = row
      this.dialogVisible = true
    },
    clickproblemType () {
      this.getForumList()
    },
    async getproblemTypeInfoslist () {
      const res = await this.$http.problemTypelist()
      this.problemTypeInfoslist = res.result
    },
    /// ///
    searchTime (v) {
      if (v == null) {
        this.startTime = ''
        this.endTime = ''
        this.getForumList()
        return
      }
      this.startTime = v[0]
      this.endTime = v[1]
      this.getForumList()
    },
    /// ////
    async getfmTaglist () {
      const res = await this.$http.fmTaglist()
      this.fmTaglist = res.result
    },

    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.content = ''
        })
        .catch(_ => { })
    },
    async getForumList () {
      const res = await this.$http.forumList({
        page: this.page,
        pageSize: this.pageSize,
        userId: this.ids,
        problemTypeId: this.problemTypeInfos.id,
        title: this.bttitle,
        fmTagId: this.fmTagNameid,
        startTime: this.startTime,
        endTime: this.endTime
      })
      console.log(res)
      this.forumList = res.result
      this.total = res.result.length
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.page = 1
      this.getForumList()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getForumList()
    }
  }
}

</script>

<style lang='scss' scoped>
.content {
  min-height: 100px;
}
.main {
  h2 {
    margin-bottom: 10px;
  }
  p {
    // border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    .span1 {
      color: coral;
      font-size: 12px;
    }
  }
  .content {
    padding-top: 20px;
  }
  .fl {
    float: left;
  }
  .foot {
    margin-top: 20px;
    width: 100;
    height: 100px;
    padding: 10px 30px 10px 40px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    .footcontent {
      width: 100%;
      height: 90px;
      // background: red;
      .img {
        position: relative;
        left: -24px;
        top: 40%;
        img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
      }
    }
  }
}
.fr {
  float: right;
}
.posright {
  position: absolute;
  right: 0;
}
.foottwoimg {
  img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    border-radius: 50%;
  }

  .f700 {
    font-weight: 700;
  }
  .font12 {
    font-size: 10px;
    color: #ccc;
  }
  p {
    margin-top: 10px;

    font-size: 10px;
  }
  .pading200 {
    padding-right: 50px;
  }
}
</style>
