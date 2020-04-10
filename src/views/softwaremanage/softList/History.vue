<template>
  <div class="history">
    <el-form :inline="true">
      <el-row>
        <el-col :span="8">
          <el-form-item label=" 下载时间:">
            <el-date-picker
              v-model="timeValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="searchTime"
              value-format="yyyy-MM"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="客户名称">
            <el-input :lg="12" v-model="customerName" @keyup.native="searchCst"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="软件名称">
            <el-input :lg="12" v-model="software.name" @keyup.native="searchSfn"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5"></el-col>
      </el-row>
    </el-form>
    <el-table style="margin-top:20px" :data="historyList" border size="mini">
      <el-table-column align="center" type="index" label="序号" width="50" />
      <el-table-column align="center" prop="customerName" label="客户名称">
        <template v-slot:default="{row}">
          <el-link type="primary" @click="passCustomerDetail(row)">{{row.customerName}}</el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="software.name" label="软件名称">
        <template v-slot:default="{row}">
          <el-link type="primary" @click="passDetail(row)">{{row.software.name}}</el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="software.version" label="版本号" />
      <el-table-column align="center" prop="user.name" label="下载人员" />
      <el-table-column align="center" prop="downloadTime" label="下载时间" />

      <el-table-column label="操作">
        <template v-slot:default="obj">
          <el-button
            plain
            size="small"
            icon="el-icon-delete"
            @click="delCurrentProject(obj.row)"
            type="danger"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:10px"
      background
      :current-page="page"
      @size-change="handleSizeChange"
      :page-sizes="[30, 50, 80]"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />
    <!-- 历史记录 -->
    <el-dialog title="详情" :visible.sync="detailVisible" width="40%">
      <table class="selfTable" border="1">
        <tr class="tr">
          <td>
            <b>软件名称</b>
          </td>
          <td>{{detailForm.software.name}}</td>
        </tr>
        <tr>
          <td>
            <b>版本号</b>
          </td>
          <td>{{detailForm.software.version}}</td>
        </tr>
        <tr>
          <td>
            <b>上传时间</b>
          </td>
          <td>{{detailForm.software.uploadTime}}</td>
        </tr>
        <tr>
          <td>
            <b>上传人</b>
          </td>
          <td>{{detailForm.software.user.name}}</td>
        </tr>
        <tr>
          <td>
            <b>下载次数</b>
          </td>
          <td>{{detailForm.software.downloadSize}}</td>
        </tr>
        <tr>
          <td>
            <b>项目名称</b>
          </td>
          <td>{{detailForm.software.swProject.projectName}}</td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailVisible = false">取 消</el-button>
        <el-button type="primary" @click="detailVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 历史记录 -->
    <el-dialog title="详情" :visible.sync="detailCustomerVisible" width="40%">
      <table class="selfTable" border="1">
        <tr class="tr">
          <td>
            <b>客户名称</b>
          </td>
          <td>{{CustomerdetailForm.customerName}}</td>
        </tr>
        <tr>
          <td>
            <b>地址</b>
          </td>
          <td>{{CustomerdetailForm.customerAddress}}</td>
        </tr>
        <tr>
          <td>
            <b>邮箱</b>
          </td>
          <td>{{CustomerdetailForm.customerEmail}}</td>
        </tr>
        <tr>
          <td>
            <b>使用人</b>
          </td>
          <td>{{CustomerdetailForm.useName}}</td>
        </tr>
        <tr>
          <td>
            <b>使用部门</b>
          </td>
          <td>{{CustomerdetailForm.useDepartment}}</td>
        </tr>
        <tr>
          <td>
            <b>设备信息</b>
          </td>
          <td>{{CustomerdetailForm.deviceInfo}}</td>
        </tr>
        <tr>
          <td>
            <b>固件信息</b>
          </td>
          <td>{{CustomerdetailForm.firmwareInfo}}</td>
        </tr>
        <tr>
          <td>
            <b>描述</b>
          </td>
          <td>{{CustomerdetailForm.comment}}</td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailCustomerVisible = false">取 消</el-button>
        <el-button type="primary" @click="detailCustomerVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      endTime: '',
      startTime: '',
      pagenum: '',
      total: 0,
      page: 1,
      pageSize: 50,
      customerName: '',
      software: { name: null },
      detailCustomerVisible: false,
      detailVisible: false,
      detailForm: { comment: '', software: { name: '', version: '', uploadTime: '', user: { name: '' }, swProject: { projectName: '' }, downloadSize: '' } },
      CustomerdetailForm: {
        customerName: '',
        customerAddress: '',
        customerEmail: '',
        useName: '',
        useDepartment: '',
        deviceInfo: '',
        firmwareInfo: '',
        comment: ''
      },

      timeValue: '',
      historyList: []
    }
  },
  created () {
    this.getrecordList()
  },
  //
  methods: {
    async delCurrentProject (row) {
      try {
        await this.$confirm('亲, 你确认要删除么?', '温馨提示', {
          type: 'warning'
        })
        const res = await this.$http.recorddelete({ id: row.id })
        if (res.code == 0) {
          this.$message.success('删除成功')
          this.getrecordList()
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        console.log(e)
      }
    },
    clearable () {
      console.log(2)
    },
    async getrecordList () {
      const data = await this.$http.recordList({ page: this.page, pageSize: this.pageSize, customerName: this.customerName, startTime: this.startTime, endTime: this.endTime, name: this.software.name })
      console.log(data.result)
      this.total = data.result.length
      this.historyList = data.result
    },
    passDetail (row) {
      this.detailForm = row
      this.detailVisible = true
    },
    passCustomerDetail (row) {
      this.CustomerdetailForm = row
      this.detailCustomerVisible = true
    },
    searchTime (value) {
      if (value == null) {
        this.endTime = ''
        this.startTime = ''
        this.getrecordList()
        return
      }

      console.log(value)
      this.startTime = value[0]
      this.endTime = value[1]
      this.getrecordList()
    },
    searchCst (value) {
      console.log(this.customerName)
      this.getrecordList()
    },
    searchSfn () {
      console.log(this.software.name)
      this.getrecordList()
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      this.pagesize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.pagenum = 1
      // 重新渲染
      this.getrecordList()
    },
    handleCurrentChange (val) {
      // 更新当前页
      this.pagenum = val
      // 重新渲染
      this.getrecordList()
    }
  }
}
</script>
<style style lang='scss'>
.selfTable {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 10px;
  tr {
    height: 30px;
    td,
    th {
      border: 1px solid #000;
    }
    th {
      background-color: #000;
      color: white;
    }
    td {
      width: 25%;
      text-align: center;
    }
  }
}
</style>
