<template>
  <div class="data-table">
    <el-table :data="tableData" style="width: 100%" border stripe>
      <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
      <template v-for="(col, index) in columns">
        <!-- 操作列/自定义列 -->
        <slot v-if="col.slot" :name="col.slot"></slot>
        <!-- 普通列 -->
        <el-table-column
          v-else
          :key="index"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :formatter="col.formatter"
          align="center"
        ></el-table-column>
      </template>
      <!-- <el-table-column label="操作" v-if="lastCol.ifshow" align="center">
        <template slot-scope="scope">
          <el-button
            size="small"
            plain
            v-for="(item,index) in lastCol.operates"
            :type="item.type"
            :icon="item.icon"
            @click="item.clickFunc(scope.$index,scope.row)"
            :key="index"
          >
          </el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <!-- <el-table-column slot="operate" label="操作" align="center" fixed="right" width="300">
        <template slot-scope="obj">

          <el-button plain size="small" type="primary" icon="el-icon-edit" />

          <el-button plain size="small" type="danger" icon="el-icon-delete" />
        </template>
    </el-table-column>-->
    <!-- 是否调用分页 -->
    <!-- <el-pagination
      style="margin-top:10px"
      v-if="pageObj"
      background
      layout="total, prev, pager, next, jumper"
      :page-size="pageObj.pageSize"
      :total="pageObj.total"

      :current-page="pageObj.pageSize"
      @current-change="pageObj.func"
    ></el-pagination>-->
    <el-pagination
      style="margin-top:10px"
      background
      v-if="pageObj"
      @size-change="pageObj.handleSizeChange"
      @current-change="pageObj.handleCurrentChange"
      :current-page="pageObj.page"
      :page-sizes="[30,50,80]"
      :page-size="pageObj.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageObj.total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'vtable',
  // props: ['tableData', 'columns', 'pageObj', 'lastCol']
  props: {
    lastCol: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: false
    },
    pageObj: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: false
    },
    columns: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: false
    },
    tableData: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: false
    }
  }
}

// 实例
// <el-table-column slot="operate" label="操作" align="center" fixed="right" width="300">
//         <template slot-scope="obj">
//           <el-button size="small" type="warning" icon="el-icon-edit" @click="bianji(obj)">编辑</el-button>
//           <el-button size="small" type="primary" icon="el-icon-success">启用</el-button>
//         </template>
//       </el-table-column>

// tableData: [
//   ],
//   columns: [
//     { label: '名称', prop: 'bankName' },
//     { label: '地址', prop: 'bankAddressum' },
//     // { label: '主场', prop: 'place' },
//     { slot: 'operate' }], // 操作列
//   pageObj: {
//     pageSize: 30,
//     total: 0,
//     page: 1,
//     handleSizeChange: (v) => {
//       console.log(v)
//       this.pageObj.pageSize = v
//       this.pageObj.page = 1
//       this.getList()
//     },
//     handleCurrentChange: (v) => {
//       console.log(v)
//       this.pageObj.page = v
//       this.getList()
//     }
//   },
</script>
<style lang="scss" >
</style>
