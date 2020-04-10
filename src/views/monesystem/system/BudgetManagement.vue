<template>
  <!-- 预算管理 -->
  <div class="InOutQuery">
    <!-- 部门收支信息表格 -->
    <div class="export">
      <span>
        <el-row>
          <el-form>
            <el-col :span="5">
              <el-form-item label="选择部门:">
                <el-cascader style="width:70% !important"
                             v-model="departmentvalue"
                             :options="departmentOptions"
                             :props="{
                      checkStrictly:false,
                      label: 'name',
                      value: 'id',
                      children: 'children'
                      }"
                             clearable
                             @change="departmentHandleChange"
                             placeholder="请选择(默认为一级分类)">
                  <template v-slot:default="obj">
                    <span>{{ obj.data.name}}</span>
                  </template>
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="选择科目:">
                <el-cascader style="width:70% !important"
                             v-model="accountTitleValue"
                             :options="accountTitleOptions"
                             :props="{
                label: 'accountTitleName',
                value: 'accountTitleId',
                children: 'children'
              }"
                             clearable
                             @change="accountHandleChange"
                             placeholder="请选择(默认为一级分类)">
                  <template v-slot:default="obj">
                    <span>{{ obj.data.accountTitleCode}}-{{obj.data.accountTitleName}}</span>
                  </template>
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="选择日期:">
                <el-date-picker style="width:70%"
                                value-format="yyyy-MM"
                                v-model="passBackEndData.date"
                                type="month"
                                @change="passDate"
                                placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="预算金额:">
                <el-input :disabled="budgetDisable"
                          v-model="passBackEndData.budgetSum"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="success"
                         @click="sureSubmit">提交</el-button>
            </el-col>
            <el-col :span="24">
              <el-form-item label="查询日期:">
                <el-date-picker style="margin-bottom:0px"
                                v-model="valueDate"
                                type="monthrange"
                                align="right"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                @change="roundDate"
                                value-format="yyyy-MM"></el-date-picker>
              </el-form-item>
            </el-col>

          </el-form>
        </el-row>
      </span>
    </div>
    <el-table id="table"
              :data="tableData"
              border
              style="width: 100%;margin-bottom: 20px;margin-top:10px"
              size="mini"
              row-key="accountTitleId"
              :tree-props="{children: 'children', hasChildren: 'hasChildren',label: 'accountTitleName'}">
      <el-table-column prop="accountTitleName"
                       label="预算明细/部门"
                       fixed
                       width="153"></el-table-column>
      <!-- accountCount -->
      <el-table-column align="center"
                       label="合计"
                       prop="accountCount">
        <template v-slot:default="{ row }">{{row.budgetSum==0.00?'':NumFormat(row.budgetSum)}}</template>
      </el-table-column>
      <el-table-column align="center"
                       :label="item.name"
                       v-for="item in dapartmentList"
                       :key="item.id">
        <template v-slot:default="{ row }">{{lastCountRow(row,item.id)}}</template>
        <!-- {{item.id}} -->
        <el-table-column align="center"
                         prop
                         :label="item1.name"
                         v-for="item1 in item.children"
                         :key="item1.id">
          <template v-slot:default="{ row }">{{lastCountRow(row,item1.id)}}</template>
          <el-table-column align="center"
                           prop
                           :label="item2.name"
                           v-for="item2 in item1.children"
                           :key="item2.id">
            <template v-slot:default="{ row }">{{lastCountRow(row,item2.id)}}</template>
            <el-table-column align="center"
                             prop
                             :label="item3.name"
                             v-for="item3 in item2.children"
                             :key="item3.id">
              <template v-slot:default="{ row }">{{lastCountRow(row,item3.id)}}</template>
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
      accountTitleValue: '',
      departmentvalue: '',
      departmentOptions: [],
      value: '',
      accountTitleOptions: [],
      dapartmentList: [],
      tableData: [],
      valueDate: [],
      startTime: '',
      endTime: '',
      budget: '',
      budgetDisable: true,
      code: 0,
      passBackEndData: {
        date: '',
        budgetSum: '',
        departmentId: '',
        accountTitleId: ''
      }
    }
  },
  created () {
    const time = this.$hbteApi.nowTime()
    // console.log(`${time.nowYear}-${time.nowMonth}`)
    this.startTime = `${time.nowYear}-${time.nowMonth}`
    this.endTime = `${time.nowYear}-${time.nowMonth}`
    this.getkuaijiList()
    this.getInOutList()
  },
  methods: {
    async getInOutList () {
      const userInfo = JSON.parse(localStorage.getItem('data'))
      const { data } = await this.$http.getDepartmentList({ id: userInfo.id })
      // console.log(data)
      this.departmentOptions = this.$hbteApi.getTreeData(data)
      this.dapartmentList = data
    },
    async passDate (value) {
      console.log(value)
      if (this.passBackEndData.departmentId !== '' && this.passBackEndData.accountTitleId !== '') {
        this.budgetDisable = false
        // 请求
        this.passBackEndData.budgetSum = ''
        const data = await this.$http.getBudgetNum(this.passBackEndData)
        console.log(data)
        if (data.code == 0) {
          this.code = 0
          this.passBackEndData.budgetSum = data.data.budgetSum
        } else if (data.code === -1) {
          this.code = data.code
        }
      }
    },
    async departmentHandleChange (value) {
      console.log(value)
      // console.log(value.length - 1)
      this.passBackEndData.departmentId = value[value.length - 1] || -1
      console.log(this.passBackEndData.departmentId)
      if (this.passBackEndData.accountTitleId !== '' && this.passBackEndData.date !== '') {
        this.budgetDisable = false
        this.passBackEndData.budgetSum = ''
        // 请求
        const data = await this.$http.getBudgetNum(this.passBackEndData)
        if (data.code == 0) {
          this.code = 0
          this.passBackEndData.budgetSum = data.data.budgetSum
        } else if (data.code === -1) {
          this.code = data.code
        }
      }
    },
    async accountHandleChange (value) {
      this.passBackEndData.accountTitleId = value[value.length - 1] || -1
      console.log(this.passBackEndData.accountTitleId)
      if (this.passBackEndData.departmentId !== '' && this.passBackEndData.date !== '') {
        this.budgetDisable = false
        this.passBackEndData.budgetSum = ''
        // 请求
        const data = await this.$http.getBudgetNum(this.passBackEndData)
        console.log(data)
        if (data.code == 0) {
          this.code = 0
          this.passBackEndData.budgetSum = data.data.budgetSum
        } else if (data.code === -1) {
          this.code = data.code
        }
      }
    },

    async sureSubmit () {
      console.log(22)
      if (this.passBackEndData.departmentId == -1) {
        this.$message.info('请选择部门')
        return
      } else if (this.passBackEndData.budgetSum === '') {
        this.$message.info('请填写预算金额')
        return
      } else if (this.passBackEndData.accountTitleId == -1) {
        this.$message.info('请选择部门')
        return
      } else if (this.passBackEndData.date == null) {
        this.$message.info('请选择日期')
        return
      }
      const empty = () => {
        this.passBackEndData.departmentId = ''
        this.passBackEndData.budgetSum = ''
        this.passBackEndData.departmentId = ''
        this.passBackEndData.accountTitleId = ''
        this.passBackEndData.date = ''
        this.departmentvalue = ''
        this.accountTitleValue = ''
      }
      // console.log(this.code)
      // console.log(98)
      // return false
      if (this.code === 0) {
        const data = await this.$http.updateBudgetSum(this.passBackEndData)
        if (data.code === 0) {
          this.$message.success('提交成功')
          empty()
        } else {
          this.$message.error(data.eroMsg)
        }
      } else if (this.code === -1) {
        const data = await this.$http.saveBudget(this.passBackEndData)
        console.log(data.code)
        if (data.code === 0) {
          this.$message.success('提交成功')
          empty()
        } else {
          this.$message.error(data.eroMsg)
        }
      }
      this.getkuaijiList()
    },
    NumFormat (number) {
      var arr = (number + '').split('.')
      var int = arr[0] + ''
      var fraction = arr[1] || ''
      var bit = int.length % 3
      var mat = int.substring(0, bit)

      for (var i = 0; i < Math.floor(int.length / 3); i++) {
        mat += ',' + int.substring(bit + i * 3, bit + (i + 1) * 3)
      }

      if (bit === 0) {
        mat = mat.substring(1)
      }
      return mat + (fraction ? '.' + fraction : '')
    },

    roundDate (i) {
      if (i) {
        this.startTime = i[0]
        this.endTime = i[1]
      } else {
        this.startTime = ''
        this.endTime = ' '
      }
      this.getkuaijiList()
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
      const { data } = await this.$http.getAccountTitleDepartmentSum({ startTime: this.startTime, endTime: this.endTime })
      let temp = data
      let newtemp = []
      for (var i = 0; i < temp.length; i++) {
        if (i > 0 && i < temp.length - 1) {
          newtemp.push(temp[i])
        }
      }
      this.tableData = newtemp
      this.accountTitleOptions = this.$hbteApi.getTreeData(data)
    },

    lastCountRow (row, id) {
      // if (row.budgets.length == undefined) { return }
      for (var i = 0; i < row.budgets.length; i++) {
        if (row.budgets[i].departmentId === id) {
          if (row.budgets[i].budgetSum !== '0.00') {
            return this.$hbteApi.addComma(row.budgets[i].budgetSum)
          }
        }
      }
    },
    countRow (countNum) {
      let num = Number(countNum)
      if (num == '') {
        return ''
      } else {
        return this.$hbteApi.addComma(num)
      }
    },
    queryList (value) {
      this.getkuaijiList()
    }
  }
}
</script>
<style lang="scss" scoped>
.mr0 {
  margin-right: 0;
}
.el-select {
  width: 60%;
}
.el-input {
  width: 60%;
}
.el-cascader {
  width: 70%;
}
.el-date-picker {
  width: 50%;
}
</style>
