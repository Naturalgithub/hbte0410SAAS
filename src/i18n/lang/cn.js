/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/12/8
 * Description: 文件描述
 */
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const cn = {
  routeNmae: {
    departmentPapers: '部门试卷',
    departmentQuestions: '部门题库',
    examPaperHome: '我的试卷',
    // 晨会管理
    morningMeetingList: '晨会Fika',
    // 论坛管理
    forumIndex: 'QA首页',
    postForum: '我的QA',
    // 软件管理
    ProjectManage: '项目管理',
    upDownMange: '软件管理',
    ProductManage: '产品管理',
    History: '历史记录',
    // 工艺管理：
    // 生产管理
    Project: '项目',
    // ===========
    DaYinBiaoGuanLi: '打印表管理',
    home: '主页',
    article: '权限管理',
    publishArticle: '用户管理',
    publishArticleEditor: '角色管理',
    icon: '系统设置',
    mokuai: '模块管理',
    // 收支系统
    InOutAddWrite: '付款录入',
    ApplyWrite: '报销录入',
    InOutQuery: '收支单据查询',
    InOutWrite: '收款录入',
    PLine: '产品线收支表',
    InOutManagement: '部门收支汇总',
    // 系统设置
    BudgetManagement: '预算管理',
    MoneyManagement: '货币管理',
    AccountingItem: '会计科目管理',
    AitemLine: '产品线管理',
    BankManagement: '银行管理',
    CompanyInfo: '公司信息管理',
    CustomerManagement: '客户管理',
    DepartmentInfo: '部门信息管理',
    GongYingShang: '供应商管理',
    ItemInfo: '项目信息',
    PayPal: '收款信息管理',
    // 审批管理
    ApplicationList: '申请列表',
    ToDoList: '待办列表',
    zhuyeguanli: '主页管理',
    builtInIcon: '应用管理',
    tubiaoer: '登录日志二',
    shuttleBox: '日志管理',
    demoShuttle: '登录日志',
    permissions: '权限管理',
    pageControl: '页面权限',
    btnControl: '按钮权限',
    table: '表格',
    multiDataTable: '多选数据表格',
    filterTable: '筛选表格',
    dragSort: '拖拽排序',
    upload: '上传',
    fileUpload: '文件上传',
    editor: '编辑器',
    markdown: 'markdown',
    wangeditor: 'wangeditor',
    multiDirectory: '多级目录',
    'menu2-1': '二级-1',
    'menu2-2': '二级-2',
    'menu2-3': '二级-3',
    'menu3-1': '三级-1',
    'menu3-2': '三级-2',
    'menu3-3': '三级-3',
    'menu4-1': '四级-1',
    'menu4-2': '四级-2',
    'menu5-1': '五级-1',
    systemSettings: '系统设置',
    navMenu: '导航菜单'
  },
  rightMenu: {
    close: '关闭',
    closeOther: '关闭其他',
    closeAll: '全部关闭'
  },
  role: {
    superAdmin: '超级管理员',
    admin: '管理员',
    ordinary: '普通用户'
  },
  userDropdownMenu: {
    basicInfor: '基本资料',
    changePassword: '修改密码',
    logout: '退出'
  },

  ...zhLocale //  合并element-ui内置翻译
}

export default cn
