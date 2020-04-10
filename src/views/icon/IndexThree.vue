<template>
  <div class="addArticle">
    <el-form :model="Editform" label-width="80px">
      <el-form-item label="登录描述">
        <el-input style="width:30%" v-model="Editform.loginDescribe" placeholder="请输入信息名字"></el-input>
      </el-form-item>
      <el-form-item label="当前图片">
        <!-- <img style="width:50px" :src="'http://47.98.145.222:8080/'+scope.row.homeImgPath" alt> -->
        <img
          :src="'http://47.98.145.222:8080/'+Editform.loginImgPath"
          style="height:50px;vertical-align: middle"
          alt
        >
      </el-form-item>
      <el-form-item label="更改图片" enctype="multipart/form-data" method="post">
        <el-upload
          class="avatar-uploader"
          action="http://47.98.145.222:8080/hbte-dingding/home/uploadFile/homeLogin"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <hr style="margin-bottom:20px;">
      <el-form-item label="主页描述">
        <el-input style="width:30%" v-model="Editform.homeDescribe" placeholder="请输入信息名字"></el-input>
      </el-form-item>
      <el-form-item label="当前图片">
        <!-- <img style="width:50px" :src="'http://47.98.145.222:8080/'+scope.row.homeImgPath" alt> -->
        <img
          :src="'http://47.98.145.222:8080/'+Editform.homeImgPath"
          style="height:50px;vertical-align: middle"
          alt
        >
      </el-form-item>
      <el-form-item label="更改图片" enctype="multipart/form-data" method="post">
        <el-upload
          class="avatar-uploader"
          action="http://47.98.145.222:8080/hbte-dingding/home/uploadFile/homeIndex"
          :show-file-list="false"
          :on-success="handleAvatarSuccessl"
          :before-upload="beforeAvatarUploadl"
        >
          <img v-if="imageUrll" :src="imageUrll" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-button type="success" @click="sureedit" class="surechange">确认修改</el-button>
    </el-form>
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
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      AdddialogVisible: false,
      EditdialogVisible: false,
      GetpowerdialogVisible: false,
      // 当前页数
      currentPage4: 4,
      value: true,
      // 添加表数据
      Addform: {
        // roleDescribe: '',
        // homeInfoId: '',
        loginDescribe: '',
        homeDescribe: '',
        homeImgPath: '',
        loginImgPath: ''
        // filePath: ''
        // jueStatus: false
      },
      // 编辑表数据
      Editform: {
        loginDescribe: '',
        homeDescribe: '',
        homeInfoId: '',
        // filePath: ''
        loginImgPath: '',
        homeImgPath: ''
      },
      tableData: []
    }
  },
  created () {
    this.getJueseList()
  },
  methods: {
    async changeState (row) {
      console.log(row.isDisable)
      if (row.isDisable == 2) {
        const { data } = await this.$axios.post('hbte-dingding/home/update', {
          isDisable: row.isDisable,
          homeInfoId: row.homeInfoId
        })
        console.log(data)
        this.$message.info('停用后,将没有此模块')
        this.getJueseList()
      } else {
        const { data } = await this.$axios.post('hbte-dingding/home/update', {
          isDisable: row.isDisable,
          homeInfoId: row.homeInfoId
        })
        console.log(data)
        this.getJueseList()
      }
    },
    async getJueseList () {
      const { data } = await this.$axios('hbte-dingding/home/list', {
        params: { page: this.page, pageSize: this.pageSize }
      })
      console.log(data.result.homeInfos)
      this.tableData = data.result.homeInfos
      this.Editform.homeInfoId = data.result.homeInfos[0].homeInfoId
      this.total = data.count
      this.Editform.loginDescribe = data.result.homeInfos[0].loginDescribe
      this.Editform.homeDescribe = data.result.homeInfos[0].homeDescribe
      this.Editform.homeImgPath = data.result.homeInfos[0].homeImgPath
      this.Editform.loginImgPath = data.result.homeInfos[0].loginImgPath
    },
    // 添加用户按钮
    AddUser () {
      this.AdddialogVisible = true
    },
    async sureadd () {
      const { data } = await this.$axios.post(
        'hbte-dingding/home/add',
        this.Addform
      )
      console.log(data)
      if (data.code == 0) {
        this.$message.success('添加成功')
      } else {
        this.$message.error('添加失败')
      }
      this.getJueseList()
      this.AdddialogVisible = false
    },
    // 编辑按键
    async editthis (obj) {
      this.EditdialogVisible = true
      console.log(obj.row.homeInfoId)
      const { data } = await this.$axios.get('hbte-dingding/home/getHomeInfo', {
        params: { homeInfoId: obj.row.homeInfoId }
      })
      console.log(data.result.homeInfo)

      this.Editform.loginDescribe = data.result.homeInfos[0].loginDescribe
      this.Editform.homeDescribe = data.result.homeInfos[0].homeDescribe
      this.Editform.homeInfoId = data.result.homeInfos[0].homeInfoId
      this.Editform.homeImgPath = data.result.homeInfos[0].homeImgPath
    },
    async sureedit () {
      const { data } = await this.$axios.post(
        'hbte-dingding/home/update',
        this.Editform
      )
      if (data.code == 0) {
        this.$message.success('修改成功')
      } else {
        this.$message.error('修改失败')
      }
      this.getJueseList()
      this.EditdialogVisible = false
    },
    // 删除
    async delrole (obj) {
      try {
        await this.$confirm('亲, 你确认要删除么?', '温馨提示', {
          type: 'warning'
        })
        let id = obj.row.homeInfoId
        const { data } = await this.$axios.post('hbte-dingding/home/delete', {
          homeInfoId: id
        })
        if (data.code == 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      } catch (e) {
        console.log(e)
      }

      this.getJueseList()
    },
    // 授权按钮
    getpower () {
      this.GetpowerdialogVisible = true
    },
    // 只要每页条数变化了, 触发
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      this.pagesize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.pagenum = 1
      // 重新渲染
      this.getJueseList()
    },
    // 只要当前页变化时, 触发函数
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 更新当前页
      this.pagenum = val
      // 重新渲染
      this.getJueseList()
    },
    handleAvatarSuccess (res, file) {
      const aa = res
      console.log(aa.result.filePath)

      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(this.imageUrl)
      console.log(file)
      // this.Addform.homeImgPath = aa.result.homeImgPath
      this.Editform.loginImgPath = aa.result.loginImgPath
    },
    beforeAvatarUpload (file) {
      // this.Addform.file = ''
      this.Editform.file = ''
      this.imageUrl = ''
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/bmp'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG/BMP 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccessl (res, file) {
      const aa = res
      console.log(aa.result.filePath)

      this.imageUrll = URL.createObjectURL(file.raw)
      console.log(this.imageUrll)
      console.log(file)
      // this.Addform.homeImgPath = aa.result.homeImgPath
      this.Editform.homeImgPath = aa.result.homeImgPath
    },
    beforeAvatarUploadl (file) {
      this.Addform.file = ''
      this.Editform.file = ''
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
