<!-- asideicon -->
<template>
  <div class="asideicon">
    <div class="mt20px">
      <span
        class="iconstyle"
        :style="{color:'userwork'==$store.state.asideStatus?'#fff':'rgba(255,255,255,0.5)'}"
        @click="userwork"
      >
        <i class="el-icon-user-solid"></i>
        <p>个人办公</p>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'asideicon',
  components: {},
  data () {
    return {
      userwork () {
        this.$store.commit('changeAsideStatus', './userwork')
        this.$router.push('./userwork')
      }
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {

  },
  created () {

  },
  mounted () {

  },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
