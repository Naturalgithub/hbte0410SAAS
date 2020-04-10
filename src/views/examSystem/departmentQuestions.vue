<template>
    <div>
        <el-row>
            <el-col :span="2">
                <el-button type="success" @click="addQuestions">添加</el-button>
            </el-col>
            <el-col :span="6">
                <v-date @searchTime="searchTime"></v-date>
            </el-col>
        </el-row>
        <v-table :cols="cols" :lastCol="lastCol" :tableData="tableData"></v-table>
        <v-pagination :page="page" :pageSize="pageSize" :total="total" @pageSizeChanged="pageSizeChanged"></v-pagination>

        <!-- 添加题目模态框 -->
        <el-dialog :title="title" :visible.sync="adddialogVisible" width="50%" :close-on-click-modal=false>
            <el-form :rules="rules" ref="questionForm" :model="questionForm" status-icon>
                <el-form-item prop="type">
                    <el-select v-model="questionForm.type" placeholder="请选择题目的类型" clearable style="width:100%" @change="questionTypeChanged">
                        <el-option v-for="(item,index) in questionsType" :key=index :label=item.name :value=item.value></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="purpose">
                    <el-select v-model="questionForm.purpose" placeholder="请选择题目的用途" clearable style="width:100%" @change="questionPurposeChanged">
                        <el-option v-for="(item,index) in questionsPurpose" :key=index :label=item.name :value=item.value></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="name">
                    <el-input v-model="questionForm.name" placeholder="题目名称（如果是填空题，请以‘_'代表一个空）" />
                </el-form-item>
            </el-form>
            <el-container v-if='questionItemsShow'>
                <el-header>添加选项</el-header>
                <el-main>
                    <el-form :rules="rules" ref="questionItems" :model="questionItems" status-icon label-width="50px">
                        <el-form-item v-for="(item, index) in questionItems.items" 
                        :key='item.key + index' :label="letters[index]" :prop="'items.' + index + '.title'" 
                        :rules="{required:true, message:'选项不能为空', trigger:'blur'}">
                        <el-row>
                            <el-col :span=20>
                                <el-input v-model="item.title"></el-input>
                            </el-col>
                            <el-col :span=4>
                                <el-button @click.prevent="removeItem(item)" type="primary" icon="el-icon-delete" style="margin-left:20px"></el-button>
                            </el-col>
                        </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary"  @click="addQuestionItem">添加选项</el-button>
                        </el-form-item>
                    </el-form>
                </el-main>
            </el-container>   
            <el-form :rules="rules" ref="questionForm" :model="questionForm" status-icon v-show="questionAnswerShow">
                <el-form-item prop="questionAnswer">
                    <el-input type="textarea" :rows="6" v-model="questionForm.questionAnswer" :placeholder="questionDefaultContent"></el-input>
                </el-form-item>
            </el-form>
            <template v-slot:footer>
                <span class="dialog-footer">
                <el-button @click="adddialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitQuestion">确 定</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog :title="title" :visible.sync="detaildialogVisible" width="50%">
            <div>
                <h3>{{questionForm.name}}</h3>
                <el-divider></el-divider>
            </div>
            <el-form v-if="questionForm.type == 1" disabled>
                <el-radio-group v-model="radioItems">
                    <el-form-item v-for="(item, index) in questionItems.items" :key="index" style="margin-bottom:0px">
                        <label style="margin-right:10px">{{letters[item.orderNo]}}</label>
                        <el-radio :label=letters[item.orderNo]>{{item.title}}</el-radio>
                    </el-form-item>
                </el-radio-group>
            </el-form>
            <el-form v-else-if="questionForm.type == 2" disabled>
                <el-checkbox-group v-model="radioItems">
                    <el-form-item v-for="(item, index) in questionItems.items" :key="index" style="margin-bottom:0px">
                        <label style="margin-right:10px">{{letters[item.orderNo]}}</label>
                        <el-checkbox :label=letters[item.orderNo]>{{item.title}}</el-checkbox>
                    </el-form-item>
                </el-checkbox-group>
            </el-form>
            <div v-else-if="questionForm.type == 3">
                <el-radio-group v-model="radioItems" disabled>
                        <el-radio v-for="(item, index) in questionItems.items" :key=index :label=item.title>{{item.title}}</el-radio>
                </el-radio-group>
            </div>
            <div v-else>
                <span>{{questionForm.questionAnswer}}</span>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import tableTemplateVue from '../common/tableTemplate.vue'
