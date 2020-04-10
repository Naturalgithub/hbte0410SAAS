<template>
  <el-form>
    <el-form-item>
      <el-date-picker style="width:70%"
                      v-model="pickDate"
                      type="daterange"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="search"
                      value-format="yyyy-MM-dd"
                      clearable></el-date-picker>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'dateTemplate',
  data () {
    return {
      pickDate: []
    }
  },
  methods: {
    search (v) {
      console.log('search Time')
      if (this.pickDate == null) {
        this.pickDate = ['', '']
      }
      this.$emit('searchTime', this.pickDate[0], this.pickDate[1])
    }
  }
}
</script>
