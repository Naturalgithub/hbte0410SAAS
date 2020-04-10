<template>
  <div class="InOutQuery">
    <el-row>
      <el-col :xs="8" :sm="6" :md="10" :lg="8" :xl="8">
        <el-form>
          <el-form-item label="单据类型">
            <el-select v-model="inoutwayid" placeholder="请选择单据类型" @change="dateidchange">
              <el-option
                v-for="item in dateoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- <span>收款信息</span> -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 收支信息表格 -->
    <template>
      <el-table id="table-data" :data="tableData" style="width: 100%" border size="mini">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column v-if="inoutwayid==3||inoutwayid==1" prop="supplierName" label="供应商名称"></el-table-column>
        <!-- <el-table-column v-if="inoutwayid==3||inoutwayid==1" prop="supplierPhone" label="供应商联系方式"></el-table-column> -->
        <el-table-column v-if="inoutwayid==3||inoutwayid==1" prop="supplierAccount" label="供应商银行账号"></el-table-column>
        <el-table-column
          v-if="inoutwayid==5||inoutwayid==1||inoutwayid==3"
          prop="bankName"
          label="银行名称"
        ></el-table-column>
        <el-table-column v-if="inoutwayid==5" prop="bankAddress" label="银行地址"></el-table-column>
        <el-table-column v-if="inoutwayid==4||inoutwayid==0" prop="customerName" label="客户名称"></el-table-column>
        <!-- <el-table-column v-if="inoutwayid==4||inoutwayid==1" prop="customerPhone" label="客户联系方式"></el-table-column> -->
        <el-table-column
          v-if="inoutwayid==1||inoutwayid==2||inoutwayid==0"
          prop="oddNumber"
          label="单号"
        ></el-table-column>
        <el-table-column
          v-if="inoutwayid==1||inoutwayid==2||inoutwayid==0"
          prop="createDate"
          label="制单日期"
        ></el-table-column>
        <el-table-column v-if="inoutwayid==0" prop="incomeAmount" label="收入金额"></el-table-column>
        <el-table-column v-if="inoutwayid==1" prop="expenseAmount" label="支出金额"></el-table-column>
        <el-table-column
          v-if="inoutwayid==1||inoutwayid==2||inoutwayid==0"
          prop="comment"
          label="摘要"
        ></el-table-column>
        <!-- <el-table-column v-if="inoutwayid==1" prop="drawee" label="实际付款人"></el-table-column>
        <el-table-column
          v-if="inoutwayid==1||inoutwayid==2||inoutwayid==0"
          prop="actualName"
          label="实际操作人"
        ></el-table-column>-->
        <el-table-column v-if="inoutwayid==1" prop="paymentTermName" label="付款方式信息"></el-table-column>
        <el-table-column
          v-if="inoutwayid==1||inoutwayid==2||inoutwayid==0"
          prop="clerk"
          label="业务员"
        ></el-table-column>
        <!-- <el-table-column
          v-if="inoutwayid==1||inoutwayid==2||inoutwayid==0"
          prop="currencyName"
          label="货币名称"
        ></el-table-column>
        <el-table-column
          v-if="inoutwayid==1||inoutwayid==2||inoutwayid==0"
          prop="currencyRatio"
          label="货币兑率"
        ></el-table-column>-->
        <el-table-column
          v-if="inoutwayid==1||inoutwayid==2||inoutwayid==0"
          prop="accountTitleName"
          label="会计科目信息"
        ></el-table-column>
        <el-table-column
          v-if="inoutwayid==1||inoutwayid==2||inoutwayid==0"
          prop="companyName"
          label="公司信息"
        ></el-table-column>
        <el-table-column v-if="inoutwayid==2||inoutwayid==1" prop="atSubjectGroupId" label="部门信息"></el-table-column>
        <el-table-column
          v-if="inoutwayid==1||inoutwayid==2||inoutwayid==0"
          prop="productLineName"
          label="产品线名称"
        ></el-table-column>

        <el-table-column prop="practicalSum" label="操作">
          <template v-slot:default="obj">
            <el-button
              plain
              size="small"
              @click="showEditDialog(obj.row)"
              type="primary"
              icon="el-icon-edit"
            />
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <!-- <el-pagination
      style="margin-top:10px"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[30,50,80]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>-->
    <!-- 编辑框 -->
    <el-dialog title="修改" :visible.sync="editVisible" width="25%">
      <el-form ref="editForm" :model="editForm" label-width="80px">
        <el-form-item v-if="inoutwayid==3||inoutwayid==1" label="供应商名称">
          <el-input v-model="editForm.supplierName"/>
        </el-form-item>
        <el-form-item v-if="inoutwayid==3" label="供应商联系方式">
          <el-input v-model="editForm.supplierPhone"/>
        </el-form-item>
        <el-form-item v-if="inoutwayid==3||inoutwayid==1" label="供应商银行账号">
          <el-input v-model="editForm.supplierAccount"/>
        </el-form-item>
        <el-form-item v-if="inoutwayid==5||inoutwayid==1||inoutwayid==3" label="银行名称">
          <el-input v-model="editForm.bankName"/>
        </el-form-item>
        <el-form-item v-if="inoutwayid==5" label="银行地址">
          <el-input v-model="editForm.bankAddress"/>
        </el-form-item>
        <el-form-item v-if="inoutwayid==4||inoutwayid==0" label="客户名称">
          <el-input v-model="editForm.customerName"/>
        </el-form-item>
        <el-form-item v-if="inoutwayid==4" label="客户联系方式">
          <el-input v-model="editForm.customerPhone"/>
        </el-form-item>
        <el-form-item v-if="inoutwayid==1||inoutwayid==2||inoutwayid==0" label="单号">
          <el-input v-model="editForm.oddNumber"/>
        </el-form-item>
        <el-form-item v-if="inoutwayid==1||inoutwayid==2||inoutwayid==0" label="制单日期">
          <el-input v-model="editForm.createDate"/>
        </el-form-item>
        <el-form-item v-if="inoutwayid==0" label="收入金额">
          <el-input v-model="editForm.incomeAmount"/>
        </el-form-item>
        <el-form-item v-if="inoutwayid==1" label="支出金额">
          <el-input v-model="editForm.expenseAmount"/>
        </el-form-item>
        <el-form-item v-if="inoutwayid==1||inoutwayid==2||inoutwayid==0" label="摘要">
          <el-input v-model="editForm.comment"/>
        </el-form-item>
        <!-- <el-form-item v-if="inoutwayid==1" label="实际付款人">
            <el-input v-model="editForm.drawee"/>
          </el-form-item>
          <el-form-item v-if="inoutwayid==1||inoutwayid==2||inoutwayid==0" label="实际操作人">
            <el-input v-model="editForm.actualName"/>
        </el-form-item>-->
        <el-form-item v-if="inoutwayid==1" label="付款方式信息">
          <el-input v-model="editForm.paymentTermName"/>
        </el-form-item>
        <el-form-item v-if="inoutwayid==1||inoutwayid==2||inoutwayid==0" label="业务员">
          <el-input v-model="editForm.clerk"/>
        </el-form-item>
        <!-- <el-form-item v-if="inoutwayid==1||inoutwayid==2||inoutwayid==0" label="货币名称">
          <el-input v-model="editForm.currencyName"/>
        </el-form-item>
        <el-form-item v-if="inoutwayid==1||inoutwayid==2||inoutwayid==0" label="货币兑率">
          <el-input v-model="editForm.currencyRatio"/>
        </el-form-item>-->
        <el-form-item v-if="inoutwayid==1||inoutwayid==2||inoutwayid==0" label="会计科目信息">
          <el-input v-model="editForm.accountTitleName"/>
        </el-form-item>
        <el-form-item v-if="inoutwayid==1||inoutwayid==2||inoutwayid==0" label="公司信息">
          <el-input v-model="editForm.companyName"/>
        </el-form-item>
        <el-form-item v-if="inoutwayid==2||inoutwayid==1" label="部门信息">
          <el-input v-model="editForm.atSubjectGroupId"/>
        </el-form-item>
        <el-form-item v-if="inoutwayid==1||inoutwayid==2||inoutwayid==0" label="产品线名称">
          <el-input v-model="editForm.productLineName"/>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editMoney">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import fileSaver from 'file-saver'
