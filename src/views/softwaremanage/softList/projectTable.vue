<template>
  <div>
    <table class="selfTable" border="1">
      <tr class="tr">
        <td>
          <b>版本号</b>
        </td>
        <td colspan="3">{{porjectList.version}}</td>
      </tr>
      <tr>
        <td>
          <b>名称</b>
        </td>
        <td colspan="3">{{porjectList.name}}</td>
      </tr>

      <!-- <tr>
        <td>
          <b>项目描述</b>
        </td>
        <td colspan="3">{{porjectList.swProject.comment}}</td>
      </tr>-->
      <tr>
        <td>
          <b>软件描述</b>
        </td>
        <td colspan="3">{{porjectList.comment}}</td>
      </tr>
      <tr>
        <td>
          <b>所选标签</b>
        </td>
        <td colspan="3">
          <span v-for="item in porjectList.swTags" :key="item.id">
            <el-tag style="margin:5px 5px" size="mini">{{item.tagName}}</el-tag>
          </span>
        </td>
      </tr>
      <tr>
        <td>
          <b>项目信息</b>
        </td>
        <td>{{porjectList.swProject.projectName}}</td>
        <td>
          <b>上传人员</b>
        </td>
        <td>{{porjectList.user.name}}</td>
      </tr>
      <tr>
        <td>
          <b>下载次数</b>
        </td>
        <td>{{porjectList.downloadSize}}</td>
        <td>
          <b>发布时间</b>
        </td>
        <td>{{porjectList.uploadTime}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'porjectTable',
  props: ['porjectList']
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
