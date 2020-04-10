<template>
  <div class="hbtePagination">
    <!-- 分页 -->
    <el-pagination
      style="margin-top:10px"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="data.page"
      :page-sizes="[30,50,80]"
      :page-size="data.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'hbtePagination',
  props: {
    total: {
      required: true
    }
  },
  data () {
    return {
      // 当前页
      data: {
        page: 1,
        // 每页条数
        pageSize: 50
      }

    }
  },
  methods: {
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      this.data.pageSize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.data.page = 1
      // 重新渲染
      this.$emit('refreshList', 'data')
    },
    // 只要当前页变化时, 触发函数
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 更新当前页
      this.data.page = val
      // 重新渲染
      this.$emit('refreshList', 'data')
    }
    // 传过去及时将data数据赋值给page和pagesize
  }
}
</script>

<style>
</style>
