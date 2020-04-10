<template>
  <div>
    <el-submenu v-for="(submenu,i) in submenus"
                :key="i"
                :index=submenu.index>
      <template slot="title">
        <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
        <span style="font-size:12px"
              class="fw">&nbsp;&nbsp;&nbsp;{{submenu.name}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="(item,index) in submenu.items"
                      :key="index"
                      :index=item.index>{{item.name}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'submenuTemplate',
  props: ['submenus']
}
</script>
