<!-- userword -->
<template>
  <div class="userword">
    <vtabs :tabsList="tabsList" :activeName="activeName" @tabsclick="tabsclick">
      <div v-show="activeName=='./index'">这是配置模板1</div>
      <div v-show="activeName=='./peizhi'">这是配置模板2</div>
      <div v-show="activeName=='./juese'">这是配置模板3</div>
      <div v-show="activeName=='./buchang' ">这是配置模板4</div>
    </vtabs>
    <vtabs :tabsList="tabsList" :activeName="activeName" @tabsclick="tabsclick">
      <div v-show="activeName=='./index'">这是配置模板1</div>
      <div v-show="activeName=='./peizhi'">这是配置模板2</div>
      <div v-show="activeName=='./juese'">这是配置模板3</div>
      <div v-show="activeName=='./buchang' ">这是配置模板4</div>
    </vtabs>
    <vtabs :tabsList="tabsList" :activeName="activeName" @tabsclick="tabsclick">
      <div v-show="activeName=='./index'">这是配置模板1</div>
      <div v-show="activeName=='./peizhi'">这是配置模板2</div>
      <div v-show="activeName=='./juese'">这是配置模板3</div>
      <div v-show="activeName=='./buchang' ">这是配置模板4</div>
    </vtabs>
    <vtabs :tabsList="tabsList" :activeName="activeName" @tabsclick="tabsclick">
      <div v-show="activeName=='./index'">这是配置模板1</div>
      <div v-show="activeName=='./peizhi'">这是配置模板2</div>
      <div v-show="activeName=='./juese'">这是配置模板3</div>
      <div v-show="activeName=='./buchang' ">这是配置模板4</div>
    </vtabs>
    <vtabs :tabsList="tabsList" :activeName="activeName" @tabsclick="tabsclick">
      <div v-show="activeName=='./index'">这是配置模板1</div>
      <div v-show="activeName=='./peizhi'">这是配置模板2</div>
      <div v-show="activeName=='./juese'">这是配置模板3</div>
      <div v-show="activeName=='./buchang' ">这是配置模板4</div>
    </vtabs>
    <vtabs :tabsList="tabsList" :activeName="activeName" @tabsclick="tabsclick">
      <div v-show="activeName=='./index'">这是配置模板1</div>
      <div v-show="activeName=='./peizhi'">这是配置模板2</div>
      <div v-show="activeName=='./juese'">这是配置模板3</div>
      <div v-show="activeName=='./buchang' ">这是配置模板4</div>
    </vtabs>
  </div>
</template>

<script>
import Vtabs from './userworkComponents/Vtabs.vue'
export default {
  name: 'usuerwork',
  components: {
    'vtabs': Vtabs
  },
  data () {
    return {
      aa: '',
      activeName: './index',
      tabsList: [
        { label: '用户管理', name: './index', value: '<span>123</span>' },
        { label: '配置管理', name: './peizhi' },
        { label: '角色管理', name: './juese' },
        { label: '定时任务补偿', name: './buchang' }
      ]
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    tabsclick (obj) {
      console.log(obj.v._props)
      let temp = obj.v._props
      this.activeName = temp.name
    }
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
