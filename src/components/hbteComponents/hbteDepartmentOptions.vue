<template>
  <div>
    <el-form-item label="所属部门">
      <el-cascader
        :options="departmentOptions"
        :props="{
              label: 'name',
              value: 'id',
              // value: '[accountTitleId,accountTitleName,accountTitleParentId]',
              children: 'children'
            }"
        clearable
        @change="departmentHandleChange"
        placeholder="请选择(默认为一级分类)"
      >
        <template v-slot:default="obj">
          <span>{{ obj.data.name}}</span>
        </template>
      </el-cascader>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'hbteDepartmentOptions',
  data () {
    return {
      departmentOptions: []
    }
  },
  methods: {
    async getDepartmentId () {
      const { data } = await this.$http.getDepartmentList()
      // console.log(data.data)
      this.departmentOptions = this.$hbteApi.getTreeData(data)
    }
  },
  departmentHandleChange (v) {
    this.$emit.departmentHandleChange('departmentHandleChange', v)
  }

}
</script>

<style>
</style>
