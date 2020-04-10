<template>
  <div class="pline">
    <!-- 部门收支信息表格 -->
    <div class="export">
      <el-button style="margin-bottom: 10px; margin-right:60px"
                 size="medium"
                 type="success"
                 @click="exportExcel">导出</el-button>
      <!-- <el-button style="margin-bottom: 10px;" size="medium" type="success" @click="iseoandall">展开</el-button> -->
      <!-- <el-button style="margin-bottom: 10px;" size="medium" type="primary">导入</el-button> -->
      制单日期：
      <el-date-picker style="margin-bottom:20px"
                      v-model="valueDate"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="roundDate"
                      value-format="yyyy-MM-dd"></el-date-picker>
    </div>

    <!-- default-expand-all -->

    <el-table id="table"
              :data="tableData"
              ref="eltable"
              border
              style="width: 100%;margin-bottom: 20px;margin-top:10px"
              size="mini"
              row-key="accountTitleId"
              :tree-props="{children: 'children', hasChildren: 'hasChildren',label: 'productLineName'}">
      <el-table-column prop="accountTitleName"
                       label="费用明细/部门"
                       fixed
                       width="150" />
      <el-table-column align="center"
                       prop="sum"
                       border
                       label="合计">
        <!-- <template v-slot:default="{ row }">{{hejirow(row.sum)=='NaN.00'?'':hejirow(row.sum)}}</template> -->
        <template v-slot:default="{ row }">{{countRow(row.sum)=='undefined'?'':countRow(row.sum)}}</template>
      </el-table-column>
      <el-table-column align="center"
                       v-for="item in dapartmentList"
                       :key="item.productLineId"
                       prop="sum"
                       :label="item.productLineName">
        <template v-slot:default="{ row }">{{ rowa(row,item.productLineId) }}</template>

        <!-- {{item.productLineId}} -->
        <el-table-column align="center"
                         v-for="item1 in item.children"
                         :key="item1.productLineId"
                         prop
                         :label="item1.productLineName">
          <template v-slot:default="{ row }">{{ rowa(row,item1.productLineId) }}</template>
          <el-table-column align="center"
                           v-for="item2 in item1.children"
                           :key="item2.productLineId"
                           prop
                           :label="item2.productLineName">
            <template v-slot:default="{ row }">{{ rowa(row,item2.productLineId) }}</template>
            <el-table-column align="center"
                             v-for="item3 in item2.children"
                             :key="item3.productLineId"
                             prop
                             :label="item3.productLineName">
              <template v-slot:default="{ row }">{{ rowa(row,item3.productLineId) }}</template>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data () {
    return {
      isexpandall: '',
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
          label: '10月'
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
    // this.rowa()
  },
  methods: {
    // 合计
    roundDate (i) {
      if (i) {
        this.startTime = i[0]
        this.endTime = i[1]
      } else {
        this.startTime = ''
        this.endTime = ''
      }
      this.getkuaijiList()
      this.getInOutList()
    },
    exportExcel () {
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
          '产品线收支表' + '.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    async getkuaijiList () {
      // console.log(this.tableData)
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/accountTitle/getAccountTitleProductLineSum',
        { params: { startTime: this.startTime, endTime: this.endTime } }
      )
      // console.log(data.data)
      this.tableData = data.data
    },
    async getInOutList () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/productLine/productLineList'
      )
      // console.log(data.data)
      this.dapartmentList = data.data
      // console.log()
    },
    formatNumberRgx (num) {
      var parts = num.toString().split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return parts.join('.')
    },
    rowa (row, id) {
      for (var i = 0; i < row.productLines.length; i++) {
        if (
          row.productLines[i].productLineId === id &&
          row.productLines[i].productLineSum !== '0.00'
        ) {
          let temp = row.productLines[i].productLineSum
          // eslint-disable-next-line no-eval
          return this.formatNumberRgx(eval(temp) == 0 ? '' : eval(temp) + '.00')
          // return this.formatNumberRgx(row.productLines[i].productLineSum)
        }
      }
    },
    countRow (countNum) {
      if (countNum === '0.00') {
        return ''
      }
      // console.log(countNum)

      // let temp = parseFloat(countNum)
      // console.log(temp)

      // eslint-disable-next-line no-eval
      // eslint-disable-next-line eqeqeq
      // eslint-disable-next-line no-eval
      return this.formatNumberRgx(eval(countNum) + '' == 0 ? '' : eval(countNum) + '.00')
    },
    queryList (value) {
      // console.log(value)

      this.getkuaijiList()
    }
  }
}
</script>
