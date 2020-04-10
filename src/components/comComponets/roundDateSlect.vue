<template>
  <div class="myDatePicker">
    <el-date-picker
      style="margin-bottom:20px"
      v-model="valueDate"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      @change="roundDate"
      value-format="yyyy-MM-dd"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  data () {
    return {
      startTime: '',
      endTime: '',
      valueDate: ''
    }
  },
  methods: {
    pickerOptions: {
      shortcuts: [
        {
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }
      ]
    },
    roundDate (i) {
      console.log(i)
      this.startTime = i[0]
      this.endTime = i[1]
      console.log(this.startTime, this.endTime)
    }
  }
}
</script>

<style>
</style>
