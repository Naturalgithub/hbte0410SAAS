<template>
  <el-table :data="tableData" style="100%" stripe border>
    <el-table-column label="序号" width="50px" type="index" align="center"></el-table-column>   
    <el-table-column v-for="(item,i) in cols" :key="i" :prop=item.name :label=item.label :width=item.width align="center" :show-overflow-tooltip=item.ifshow>
      <template v-slot:default="{row}" v-if=item.ifshow>
        <el-link type="primary" @click=item.clickFunc(row)>{{row[item.name]}}</el-link>
      </template>    
    </el-table-column>  
    <el-table-column label="操作" v-if=lastCol.ifshow align="center">
        <template slot-scope="scope">
            <el-button  v-for="(item,index) in lastCol.operates" 
            :type=item.type @click=item.clickFunc(scope.$index,scope.row) :key=index>{{item.name}}
            </el-button>
        </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
    name:"tableTemplate",
    props:["cols","lastCol","tableData"]
}
</script>