import paginationTemplateVue from '../common/paginationTemplate.vue';
import dateTemplateVue from '../common/dateTemplate.vue';


export default {
    name: "departmentQuestions",
    components:{
        'v-table':tableTemplateVue, 
        'v-pagination':paginationTemplateVue, 
        'v-date':dateTemplateVue
    },
    data () {
        return {
            cols:[{
                name:"title",
                label:"题目",
                ifshow:true,
                clickFunc: (row) => {
                    this.displayQuestionItem(row);
                }
            },
            {
                name:"department",
                label:"部门",
                width:"180"
            },
            {
                name:"type",
                label:"类型",
                width:"180"
            },
            {
                name:"purpose",
                label:"用途",
                width:"180"
            },
            {
                name:"date",
                label:"日期",
                width:"180"
            }],
            lastCol:{
                ifshow: true,
                operates:[{
                    name:"编辑",
                    type:"primary",
                    clickFunc: (index, row) => {
                        this.updateQuestionItem(index, row);
                    }
                },
                {
                    name:"删除",
                    type:"primary",
                    clickFunc: (index, row) => {
                        this.deleteQuestionItem(index, row);
                    }
                }]
            },
            tableData: [],
            total: 0,
            page: 1,
            pageSize: 50,
            questionsType: [{
                name:"单选题",
                value:"1"
            },
            {
                name:"多选题",
                value:"2"
            },
            {
                name:"判断题",
                value:"3"
            },
            {
                name:"填空题",
                value:"4"
            },
            {
                name:"问答题",
                value:"5"
            }],
            questionsPurpose:[{
                name:"考试",
                value:"0"
            },
            {
                name:"调研",
                value:"1"
            }],
            rules: {
                questionName: [{required: true,message: '请输入题目名称',trigger: ['blur', 'change']}],
                questionsType:[{required: true,message: '请选择题目的类型',trigger: 'change'}],
                questionsPurpose:[{required: true,message: '请选择题目的用途',trigger: 'change'}]
            },
            detail: '',
            title: '添加题目',
            adddialogVisible: false,
            detaildialogVisible: false,
            questionForm: {
                name: '',
                type: '',
                purpose: '',
                id: '',
                user: {
                    id: ''
                },
                questionAnswer: ''
            },
            questionDefaultContent:"请输入问题的答案！\n单选题：直接输入选项，如：A。\n多选题：答案以‘;’分割，如A;B。\n判断题：答案以1或0表示，1：正确，0：错误。\n填空题：多个空之间以‘;’分割，如xxx;xxx。\n问答题：直接输入答案。",
            questionItems: {
                items:[]
            },
            letters:"ABCDEFGHIGKLMNOPQRSTUVWXYZ",
            questionItemsShow:false,
            questionAnswerShow:true,
            user: { id: JSON.parse(localStorage.getItem('data')).id, name: JSON.parse(localStorage.getItem('data')).userName },
            radioItems: ''
        }
    },
    created(){
        this.getQuestions()
        // this.passAddForm.user.id = JSON.parse(localStorage.getItem('data')).id
        // let aa = this.$hbteApi.nowTime()
        // console.log(aa)
        // this.passAddForm.dateTime = `${aa.nowYear}-${aa.nowMonth}-${aa.nowDate}`
    },
    methods: {
        addQuestions(){
            this.title = "添加题目";
            this.questionForm.name = '';
            this.questionForm.type = '';
            this.questionForm.purpose = '';
            this.questionItems.items = [];
            this.questionForm.questionAnswer = ''

            this.questionItemsShow = false;
            this.questionAnswerShow = true;
            
            this.adddialogVisible = true
        },
        displayQuestionItem(row){
            this.detaildialogVisible = true;

            this.title = row.purpose + ":" + row.type; 
            this.questionForm.name = row.title;
            
            this.radioItems = row.result;
            this.questionForm.type = row.typeIndex;

            this.questionItems.items = [];
            for (var i in row.items){
                this.questionItems.items.push({
                    key: new Date(),
                    title: row.items[i].title,
                    orderNo: row.items[i].orderNo
                });
            }

            if (this.questionForm.type == 1){
                this.radioItems = row.result;
                console.log(this.radioItems)
            }
            else if (this.questionForm.type == 2){
                this.radioItems = row.result.split(";");
            }
            else if (this.questionForm.type == 3){
                this.questionItems.items = [{title:'正确'},{title:'错误'}]
                this.radioItems = (row.result == 1 ? '正确' : '错误');
            }
            else {
                this.questionForm.questionAnswer = row.result;
            }
        },
        async submitQuestion(){
            this.adddialogVisible = false;
            var tmp = [];
            for (var i in this.questionItems.items){
                tmp.push({
                    title: this.questionItems.items[i].title,
                    orderNo: i
                });
            }
            var tmp = {
                id: this.id,
                user:{id: this.user.id},
                type: this.questionForm.purpose,
                itemType:this.questionForm.type,
                title: this.questionForm.name,
                status: 1,
                examOptions: tmp,
                result:this.questionForm.questionAnswer
            };
            var func = (this.title == '添加题目' ? this.$http.addExamQuestion : this.$http.updateExamQuestion);
            await func(tmp);
            
            this.getQuestions();
        },
        questionPurposeChanged(val){
            if (val == 0){
                this.questionAnswerShow = true;
            }
            else {
                this.questionAnswerShow = false;
            }
        },
        questionTypeChanged(val){
            console.log("type: " + val + " : " + this.questionForm.type)
            if (val == 1 || val == 2){
                this.questionItemsShow = true;
                this.questionItems.items = [];
                for (var i = 0; i < 4; i++){
                    this.addQuestionItem();
                }
            }
            else {
                this.questionItemsShow = false;
            }
        },
        removeItem(item){
            var index = this.questionItems.items.indexOf(item);
            if (index !== -1){
                this.questionItems.items.splice(index, 1);
            }
        },
        addQuestionItem(){
            this.questionItems.items.push({
                key: new Date(),
                title: ''
            });
        },
        async deleteQuestionItem(index, row){
            await this.$http.deleteExamQuestion({id: row.id});
            this.getQuestions();
        },
        updateQuestionItem(index, row){
            this.title = "修改题目";
            this.questionForm.name = row.title;
            this.questionForm.type = "" + row.typeIndex;
            this.questionForm.purpose = row.purposeIndex;
            this.questionPurposeChanged(this.questionForm.purpose);
            this.questionTypeChanged(this.questionForm.type);

            this.id = row.id;

            this.questionForm.questionAnswer = row.result;
            this.questionItems.items = [];
            for (var i in row.items){
                this.questionItems.items.push({
                    key: new Date(),
                    title: row.items[i].title,
                    orderNo: row.items[i].title
                });
            }
            
            this.adddialogVisible = true
        },
        searchTime(startTime, endTime){
            this.getQuestions(startTime, endTime);
        },
        pageSizeChanged(page, pageSize){

        },
        async getQuestions(startTime, endTime){
            const res = await this.$http.getExamQuestions({userId: this.user.id, page: this.page, pageSize: this.pageSize, startTime: startTime, endTime: endTime})
            this.tableData = [];
            for (var obj of res.result){
                console.log("obj: " + obj);
                this.tableData.push({
                    id: obj.id,
                    title: obj.title,
                    department: obj.department.name,
                    purpose: obj.type == 1 ? '调研' : '考试',
                    purposeIndex: "" + obj.type,
                    type: this.questionsType[obj.itemType - 1].name,
                    typeIndex: "" + obj.itemType,
                    date: obj.createTime,
                    items:obj.examOptions,
                    result:obj.result 
                });
            }
            this.total = res.count;
        }
    }
}
</script>

<style>
  .el-dialog .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-dialog .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .el-main .el-form-item{
      text-align: left;
  }
  
  .el-dialog .el-container {
    margin-bottom: 20px;
  }

  .el-dialog__footer {
    margin-top: -40px;
  }
  
</style>
