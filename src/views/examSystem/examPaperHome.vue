<template>
  <div>
    <el-row>
      <el-col :span="6">
          <el-form>
            <el-form-item>
              <el-date-picker
                style="width:70%"
                v-model="pickDate"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="searchTime"
                value-format="yyyy-MM"
                clearable
              ></el-date-picker> 
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">       
          <el-autocomplete
            class="inline-input"
            clearable
            v-model="state1"
            :fetch-suggestions="querySearch"
            placeholder="请选择部门"
            @select="handleSelect"
            ></el-autocomplete>
        </el-col>
    </el-row>
    <v-table :cols="cols" :lastCol="lastCol" :tableData="tableData"></v-table>
    <v-pagination :page="page" :pageSize="pageSize" :total="total" @pageSizeChanged="pageSizeChanged"></v-pagination>
  </div>
</template>

<script>
import tableTemplate from "../common/tableTemplate.vue"
import paginationTemplate from '../common/paginationTemplate.vue'

export default {
    name:"examPaperHome",
    components:{'v-table':tableTemplate, 'v-pagination':paginationTemplate},
    data() {
        return {
            pickDate: '',
            cols:[{
                name:"title",
                label:"试卷",
                ifshow:true,
                clickFunc: function(row){
                    console.log("row: " + row);
                }
            },
            {
                name:"department",
                label:"部门",
            },
            {
                name:"type",
                label:"类型",
                width:"50"
            },
            {
                name:"status",
                label:"状态"
            },
            {
                name:"score",
                label:"成绩"
            },
            {
                name:"date",
                label:"日期"
            }],
            lastCol:{
                ifshow: false,
                operates:[{
                    name:"编辑",
                    type:"primary",
                    clickFunc: (index, row) => {
                        console.log("index: " + index + " row:" + row);
                    }
                }]
            },
            tableData:[{
                title:"技术部试卷-001",
                department:"技术部",
                type:"试卷",
                status:"未参加",
                score:"0",
                date:"2020-02-22"
            },
            {
                title:"人事部试卷-001",
                department:"行政人事部",
                type:"调研",
                status:"已参加",
                score:"无",
                date:"2020-02-22"
            }],
            total: 0,
            page: 1,
            pageSize: 50
        }
    },
    methods: {
        pageSizeChanged(page, pageSize){

        },
        searchTime(v){

        },
        handleSelect(v){

        }
    }
}
</script>
