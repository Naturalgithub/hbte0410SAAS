<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    this.getScreen()
    this.setMobile()
  },
  methods: {
    getScreen () {
      let clientWidth =
        document.documentElement.clientWidth || document.body.clientHeight

      if (clientWidth < 768) {
        // 当屏幕小于768时，设置Vuex里的数据为true
        this.$store.commit('SET_MOBLIE', true)
        this.$store.commit('ishowasideapp', false)
      } else {
        // 反之，设置Vuex里的数据为false
        this.$store.commit('ishowasideapp', true)
      }
    },
    setMobile () {
      // 监听屏幕
      addEventListener('resize', () => {
        this.getScreen()
      })
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0px;
  padding: 0px;
  font-family: Microsoft YaHei, Helvetica Neue, Helvetica, PingFang SC,
    Hiragino Sans GB, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}

#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
a {
  color: #56a9ff;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.el-dialog__header {
  background-color: rgb(240, 243, 245);
  line-height: 0em !important;
  padding: 15px;
}
</style>
