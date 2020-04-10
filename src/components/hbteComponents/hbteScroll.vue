<template>
  <div class="hbtescroll">
    <vuescroll></vuescroll>
  </div>
</template>

<script>
import vuescroll from 'vuescroll'
export default {
  name: 'hbtescroll',
  components: { vuescroll },
  data () {
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, // 是否只有滚动的时候才显示滚动条
          background: '#ccc'
        }
      }
    }
  }
}
</script>

<style>
</style>
