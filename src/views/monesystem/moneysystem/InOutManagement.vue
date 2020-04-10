<template>
  <div class="InOutQuery">
    <!-- 部门收支信息表格 -->
    <div class="export">
      <el-button @click="output"
                 style="margin-bottom: 10px; margin-right:60px"
                 size="medium"
                 type="success">导出</el-button>
      <!-- 待封装 -->
      制单日期：
      <el-date-picker style="margin-bottom:20px"
                      v-model="valueDate"
                      type="monthrange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="roundDate"
                      value-format="yyyy-MM"></el-date-picker>
    </div>注:
    <span style="color:red">红色</span>部分为预算金额
    <el-table id="table"
              :data="tableData"
              border
              style="width: 100%;margin-bottom: 20px;margin-top:10px"
              size="mini"
              row-key="accountTitleId"
              :tree-props="{children: 'children', hasChildren: 'hasChildren',label: 'accountTitleName'}">
      <el-table-column prop="accountTitleName"
                       label="费用明细/部门"
                       fixed
                       width="153"></el-table-column>
      <!-- accountCount -->

      <span v-for="item in dapartmentList"
            :key="item.id">
        <el-table-column label="合计"
                         prop="accountCount"
                         align="center"
                         width="153px">
          <template v-slot:default="{ row }">
            <span> {{row.sum==0.00?'':NumFormat(row.sum)}}</span>
            <span class="style:black pine">|</span>
            <span class="bgcRed"> {{row.budgetSum==0.00?'':NumFormat(row.budgetSum)}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="item.name"
                         align="center">
          <template v-slot:default="{ row }">{{lastCountRow(row,item.id)}}</template>
          <el-table-column label
                           width="1"
                           align="center">
            <template v-slot:default="{ row }">{{budgetRow(row,item.id)}}</template>
          </el-table-column>
          <span v-for="item1 in item.children"
                :key="item1.id">
            <el-table-column :label="item1.name"
                             align="center"
                             width="130px">
              <template v-slot:default="{ row }">
                {{lastCountRow(row,item1.id)}}
                <span class="pine">|</span>
                <span class="bgcRed">{{budgetRow(row,item1.id)}}</span>
              </template>

              <span v-for="item2 in item1.children"
                    :key="item2.id">
                <el-table-column :label="item2.name"
                                 align="center"
                                 width="130px">
                  <template v-slot:default="{ row }">
                    <span class="pa">{{lastCountRow(row,item2.id)}}</span>
                    <span class="style:black pine">|</span>
                    <span class="bgcRed">{{budgetRow(row,item2.id)}}</span>
                  </template>
                  <span v-for="item3 in item2.children"
                        :key="item3.id">
                    <el-table-column :label="item3.name"
                                     align="center"
                                     width="130px">
                      <template v-slot:default="{ row }">
                        {{lastCountRow(row,item3.id)}}
                        <span class="style:black">|</span>
                        <span class="bgcRed">{{budgetRow(row,item3.id)}}</span>
                      </template>
                      <span v-for="item4 in item3.children"
                            :key="item4.id">
                        <el-table-column :label="item4.name">
                          <template v-slot:default="{ row }">
                            {{lastCountRow(row,item4.id)}}
                            <span class="style:black">|</span>
                            <span class="bgcRed">{{budgetRow(row,item4.id)}}</span>
                          </template>
                        </el-table-column>
                      </span>
                    </el-table-column>
                  </span>
                </el-table-column>
              </span>
            </el-table-column>
          </span>
        </el-table-column>
      </span>
    </el-table>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data () {
    return {
      options: [
        {
          value: '1',
          label: '1月'
        },
        {
          value: '2',
          label: '2月'
        },
        {
          value: '3',
          label: '3月'
        },
        {
          value: '4',
          label: '4月'
        },
        {
          value: '5',
          label: '5月'
        },
        {
          value: '6',
          label: '6月'
        },
        {
          value: '7',
          label: '7月'
        },
        {
          value: '8',
          label: '8月'
        },
        {
          value: '9',
          label: '9月'
        },
        {
          value: '10',
          label: '5月'
        },
        {
          value: '11',
          label: '11月'
        },
        {
          value: '12',
          label: '12月'
        }
      ],
      value: '',
      aa: 11,
      dapartmentList: [],
      tableData: [],
      valueDate: [],
      startTime: '',
      endTime: ''
    }
  },
  created () {
    this.getkuaijiList()
    this.getInOutList()
  },
  methods: {
    roundDate (i) {
      if (i) {
        this.startTime = i[0]
        this.endTime = i[1]
      } else {
        this.startTime = ''
        this.endTime = ' '
      }
      this.getkuaijiList()
      this.getInOutList()
    },
    labelHead (h, { column, index }) {
      let l = column.label.length
      let f = 16 // 每个字大小，其实是每个字的比例值，大概会比字体大小差不多大一点，
      column.minWidth = f * l // 字大小乘个数即长度 ,注意不要加px像素，这里minWidth只是一个比例值，不是真正的长度
      // 然后将列标题放在一个div块中，注意块的宽度一定要100%，否则表格显示不完全
      return h('div', { class: 'table-head', style: { width: '100%' } }, [column.label])
    },
    output (tableID) {
      /* generate workbook object from table */
      let table = document.querySelector('#' + 'table').cloneNode(true)
      // 因为element-ui的表格的fixed属性导致多出一个table，会下载重复内容，这里删除掉
      table.removeChild(table.querySelector('.el-table__fixed'))
      let wb = XLSX.utils.table_to_book(table, { raw: true }) // mytable为表格的id名
      /* get binary string as output */
      let excName = this.companyReport
      if (this.dataEndDate) {
        excName += '(' + this.dataEndDate + ')'
      }
      let wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet-stream' }),
          '各部门收支汇总表' + '.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    async getkuaijiList () {
      // console.log(this.tableData)
      const data = await this.$http.getAccountTitleDepartmentSum({ startTime: this.startTime, endTime: this.endTime })

      console.log(data)
      // let temp = data.data
      // let newtemp = []
      // for (var i = 0; i < temp.length; i++) {
      //   if (i > 0 && i < temp.length - 1) {
      //     newtemp.push(temp[i])
      //   }
      // }
      this.tableData = data.data
    },
    async getInOutList () {
      const { data } = await this.$http.getDepartmentList()
      console.log(data)
      this.dapartmentList = data
    },
    budgetRow (row, id) {
      for (var i = 0; i < row.budgets.length; i++) {
        if (row.budgets[i].departmentId === id) {
          if (row.budgets[i].budgetSum !== '0.00') {
            return this.$hbteApi.addComma(row.budgets[i].budgetSum)
          }
        }
      }
    },
    NumFormat (number) {
      var arr = (number + '').split('.')
      var int = arr[0] + ''
      var fraction = arr[1] || ''
      var f = int.length % 3
      var r = int.substring(0, f)

      for (var i = 0; i < Math.floor(int.length / 3); i++) {
        r += ',' + int.substring(f + i * 3, f + (i + 1) * 3)
      }
      if (f === 0) {
        r = r.substring(1)
      }
      return r + (fraction ? '.' + fraction : '')
    },
    lastCountRow (row, id) {
      // return row.departments, id
      for (var i = 0; i < row.departments.length; i++) {
        if (row.departments[i].id === id) {
          if (row.departments[i].departmentSum !== '0.00') {
            return ` ${this.$hbteApi.addComma(row.departments[i].departmentSum)}`
          }
        }
      }
    },
    queryList (value) {
      this.getkuaijiList()
    }
  }
}
</script>
<style lang='scss' scoped>
.pine {
  // padding-left: 48%;
  text-align: center;
}
.el-table-column {
  width: 100%;
}
.bgcRed {
  width: 50%;
  // float: right;
  color: red;
}
.table-head {
  font-size: 14px !important; //设置固定的字体大小
}
.nowrap {
  display: inline-block;
  white-space: nowrap;
  word-break: keep-all;
  text-overflow: unset;
}
</style>
