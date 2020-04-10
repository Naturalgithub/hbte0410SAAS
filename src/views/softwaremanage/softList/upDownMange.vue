<template>
  <div class="upDownManage">
    <el-form :inline="true" style="margin-top:10px">
      <el-row>
        <el-col :span="6" style="margin-bottom:20px">
          <el-button class="upBtn" type="success" @click="updialogVisible = true">上传</el-button>
          <!-- <el-button class="upBtn" type="success" @click="test">下载测试</el-button> -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label=" 发布时间:">
            <el-date-picker
              v-model="timeValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM"
              @change="searchTime"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="上传类型">
            <el-select
              v-model="checkTypeValue"
              placeholder="请选择"
              style="width:100%"
              @change="upLoadType"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="上传人员">
            <el-input v-model="passName" :lg="12" @keyup.native="searchPassName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="名称">
            <el-input v-model="PJName" :lg="12" @keyup.native="searchPJName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="upDownManagementList" border size="mini">
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="user.fileType" label="软件类型" width="50">
        <template v-slot:default="{row}">
          <span v-if="row.fileType==2">文档</span>
          <span v-else>软件</span>
        </template>
      </el-table-column>
      <el-table-column prop="user.name" label="上传人员"></el-table-column>

      <el-table-column prop="name" label="名称">
        <template v-slot:default="{row}">
          <el-link type="primary" @click="showDetaildialogVisible(row)">{{row.name}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="uploadTime" label="发布时间" />
      <!-- <el-table-column prop="swProject.comment" label="项目描述" /> -->
      <el-table-column prop="comment" label="描述" />
      <el-table-column prop="downloadSize" label="下载次数" width="100" />
      <el-table-column label="操作">
        <!-- row这个参数, 是element ui内部, 定义slot时, 传递过来的 -->
        <template v-slot:default="{row}">
          <el-button
            plain
            size="small"
            @click="showDownDialog(row)"
            type="primary"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            plain
            size="small"
            type="primary"
            icon="el-icon-download"
            @click="downloadFiles(row)"
          ></el-button>
          <el-button
            plain
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="delCurrentProject(row)"
          />
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
    <!-- 上传 -->
    <el-dialog title="上传" :visible.sync="updialogVisible" width="40%">
      <el-form ref="uploadForm" :model="upForm" label-width="100px">
        <el-form-item label="上传类型">
          <el-select v-model="typeValue" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in upTypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="this.typeValue==1?'软件名称':'文档名称'">
          <el-input v-model="upForm.name" />
        </el-form-item>
        <el-form-item :label="this.typeValue==1?'软件版本':'文档版本'">
          <el-input v-model="upForm.version" />
        </el-form-item>
        <el-form-item label="项目信息">
          <div class="block">
            <el-select filterable v-model="upForm.projectId" style="width:100%" placeholder="可搜索">
              <el-option
                v-for="item in projectList"
                :key="item.id"
                :label="item.projectName"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="产品线">
          <!-- 级联选择器 -->
          <div class="block">
            <el-cascader
              style="width:100%"
              :options="data"
              :props="props"
              @change="handleAdd"
              v-model="paroductLineArr"
            ></el-cascader>
          </div>
        </el-form-item>
        <el-form-item :label="this.typeValue==1?'软件描述':'文档描述'">
          <el-input v-model="upForm.comment" />
        </el-form-item>
        <el-form-item label="上传人员">
          <el-input v-model="loginName" disabled>{{loginName}}</el-input>
        </el-form-item>
        <el-form-item label="选择标签">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >{{tag}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          <el-checkbox-group v-model="upForm.tagIds">
            <el-checkbox v-for="item in tagList" :key="item.id" :label="item.id">{{item.tagName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="上传文件">
          <input type="file" ref="fileInput" @change="getFile" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="updialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upSure">上传</el-button>
      </span>
    </el-dialog>

    <!-- ========================================================= -->
    <!-- 编辑 -->
    <el-dialog title="修改" :visible.sync="downdialogVisible" width="40%">
      <el-form ref="editForm" :model="passRow" label-width="100px">
        <el-form-item label="软件名称">
          <el-input v-model="passRow.name" />
        </el-form-item>
        <el-form-item label="软件版本">
          <el-input v-model="passRow.version" />
        </el-form-item>
        <el-form-item label="软件描述">
          <el-input v-model="passRow.comment" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="downdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="downSure">修 改</el-button>
      </span>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog title="详情" :visible.sync="detaildialogVisible" width="40%">
      <projectTable :porjectList="currentobj"></projectTable>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detaildialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="detailSure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 下载 -->
    <el-dialog title="下载" :visible.sync="downdialogVisible" width="40%">
      <el-form ref="downForm" :model="downForm" :rules="rules" label-width="100px">
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model="downForm.customerName" />
        </el-form-item>
        <el-form-item label="使用人" prop="useName">
          <el-input v-model="downForm.useName" />
        </el-form-item>
        <el-form-item label="使用部门" prop="useDepartment">
          <el-input v-model="downForm.useDepartment" />
        </el-form-item>
        <el-form-item label="客户地址" prop="customerAddress">
          <el-input v-model="downForm.customerAddress" />
        </el-form-item>
        <el-form-item label="客户邮箱" prop="customerEmail">
          <el-input v-model="downForm.customerEmail" />
        </el-form-item>
        <!-- <el-form-item label="联系方式">
          <el-input v-model="downForm.phoneType" />
        </el-form-item>-->
        <el-form-item label="设备信息">
          <el-input v-model="downForm.deviceInfo" />
        </el-form-item>
        <el-form-item label="固件信息" prop>
          <el-input v-model="downForm.firmwareInfo" />
        </el-form-item>
        <el-form-item label="备注" prop>
          <el-input v-model="downForm.comment" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="downdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="downloadProduct">下 载</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import projectTable from './projectTable'
import $ from 'jquery'
export default {
  components: {
    projectTable
  },
  data () {
    return {
      rules: {
        customerName: [
          { required: true, message: '请输入客户名称', trigger: ['blur', 'change'] }
        ],
        useName: [
          { required: true, message: '请输入使用人', trigger: ['blur', 'change'] }
        ],
        useDepartment: [
          { required: true, message: '请输入使用部门', trigger: ['blur', 'change'] }
        ],
        customerAddress: [
          { required: true, message: '请输入客户地址', trigger: ['blur', 'change'] }
        ],
        customerEmail: [
          { required: true, message: '请输入客户邮箱', trigger: ['blur', 'change'] }
        ]
      },
      uploadAddress: '',
      downdialogVisible: false,
      downForm: {
        user: { id: '' },
        software: { id: '' },
        customerName: '',
        useName: '',
        useDepartment: '',
        customerAddress: '',
        customerEmail: '',
        deviceInfo: '',
        firmwareInfo: '',
        comment: ''
      },
      paroductLineArr: [],
      checkTypeValue: '',
      typeValue: 1,
      typeOptions: [
        { value: 2, label: '文档' }, { value: 1, label: '软件' }, { value: '', label: '全部' }
      ],
      upTypeOption: [
        { value: 2, label: '文档' }, { value: 1, label: '软件' }
      ],
      currentobj: {},
      tagList: [],
      checkList: [],
      passRow: {
        name: '',
        version: '',
        comment: '',
        swProject: { comment: '' }
      },
      startTime: '',
      endTime: '',
      data: [],
      projectList: [],
      passName: '',
      PJName: '',
      pagenum: '',
      total: 0,
      page: 1,
      pageSize: 50,
      loginName: '',
      files: '',
      passfrom: '',
      detaildialogVisible: false,
      updialogVisible: false,
      upDownManagementList: [{ peoplename: '1', bookname: '156161', booknum: '1165112', time: '1', description: '1', projectId: '' }],

      detailForm: {
        downTime: 3
      },
      upForm: { version: '', name: '', projectId: '', productIds: '', comment: '', uploadId: '', tagIds: [], tags: [], file: '', tagNames: [], softwareId: '', fileType: '' },
      updateForm: { version: '', name: '', projectId: '', productIds: '', comment: '', uploadId: '', tagIds: [], tags: [], file: '', tagNames: [] },
      // 标签
      projectId: '',
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      cpxxxoptions: [],
      value1: '',
      timeValue: '',
      props: {
        emitPath: false,
        value: 'id',
        multiple: true,
        children: 'children',
        label: 'productName'
      }
    }
  },
  created () {
    this.loginName = JSON.parse(localStorage.getItem('data')).userName
    this.upForm.uploadId = JSON.parse(localStorage.getItem('data')).id
    this.getTagList()
    this.getSoftwareList()
    this.getProjectList()
    this.getproductList()
  },
  methods: {
    downloadProduct () {
      let type = 2
      if (
        type == 2
      ) {
        this.$refs['downForm'].validate((valid) => {
          if (valid) {
            console.log('submit!!')
            this.UpdateRecordadd()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    async  UpdateRecordadd (v) {
      const res = await this.$http.recordadd(this.downForm)
      if (res.code == 0) {
        this.$message.success('保存成功,准备下载')
        this.downdialogVisible = false
        console.log(res)
        let baseurl = this.$store.state.baseurl
        window.location.href = baseurl + this.uploadAddress
        this.getSoftwareList()
      } else {
        this.$message.error(res.message)
      }
    },
    async downloadFiles (row) {
      this.uploadAddress = row.uploadAddress
      this.downForm.software.id = row.id
      console.log(row.fileType)
      if (row.fileType == 2) {
        let baseurl = this.$store.state.baseurl
        const data = await this.$http.recordadd({ user: { id: this.downForm.user.id }, software: { id: row.id } })
        if (data.code == 0) {
          this.$message.success('正在下载...')
          window.location.href = baseurl + this.uploadAddress
          // window.location.href = baseurl + this.uploadAddress
          // window.open(window.location.href = baseurl + this.uploadAddress)
        } else {
          this.$message.error(data.message)
        }
      } else {
        this.downdialogVisible = true
      }
      // window.location.href = this.$store.state.baseurl + row.uploadAddress
    },
    upLoadType () {
      this.getSoftwareList()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    detailSure () {
      this.detaildialogVisible = false
    },
    showDetaildialogVisible (r) {
      console.log(r)

      this.currentobj = r
      this.detaildialogVisible = true
    },
    showDownDialog (row) {
      this.downdialogVisible = true
      // alert('xiazai')
      console.log(22)

      console.log(row)

      this.passRow = row
    },
    async downSure () {
      this.downdialogVisible = false
      console.log(this.passRow)
      // passRow 修改数据
      const res = await this.$http.softwareupdate(this.passRow)
      console.log(res)
      if (res.code == 0) {
        this.$message.success('修改成功')
        this.getSoftwareList()
      } else {
        this.$message.error(res.message)
      }
    },
    getFile (event) {
      console.log(event)
      this.files = event.target.files[0]
    },
    async upSure () {
      this.updialogVisible = false
      let fileType = this.typeValue
      let passfrom = new FormData()
      passfrom.append('file', this.files)
      passfrom.append('version', this.upForm.version)
      passfrom.append('name', this.upForm.name)
      passfrom.append('projectId', this.upForm.projectId)
      passfrom.append('productIds', this.upForm.productIds)
      passfrom.append('comment', this.upForm.comment)
      passfrom.append('uploadId', this.upForm.uploadId)
      passfrom.append('tagIds', this.upForm.tagIds)
      passfrom.append('tagNames', this.upForm.tagNames)
      passfrom.append('fileType', fileType)

      const res = await this.$http.softwareAdd(passfrom)
      // let res = { code: 0 }
      console.log(res)
      if (res.code == 0) {
        this.$message.success('上传成功')
        this.getSoftwareList()
        this.upForm.name = ''
        this.upForm.version = ''
        this.upForm.comment = ''
        this.dynamicTags = []
        this.upForm.tagIds = []
        this.upForm.productIds = []
        this.paroductLineArr = []
      } else {
        this.$message.error(res.message)
      }
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      this.upForm.tagNames = this.dynamicTags
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
      this.upForm.tagNames = this.dynamicTags
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
      this.upForm.tagNames = this.dynamicTags
    },
    async getProjectList () {
      const res = await this.$http.getProjectList()
      console.log(res.result)
      this.projectList = res.result
    },
    async getSoftwareList () {
      const res = await this.$http.getSoftwareList({ id: '', page: this.page, pageSize: this.pageSize, startTime: this.startTime, endTime: this.endTime, uploadName: this.passName, name: this.PJName, fileType: this.checkTypeValue })
      console.log(res)
      this.total = res.result.length
      this.upDownManagementList = res.result
    },
    searchPJName () {
      this.getSoftwareList()
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      this.pagesize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.pagenum = 1
      // 重新渲染
      this.getSoftwareList()
    },
    handleCurrentChange (val) {
      // 更新当前页
      this.pagenum = val
      // 重新渲染
      this.getSoftwareList()
    },
    test () {
      window.location.href = 'http://47.98.145.222:8080/test/lolbox.zip'
    },
    searchTime (v) {
      if (v == null) {
        this.startTime = ''
        this.endTime = ''
        this.getSoftwareList()
        return
      }
      this.startTime = v[0]
      this.endTime = v[1]
      this.getSoftwareList()
    },
    searchPassName () {
      this.getSoftwareList()
    },
    async getproductList () {
      const res = await this.$http.getproductList()
      console.log(res.result)
      this.data = this.$hbteApi.getTreeData(res.result)
    },
    handleAdd (v) {
      if (v == null) {
        this.upForm.productIds = ''
        return
      }
      console.log(v)
      this.upForm.productIds = v
    },
    async getTagList () {
      const res = await this.$http.tagList()
      console.log(res.result)
      this.tagList = res.result
    },
    tagNamechange (v) {
      console.log(v)
    },
    async delCurrentProject (row) {
      console.log(row.id)
      try {
        await this.$confirm('亲, 你确认要删除么?', '温馨提示', {
          type: 'warning'
        })
        const res = await this.$http.softwaredelete({ id: row.id })
        if (res.code == 0) {
          this.$message.success('删除成功')
          this.getSoftwareList()
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        console.log(e)
      }
    }
    // upLoadType () {
    //   this.getSoftwareList()
    // }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
