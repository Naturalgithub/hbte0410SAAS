import en from '../i18n/lang/en'
import Vue from 'vue'
import Router from 'vue-router'
// import CommerViews from '@/views/commerViews'
import Login from '@/views/login/index'
import Layout from '@/views/layout/layout'
import HomeMain from '@/views/index/mainIndex'
// import NewIndex2 from '@/views/newindex/NewIndex2'
// import NewIndex2 from '@/views/newindex/NewIndex2.vue'

// 不是必须加载的组件使用懒加载
const Icon = () => import('@/views/icon/index')
const IndexTwo = () => import('@/views/icon/IndexTwo')
const IndexThree = () => import('@/views/icon/IndexThree')

// const Upload = () => import('@/views/upload/upload')

const NotFound = () => import('@/page404')
const AddArticle = () => import('@/views/article/addArticle')
// 收支系统

// const AddArticleEditor = () => import('@/views/monesystem/moneysystem/InOutWrite')
const InOutWrite = () => import('@/views/monesystem/moneysystem/InOutWrite')
const InOutAddWrite = () => import('@/views/monesystem/moneysystem/InOutAddWrite')
const InOutQuery = () => import('@/views/monesystem/moneysystem/InOutQuery')
const ApplyWrite = () => import('@/views/monesystem/moneysystem/ApplyWrite')
const PLine = () => import('@/views/monesystem/moneysystem/PLinee')
const InOutManagement = () => import('@/views/monesystem/moneysystem/InOutManagement')

// 系统设置
const MoneyManagement = () => import('@/views/monesystem/system/MoneyManagement')
const AccountingItem = () => import('@/views/monesystem/system/AccountingItem')
// const aemtest = () => import('@/views/monesystem/system/aemtest')
const AitemLine = () => import('@/views/monesystem/system/AitemLine')
const BankManagement = () => import('@/views/monesystem/system/BankManagement')
const CompanyInfo = () => import('@/views/monesystem/system/CompanyInfo')
const CustomerManagement = () => import('@/views/monesystem/system/CustomerManagement')
const DepartmentInfo = () => import('@/views/monesystem/system/DepartmentInfo')
const SupplierManage = () => import('@/views/monesystem/system/SupplierManage')
const ItemInfo = () => import('@/views/monesystem/system/ItemInfo')
// const ItemLine = () => import('@/views/monesystem/system/ItemLine')
const PayPal = () => import('@/views/monesystem/system/PayPal')
// const TypeList = () => import('@/views/monesystem/system/TypeList')
const BudgetManagement = () => import('@/views/monesystem/system/BudgetManagement')

// 审批管理
const ApplicationList = () => import('@/views/monesystem/allow/ApplicationList')
const ToDoList = () => import('@/views/monesystem/allow/ToDoList')

const LoginDate = () => import('@/views/logindate/LoginDate')
// const LoginDateTwo = () => import('@/views/logindate/LoginDateTwo')

// const NavClassify = () => import('@/views/syssetting/navClassify')
// const pagePermissions = () => import('@/views/permissions/pagePermissions')
// const btnPermissions = () => import('@/views/permissions/btnPermissions')
// 工艺管理
const Project = () => import('@/views/processsystem/projectmanagement/project')

// 软件管理
const upDownMange = () => import('@/views/softwaremanage/softList/upDownMange')
const ProductManage = () => import('@/views/softwaremanage/softList/ProductManage')
const History = () => import('@/views/softwaremanage/softList/History')
const ProjectManage = () => import('@/views/softwaremanage/softList/ProjectManage')

// 论坛管理
const forumIndex = () => import('@/views/forum/forumIndex')
const postForum = () => import('@/views/forum/postForum')

// 晨会管理
const morningMeetingList = () => import('@/views/morningMeeting/morningMeetingList')

const examPaperHome = () => import('@/views/examSystem/examPaperHome')
const departmentPapers = () => import('@/views/examSystem/departmentPapers')
const departmentQuestions = () => import('@/views/examSystem/departmentQuestions')

Vue.use(Router)
let routeNmae = en.routeNmae
let defaultRouter = [

  {
    path: '/',
    redirect: '/index',
    hidden: true,
    children: []
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    hidden: true,
    children: []
  },
  {
    path: '/index',
    iconCls: 'fa fa-dashboard', // 图标样式class
    name: routeNmae.home,
    component: Layout,
    alone: true,
    children: [
      {
        path: '/index',
        iconCls: 'fa fa-dashboard', // 图标样式class
        name: '主页',
        component: HomeMain,
        children: []
      }
    ]
  },
  {
    path: '/404',
    component: NotFound,
    name: '404',
    hidden: true,
    children: []
  }
]

