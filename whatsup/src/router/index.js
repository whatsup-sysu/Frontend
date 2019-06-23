import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'
import MainPage from '@/components/MainPage/MainPage'
import Login from '@/components/Login/Login'
import Register from '@/components/Register/Register'
import RegisterSuccess from'@/components/Register/RegisterSuccess'
import CreateTask from '@/components/CreateTask/CreateTask'
import TaskDetail from '@/components/TaskDetail/TaskDetail'
import Information from '@/components/Information/Information'
import SurveyCreator from '@/components/Survey/CreatorMain'
import SurveyViewer from '@/components/Survey/ViewerMain'
import Survey from '@/components/Survey/SurveyViewer'
import Topup from '@/components/Topup/Topup'
import userPhoto from '@/components/Photo/userPhoto'
Vue.use(Router)
Vue.use(VueCookies)
var router = new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: { notNeedAuth: true }
    },

    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta: { notNeedAuth: true }
    },

    {
      path: '/RegisterSuccess',
      name: 'RegisterSuccess',
      component: RegisterSuccess
    },

    {
      path: '/Information',
      name: 'Information',
      component: Information
    },

    {
      path: '/CreateTask',
      name: 'CreateTask',
      component: CreateTask
    },
    {
      path: '/TaskDetail',
      name: 'TaskDetail',
      component: TaskDetail
    },

    {
      path: '/CreateSurvey',
      name: 'SurveyCreator',
      component: SurveyCreator
    },
    {
      path: '/ViewSurvey',
      name: 'SurveyViewer',
      component: SurveyViewer
    },
    {
      path: '/Survey',
      name: 'Survey',
      component: Survey
    },
    {
      path: '/Topup',
      name: 'Topup',
      component: Topup
    },
    {
      path: '/UploadUserPhoto',
      name: 'UploadUserPhoto',
      component: userPhoto
    },
  ]
})

router.beforeEach((to, from, next) => {

  	var url = "/api/users/checkStatus";
  	//var url= "http://127.0.0.1:3000/users/login"
  	//检查登录状态
  	Vue.http.get(url).then(function(res){
		Vue.cookies.set("id", res.body.id);

		//跳转回主页面
   		if (to.matched.some(record => record.meta.notNeedAuth)) {
   			next({name: 'MainPage',})
   		}
   		//跳转
   		else {
   			next()
   		}
  	},function(res){
  		//无登录状态
   		if (res.status == '400') {
   		   if (Vue.cookies.isKey("id")) {
   		   		Vue.cookies.remove("id")
   		   }
   		}
   		next()
 	});

})

export default router