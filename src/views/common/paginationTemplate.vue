<template>
  <el-pagination style="margin-top:10px"
                 background
                 :current-page="page"
                 @size-change="handleSizeChange"
                 :page-sizes="[30,50,80]"
                 @current-change="handleCurrentChange"
                 :page-size="pageSize"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="total" />
</template>

<script>
export default {
  props: ['page', 'pageSize', 'total'],
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.page = 1
      this.emit('sizeChanged', this.page, this.pageSize)
    },
    handleCurrentChange (val) {
      this.page = val
      this.emit('sizeChanged', this.page, this.pageSize)
    }
  }
}
</script>
