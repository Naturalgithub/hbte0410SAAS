<template>
  <div class="icon">
    <!-- 添加图片按钮 -->
    <el-button type="success" class="four-btn" style="margin-bottom:10px;" @click="addapp">添加应用</el-button>
    <!-- 图片表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column label="应用图片">
        <template slot-scope="scope">
          <img
            style="width:50px;height:50px"
            :src="'http://47.98.145.222:8080/'+scope.row.appImgPath"
            alt
          >
        </template>
      </el-table-column>
      <el-table-column prop="appName" label="应用名称"></el-table-column>
      <el-table-column prop="appUrl" label="应用URL"></el-table-column>
      <el-table-column prop="appDescribe" label="应用描述"></el-table-column>
      <el-table-column label="停用/启用">
        <template slot-scope="scope">
          <!-- {{scope.row.isDisable}} -->
          <el-switch
            @change="changeState(scope.row)"
            v-model="scope.row.isDisable"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-link
            type="primary"
            style="mragin-left:10px;margin-right:10"
            @click="edit(scope.row)"
          >编辑</el-link>&nbsp;&nbsp;|&nbsp;
          <el-link
            type="danger"
            @click="delapp(scope.row)"
            style="mragin-left:10px;margin-right:10"
          >删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!--
      @size-change: 每页条数变化时, 触发
      @current-change: 当前页变化时, 触发
      :current-page 当前页
      :page-sizes 可供选择每页条数的选择项
      :page-size 每页条数
      layout 显示的功能控件
    -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[2,30, 50, 80]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加模态框 -->
    <el-dialog title="提示" :visible.sync="AdddialogVisible" width="30%">
      <el-form :model="addform" label-width="80px">
        <el-form-item label="应用模块">
          <el-select multiple v-model="addform.ids" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.sysModuleId"
              :label="item.moduleName"
              :value="item.sysModuleId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用名称">
          <el-input v-model="addform.appName" placeholder="请输入应用名称"></el-input>
        </el-form-item>
        <el-form-item label="应用URL">
          <el-input v-model="addform.appUrl" placeholder="请输入应用URL"></el-input>
        </el-form-item>
        <el-form-item label="应用描述">
          <el-input v-model="addform.appDescribe" placeholder="请输入应用描述"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" enctype="multipart/form-data" method="post">
          <!-- action="http://47.98.145.222:8080/hbte-dingding/app/uploadFile" -->
          <el-upload
            ref="uploadImg"
            class="avatar-uploader"
            action="http://47.98.145.222:8080/hbte-dingding/app/uploadFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AdddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑模态框 -->
    <el-dialog title="提示" :visible.sync="editdialogVisible" width="30%">
      <el-form :model="editform" label-width="80px">
        <el-form-item label="应用模块">
          <el-select multiple v-model="editform.ids" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.sysModuleId"
              :label="item.moduleName"
              :value="item.sysModuleId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用名称">
          <el-input v-model="editform.appName" placeholder="请输入模块名字"></el-input>
        </el-form-item>
        <el-form-item label="应用URL">
          <el-input v-model="editform.appUrl" placeholder="请输入模块名字"></el-input>
        </el-form-item>
        <el-form-item label="应用描述">
          <el-input v-model="editform.appDescribe" placeholder="请输入模块名字"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" enctype="multipart/form-data" method="post">
          <!-- action="http://47.98.145.222:8080/hbte-dingding/app/uploadFile" -->
          <el-upload
            class="avatar-uploader"
            action="http://47.98.145.222:8080/hbte-dingding/app/uploadFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrll" :src="imageUrll" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureedit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imageUrl: '',
      imageUrll: '',
      // value: '',
      // 总条数
      total: 0,
      // 当前页
      page: 1,
      // 每页条数
      pageSize: 50,
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      AdddialogVisible: false,
      editdialogVisible: false,
      tableData: [
        {
          date: '2016-05-02',
          imgname: '财务系统',
          imgaddress: 'www....img',
          imgintroduce: '这是财务系统图片,不超过十个字'
        }
      ],
      addform: {
        appDescribe: '',
        appImgPath: '',
        appName: '',
        ids: '',
        appUrl: ''
      },
      editform: {
        appDescribe: '',
        appImgPath: '',
        appName: '',
        appInfoId: '',
        ids: '',
        appUrl: ''
      },
      value: ''
    }
  },
  created () {
    this.getList()
    this.getoption()
  },
  methods: {
    async changeState (row) {
      console.log(row.isDisable)
      console.log(row.appInfoId)

      if (row.isDisable == 2) {
        const { data } = await this.$axios.post('hbte-dingding/app/update', {
          isDisable: row.isDisable,
          appInfoId: row.appInfoId
        })
        console.log(data)
        this.$message.info('停用后,首页将没有此模块')
        this.getJueseList()
      } else {
        const { data } = await this.$axios.post('hbte-dingding/app/update', {
          isDisable: row.isDisable,
          appInfoId: row.appInfoId
        })
        console.log(data)
        this.getList()
      }
    },
    async getoption () {
      const { data } = await this.$axios('hbte-dingding/sys/list')
      console.log(data)
      this.options = data.result.sysModules
    },
    async delapp (obj) {
      try {
        await this.$confirm('亲, 你确认要删除么?', '温馨提示', {
          type: 'warning'
        })
        let id = obj.appInfoId
        const { data } = await this.$axios.post('hbte-dingding/app/delete', {
          appInfoId: id
        })
        if (data.code == 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          this.$message(data.message)
        }
      } catch (e) {
        console.log(e)
      }

      this.getList()
    },
    edit (obj) {
      console.log(obj)
      this.imageUrll = ''
      this.editform.appInfoId = obj.appInfoId
      this.editform.appDescribe = obj.appDescribe
      this.editform.appImgPath = obj.appImgPath
      this.editform.appName = obj.appName
      this.editform.appUrl = obj.appUrl
      this.editform.ids = obj.ids

      this.editdialogVisible = true
    },
    async sureedit () {
      // this.editdialogVisible = false
      const { data } = await this.$axios.post(
        'hbte-dingding/app/update',
        this.editform
      )
      console.log(data)
      this.editdialogVisible = false
      if (data.code == 0) {
        this.$message.success('修改成功')
      } else {
        this.$message.error(data.message)
      }
      this.getList()
    },
    addapp () {
      this.AdddialogVisible = true
    },
    async sureAdd () {
      const { data } = await this.$axios.post(
        'hbte-dingding/app/add',
        this.addform
      )
      if (data.code == 0) {
        this.$refs.uploadImg.clearFiles()
        this.$message.success('添加成功')
        this.addform.appInfoId = ''
        this.addform.appDescribe = ''
        this.addform.appImgPath = ''
        this.addform.appName = ''
        this.addform.ids = ''
        this.$router.push('/icon')
      } else {
        this.$message.error(data.message)
        console.log(data.message)
      }
      this.$refs['uploadImg'].clearFiles()
      this.AdddialogVisible = false
      this.getList()
    },
    async getList () {
      const { data } = await this.$axios('hbte-dingding/app/list', {
        params: {
          page: this.page,
          pageSize: this.pageSize
        }
      })
      // this.$refs.upload.clearFiles()
      console.log(data.result)
      this.tableData = data.result.appInfos
      this.total = data.count
    },
    // 只要每页条数变化了, 触发
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      this.pageSize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.page = 1
      // 重新渲染
      this.getList()
    },
    // 只要当前页变化时, 触发函数
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 更新当前页
      this.page = val
      // 重新渲染
      this.getList()
    },
    handleAvatarSuccess (res, file) {
      const aa = res
      console.log(aa.result.filePath)

      this.imageUrl = URL.createObjectURL(file.raw)
      this.imageUrll = URL.createObjectURL(file.raw)
      console.log(this.imageUrl)
      console.log(file)
      this.addform.appImgPath = aa.result.appImgPath
      this.editform.appImgPath = aa.result.appImgPath
      // this.Editform.homeImgPath = aa.result.homeImgPath
      // this.$refs.uploadImg.clearFiles()
    },
    beforeAvatarUpload (file) {
      this.imageUrl = ''
      this.imageUrll = ''
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/bmp'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG/BMP 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang='scss' scoped>
.surechange {
  margin-left: 80px;
}
.four-btn {
  margin-bottom: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border: 1px solid #ccc;
}
.avatar {
  border: 1px solid #ccc;
  width: 60px;
  height: 60px;
  display: block;
}
</style>
