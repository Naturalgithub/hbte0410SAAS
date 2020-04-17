<!-- tabs -->
<template>
  <div class="tabs">
    <el-tabs
      type="border-card"
      class="eltabs"
      v-model="activeName"
      @tab-click="handleClick"
      width="300px"
    >
      <el-tab-pane v-for="item in tabsList" :key="item.name" :label="item.label" :name="item.name">
        <!-- {{item.label}} -->
        <div>item.value</div>
        <slot></slot>
      </el-tab-pane>
      <!-- <el-tab-pane label="消息中心">消息中心</el-tab-pane>
  <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>

export default {
  name: 'vtabs',
  props: {
    // activeName: {
    //   type: String
    // },
    tabsList: {
      type: Array
    }
  },
  components: {},
  data () {
    return {
      // tabsList: [
      //   { label: '用户管理', name: './index' },
      //   { label: '配置管理', name: './peizhi' },
      //   { label: '角色管理', name: './juese' },
      //   { label: '定时任务补偿', name: './buchang' }
      // ],
      activeName: ''
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {
    handleClick (v, l) {
      this.$emit('tabsclick', { v, l })
    }
  },
  created () {
    // handleClick(){ },
  },
  mounted () {
    this.activeName = this.tabsList[0].name
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
.eltabs {
  max-width: 780px;
  min-height: 280px;
  // display: inline-block;
  margin-right: 50px;
  margin-bottom: 50px;
  float: left;
}
</style>