let addRouter = [
  {
    path: '/',
    iconCls: 'el-icon-tickets', // 图标样式class
    name: routeNmae.article,
    meta: { role: ['superAdmin', 'admin'] },
    component: Layout,
    children: [
      {
        path: '/addArticle',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.publishArticle,
        component: AddArticle,
        children: []
      },
      {
        path: '/InOutAddWrite',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.InOutAddWrite,
        component: InOutAddWrite,
        children: []
      },

      {
        path: '/InOutQuery',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.InOutQuery,
        component: InOutQuery,
        children: []
      },
      // 货币管理
      {
        path: '/MoneyManagement',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.MoneyManagement,
        component: MoneyManagement,
        children: []
      },
      {
        path: '/CustomerManagement',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.CustomerManagement,
        component: CustomerManagement,
        children: []
      },
      {
        path: '/BankManagement',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.BankManagement,
        component: BankManagement,
        children: []
      },
      {
        path: '/AitemLine',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.AitemLine,
        component: AitemLine,
        children: []
      },
      {
        path: '/SupplierManage',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.GongYingShang,
        component: SupplierManage,
        children: []
      },
      {
        path: '/CompanyInfo',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.CompanyInfo,
        component: CompanyInfo,
        children: []
      },
      {
        path: '/ItemInfo',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.ItemInfo,
        component: ItemInfo,
        children: []
      },
      {
        path: '/AccountingItem',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.AccountingItem,
        component: AccountingItem,
        children: []
      },
      {
        path: '/PayPal',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.PayPal,
        component: PayPal,
        children: []
      },
      {
        path: '/BudgetManagement',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.BudgetManagement,
        component: BudgetManagement,
        children: []
      },
      {
        path: '/DepartmentInfo',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.DepartmentInfo,
        component: DepartmentInfo,
        children: []
      },
      // 收支系统
      {
        path: '/InOutWrite',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.InOutWrite,
        component: InOutWrite,
        children: []
      },
      {
        path: '/ApplyWrite',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.ApplyWrite,
        component: ApplyWrite,
        children: []
      },
      {
        path: '/PLine',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.PLine,
        component: PLine,
        children: []
      },
      {
        path: '/InOutManagement',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.InOutManagement,
        component: InOutManagement,
        children: []
      },
      // 审批管理
      {
        path: '/ApplicationList',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.ApplicationList,
        component: ApplicationList,
        children: []
      },
      {
        path: '/ToDoList',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: routeNmae.ToDoList,
        component: ToDoList,
        children: []
      }
    ]
  },
  {
    path: '/',
    iconCls: 'fa fa-exchange', // 图标样式class
    name: routeNmae.shuttleBox,
    meta: { role: ['superAdmin'] },
    component: Layout,
    children: [
      {
        path: '/LoginDate',
        iconCls: 'fa fa-sign-in', // 图标样式class
        name: routeNmae.demoShuttle,
        component: LoginDate,
        children: []
      }
    ]
  },
  // 图标管理
  {
    path: '/',
    iconCls: 'fa fa-paw', // 图标样式class
    name: routeNmae.icon,
    meta: { role: ['superAdmin'] },
    component: Layout,
    children: [
      {
        path: '/IndexTwo',
        iconCls: 'fa fa-life-ring', // 图标样式class
        name: routeNmae.mokuai,
        component: IndexTwo,
        children: []
      },
      {
        path: '/icon',
        iconCls: 'fa fa-life-ring', // 图标样式class
        name: routeNmae.builtInIcon,
        component: Icon,
        children: []
      },
      {
        path: '/IndexThree',
        iconCls: 'fa fa-life-ring', // 图标样式class
        name: routeNmae.zhuyeguanli,
        component: IndexThree,
        children: []
      },
      // 工艺管理
      {
        path: '/Project',
        iconCls: 'fa fa-life-ring', // 图标样式class
        name: routeNmae.Project,
        component: Project,
        children: []
      },
      // 软件管理
      {
        path: '/upDownMange',
        iconCls: 'fa fa-life-ring', // 图标样式class
        name: routeNmae.upDownMange,
        component: upDownMange,
        children: []
      },
      {
        path: '/ProductManage',
        iconCls: 'fa fa-life-ring', // 图标样式class
        name: routeNmae.ProductManage,
        component: ProductManage,
        children: []
      },
      {
        path: '/History',
        iconCls: 'fa fa-life-ring', // 图标样式class
        name: routeNmae.History,
        component: History,
        children: []
      },
      {
        path: '/ProjectManage',
        iconCls: 'fa fa-life-ring', // 图标样式class
        name: routeNmae.ProjectManage,
        component: ProjectManage,
        children: []
      },
      {
        path: '/forumIndex',
        iconCls: 'fa fa-life-ring', // 图标样式class
        name: routeNmae.forumIndex,
        component: forumIndex,
        children: []
      },
      {
        path: '/postForum',
        iconCls: 'fa fa-life-ring', // 图标样式class
        name: routeNmae.postForum,
        component: postForum,
        children: []
      },
      // 晨会管理
      {
        path: '/morningMeetingList',
        iconCls: 'fa fa-life-ring', // 图标样式class
        name: routeNmae.morningMeetingList,
        component: morningMeetingList,
        children: []
      },
      {
        path: '/examPaperHome',
        iconCls: 'fa fa-life-ring',
        name: routeNmae.examPaperHome,
        component: examPaperHome,
        children: []
      },
      {
        path: '/departmentPapers',
        iconCls: 'fa fa-life-ring',
        name: routeNmae.departmentPapers,
        component: departmentPapers,
        children: []
      },
      {
        path: '/departmentQuestions',
        iconCls: 'fa fa-life-ring',
        name: routeNmae.departmentQuestions,
        component: departmentQuestions,
        children: []
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
    children: []
  }

]

export default new Router({
  routes: defaultRouter
})
export { defaultRouter, addRouter }