import xlsx from 'xlsx'
export default {
  data () {
    return {
      // 表单校验规则
      rules: {
        bankName: [
          {
            required: true,
            message: '请输入正确数据',
            trigger: ['blur', 'change']
          },
          {
            min: 3,
            max: 12,
            message: '用户名长度在 1 到 12 个字符',
            trigger: ['blur', 'change']
          }
        ],
        bankAddress: [
          {
            required: true,
            message: '请输入正确数据',
            trigger: ['blur', 'change']
          },
          {
            min: 3,
            max: 12,
            message: '密码长度在 1 到 12 个字符',
            trigger: ['blur', 'change']
          }
        ]
      },
      exportTable () {
        let box = xlsx.utils.table_to_book(
          document.querySelector('#table-data')
        )
        let out = xlsx.write(box, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        })
        try {
          fileSaver.saveAs(
            new Blob([out], {
              type: 'application/octet-stream'
            }),
            '收支单查询.xlsx'
          )
        } catch (e) {
          // 错误处理方式
        }
        return out
      },

      dateoptions: [
        {
          value: 0,
          label: '收款'
        },
        {
          value: 1,
          label: '付款'
        },
        {
          value: 2,
          label: '报销'
        },
        {
          value: 3,
          label: '供应商'
        },
        {
          value: 4,
          label: '客户'
        },
        {
          value: 5,
          label: '银行'
        }
      ],
      queryinoutquery: {
        createDate: ''
      },
      total: 0,
      inoutwayid: 0,
      // 当前页
      page: 1,
      // 每页条数
      pageSize: 50,

      tableData: [],
      editVisible: false,
      editForm: {
        baseurl: 'http://47.98.145.222:8080/',
        excelInfoId: '',
        supplierName: '',
        supplierPhone: '',
        supplierAccount: '',
        bankName: '',
        bankAddress: '',
        customerName: '',
        customerPhone: '',
        oddNumber: '',
        createDate: '',
        incomeAmount: '',
        expenseAmount: '',
        comment: '',
        drawee: '',
        actualName: '',
        paymentTermName: '',
        clerk: '',
        currencyName: '',
        currencyRatio: '',
        accountTitleName: '',
        companyName: '',
        atSubjectGroupId: '',
        projectName: '',
        productLineName: '',
        incomeExpenseType: ''
      }
    }
  },
  created () {
    this.getInOutList()
  },
  methods: {
    dateidchange (value) {
      // console.log(value)
      this.inoutwayid = value
      this.editForm.incomeExpenseType = value
      this.getInOutList()
    },
    showEditDialog (row) {
      this.editVisible = true
      // console.log(row)
      this.editForm = row
    },
    // 确定编辑并提交按钮
    async editMoney () {
      // console.log('提交按钮')
      const { data } = await this.$axios.post(
        `hbte-financial/hbte/excel/update`,
        this.editForm
      )
      this.editVisible = false
      // console.log(data)
      this.getInOutList()
    },
    querydata (value) {
      // console.log(value)
      this.getInOutList()
    },

    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      this.pageSize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.page = 1
      // 重新渲染
      this.getInOutList()
    },
    // 只要当前页变化时, 触发函数
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 更新当前页
      this.page = val
      // 重新渲染
      this.getInOutList()
    },
    async getInOutList () {
      // let type = this.inoutwayid == 3 ? '' : this.inoutwayid
      const { data } = await this.$axios.get('hbte-financial/hbte/excel/get', {
        params: {
          incomeExpenseType: this.inoutwayid
        }
      })
      // console.log(data)
      this.tableData = [data.data]
      // this.total = data.count
    }
  }
}
</script>

<style>
</style>
