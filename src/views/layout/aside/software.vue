<template>
  <div v-if="ifshow">
    <v-submenu :submenus="submenus"></v-submenu>
  </div>
</template>

<script>
import submenuTemplate from './submenuTemplate.vue'

export default {
  name: 'software',
  components: { 'v-submenu': submenuTemplate },
  data () {
    return {
      submenus: [
        {
          name: 'Release管理',
          index: '1',
          items: [{
            index: '/upDownMange',
            name: '版本管理'
          },
          {
            index: '/ProductManage',
            name: '产品管理'
          },
          {
            index: '/ProjectManage',
            name: '项目管理'
          },
          {
            index: '/History',
            name: '历史记录'
          }]
        }
      ]
    }
  },
  created () {
    let temp = JSON.parse(localStorage.getItem('asidedata'))
    this.ifshow = temp.aside === 'software'
  }
}
</script>
