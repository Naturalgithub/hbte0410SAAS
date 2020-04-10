<template>
  <div>
    <el-row>
      <el-col :span="2">
        <el-button type="success"
                   @click="addPapers">添加</el-button>
      </el-col>
      <el-col :span="6">
        <v-date @searchTime="searchTime"></v-date>
      </el-col>
    </el-row>
    <v-table :cols="cols"
             :lastCol="lastCol"
             :tableData="tableData"></v-table>
    <v-pagination :page="page"
                  :pageSize="pageSize"
                  :total="total"
                  @pageSizeChanged="pageSizeChanged"></v-pagination>

    <el-dialog :title="title"
               :visible.sync="adddialogVisible"
               width="50%"
               :close-on-click-modal=false>
      <el-container>
        <el-aside>
          <el-form style="margin-top:4px">
            <el-form-item>
              <el-button>单选题</el-button>
            </el-form-item>
            <el-form-item>
              <el-button>多选题</el-button>
            </el-form-item>
            <el-form-item>
              <el-button>判断题</el-button>
            </el-form-item>
            <el-form-item>
              <el-button>填空题</el-button>
            </el-form-item>
            <el-form-item>
              <el-button>简答题</el-button>
            </el-form-item>
          </el-form>
        </el-aside>
        <el-main>
          <el-form>
            <el-form-item>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-input placeholder="试卷名称"
                            v-model="papers.title"></el-input>
                </el-col>
                <el-col :span="12">
                  <el-input placeholder="试卷编码"
                            v-model="papers.serialNumber"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-input placeholder="考试时间(min)"
                            v-model="papers.examTime"
                            prefix-icon="el-icon-alarm-clock"
                            :min=30
                            :max=120></el-input>
                </el-col>
                <!-- <el-col :span="12"> -->
                <el-col :span="6">
                  <el-select v-model="papers.type"
                             placeholder="试卷用途">
                    <el-option v-for="(item,index) in paperPurpose"
                               :key=index
                               :label="item.name"
                               :value="item.value"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="6">
                  <el-select v-model="papers.score"
                             allow-create
                             default-first-option
                             filterable
                             clearable
                             placeholder="总分">
                    <el-option v-for="(item,index) in paperScore"
                               :key=index
                               :label="item.name"
                               :value="item.value"></el-option>
                  </el-select>
                </el-col>
                <!-- </el-col> -->
              </el-row>
            </el-form-item>
          </el-form>
          <el-divider></el-divider>
        </el-main>
      </el-container>

      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="adddialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="submitPaper">确 定</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import dateTemplateVue from '../common/dateTemplate.vue'
import tableTemplateVue from '../common/tableTemplate.vue'
import paginationTemplateVue from '../common/paginationTemplate.vue'
export default {
  name: 'departmentPapers',
  components: {
    'v-date': dateTemplateVue,
    'v-table': tableTemplateVue,
    'v-pagination': paginationTemplateVue
  },
  data () {
    return {
      cols: [{
        name: 'title',
        label: '试卷',
        ifshow: true,
        clickFunc: (row) => {
          this.displayPaper(row)
        }
      },
      {
        name: 'department',
        label: '部门',
        width: '180'
      },
      {
        name: 'type',
        label: '用途',
        width: '180'
      },
      {
        name: 'status',
        label: '状态',
        width: '180'
      },
      {
        name: 'date',
        label: '日期',
        width: '180'
      }],
      lastCol: {
        ifshow: true,
        operates: [{
          name: '编辑',
          type: 'primary',
          clickFunc: (index, row) => {
            this.updatePaperItem(index, row)
          }
        },
        {
          name: '删除',
          type: 'primary',
          clickFunc: (index, row) => {
            this.deletePaperItem(index, row)
          }
        }]
      },
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 50,
      adddialogVisible: false,
      title: '添加试卷',
      papers: {
        title: '',
        serialNumber: '',
        examTitme: '',
        score: '',
        type: '',
        examTitles: []
      },
      paperPurpose: [{
        name: '考试',
        value: '0'
      },
      {
        name: '调研',
        value: '1'
      }],
      paperScore: [{
        name: '60分',
        value: '60'
      },
      {
        name: '100分',
        value: '100'
      },
      {
        name: '150分',
        value: '150'
      }]
    }
  },
  methods: {
    addPapers () {
      this.adddialogVisible = true
    },
    searchTime (startTime, endTime) {
      this.getQuestions(startTime, endTime)
    },
    pageSizeChanged (page, pageSize) {

    },
    submitPaper () {

    },
    displayPaper (row) {

    },
    updatePaperItem (index, row) {

    },
    deletePaperItem (index, row) {

    },
    async getPapers (startTime, endTime) {
      const res = await this.$http.getPapers(
        {
          userId: this.user.id,
          page: this.page,
          pageSize: this.pageSize,
          startTime: startTime,
          endTime: endTime
        }
      )
      this.tableData = []
      for (var obj of res.result) {
        this.tableData.push({
        })
      }
      this.total = res.count
    },
    addPaperQuestion () {
      console.log('add paper question')
    }
  }
}
</script>

<style scoped>
.el-dialog .el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 100px;
  width: 100px;
}

.el-dialog .el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-dialog .el-container {
  margin-bottom: 40px;
}

.el-aside .el-form-item {
  margin-bottom: 4px;
}

.el-aside .el-form-item .el-button {
  width: 100%;
}
</style>
