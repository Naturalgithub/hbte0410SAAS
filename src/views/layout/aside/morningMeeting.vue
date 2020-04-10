<template>
  <div v-if="ifshow">
    <v-submenu :submenus="submenus"></v-submenu>
  </div>
</template>

<script>
import submenuTemplate from './submenuTemplate.vue'

export default {
  name: 'morningMeeting',
  components: { 'v-submenu': submenuTemplate },
  data () {
    return {
      submenus: [
        {
          name: '晨会管理',
          index: '1',
          items: [{
            index: '/morningMeetingList',
            name: '晨会Fika'
          }]
        },
        {
          name: '考试系统',
          index: '2',
          items: [
            {
              index: '/examPaperHome',
              name: '我的试卷'
            },
            {
              index: '/departmentPapers',
              name: '部门试卷'
            },
            {
              index: '/departmentQuestions',
              name: '部门考题'
            }
          ]
        }
      ]
    }
  },
  created () {
    let temp = JSON.parse(localStorage.getItem('asidedata'))
    this.ifshow = temp.aside === 'morningMeeting'
  }
}
</script>
