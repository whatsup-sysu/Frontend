<template>
	<div>
		<el-menu :default-active="checkStatus"
		  class="el-menu-demo"
		  mode="horizontal"
		  background-color="#545c64"
		  text-color="#fff"
		  active-text-color="#ffd04b"
			@select="handleSelect">
		  <el-menu-item index="checkInfo">任务信息</el-menu-item>
			<el-menu-item index="checkContent">任务内容</el-menu-item>
		</el-menu>
		<el-row>
		  <el-col :span="12":offset="6" >
				<v-TaskBasicInfo :initPage="initPage" v-show="checkStatus=='checkInfo' " ref='TaskBasicInfo'>
				</v-TaskBasicInfo>

				<v-TaskContent v-show="checkStatus=='checkContent' && duty.type=='其他' " ref='TaskContent'>
				</v-TaskContent>

				<div v-if="duty.type=='问卷'">
					<div v-show="checkStatus=='checkContent'">
						<div v-if="checkUser!=''" >
							{{checkUser}}的问卷
						</div>
						<v-SurveyViewer :writable='surveyWritable'
							:initPage='initPage'
							:taskId='dutyId'
							v-if="loadSurvey"
							ref='SurveyViewer'>
						</v-SurveyViewer>
					</div>
				</div>
				<div v-show="checkStatus=='checkInfo'">
					<el-button type="primary" @click="participate" v-if="userStatus=='未参加' ">
						我要参加
					</el-button>
					<el-button type="primary" @click="confirm" v-if="userStatus=='已参加' && duty.type=='其他' ">
						确认完成任务
					</el-button>

					<router-link :to="{path:'/'}" >
						<el-button type="primary">返回</el-button>
					</router-link>
				</div>

			</el-col>
			<el-col :span="6">
				<v-TaskPaticipantInfo :taskId="dutyId"
					:taskType="duty.type"
					:finishUsers="finishUsers"
					:doneUsers="doneUsers"
					:unDoneUsers="unDoneUsers"
					:initPage="initPage"
					:checkSurvey="checkSurvey"
					ref='TaskPaticipantInfo'
					v-if="userId==duty.sponsor">
				</v-TaskPaticipantInfo>
			</el-col>
		</el-row>
	</div>
</template>


<script>
	import TaskBasicInfo from './TaskBasicInfo.vue'
	import TaskPaticipantInfo from './TaskPaticipantInfo.vue'
	import TaskContent from './TaskContent.vue'
	import SurveyViewer from '../Survey/SurveyViewer'
	export default {
	components: {
		"v-TaskBasicInfo":TaskBasicInfo,
		"v-TaskPaticipantInfo":TaskPaticipantInfo,
		"v-TaskContent":TaskContent,
		'v-SurveyViewer': SurveyViewer
	},

  data() {
    return {
			checkStatus:'checkInfo',
			userId:'',
			dutyId:'',
			duty:{
				type:''
			},
			unDoneUsers: [],
			doneUsers: [],
			finishUsers: [],
			userStatus:'',
			surveyWritable:false,
			checkUser:'',
			loadSurvey:true
    };
  },

	created: function () {
		if(!this.$route.params.dutyid){
			this.$router.push({path:'/'});
		}
		this.dutyId = this.$route.params.dutyid
		this.initPage()

	},

  methods: {
		handleSelect(key, keyPath) {
			this.checkStatus = key
    },

		initPage(){
			this.unDoneUsers=[]
			this.doneUsers=[]
			this.finishUsers=[]
			this.checkStatus = 'checkInfo'
			//有用户登陆
			if(this.$cookies.get('id') ){
				this.userId = this.$cookies.get('id')
			}
			//获取活动
			this.$http.get('/api/duties/duty/'+this.$route.params.dutyid).then(function(response){
				this.duty = response.body
				var task =  {
					id: this.duty.id,
					taskName:this.duty.title,
					introduction:this.duty.introduction,
					taskType:this.duty.type,
					creater:this.duty.sponsor,
					startTime:this.duty.startTime,
					endTime:this.duty.endTime,
					taskContent:this.duty.content,
					paticipantNum:this.duty.maxAccepters-this.duty.curAccepters,
					taskWage:this.duty.money
				}
				//给子组件传参
				this.$route.params.surveyData = task.taskContent
				this.$refs.TaskBasicInfo.task = task
				this.$refs.TaskContent.task = task

				//初步判断用户的状态
				if(this.$cookies.get('id') ){
					if(this.userId == this.duty.sponsor){
						this.userStatus = '发布者'
					}
					else{
						this.checkUser = this.userId
						this.userStatus  = '未参加'
					}
				}
				else{
					this.userStatus  = '无'
				}
				//处理参加者的信息以及用户的状态
				for( let taskAccepter of this.duty.accepters){
					if(taskAccepter.status=='accepted'){
						this.unDoneUsers.push(taskAccepter.uid)
						if(taskAccepter.uid == this.userId ){
							this.userStatus = '已参加'
							this.surveyWritable = true
						}
					}
					else if(taskAccepter.status=='done'){
						this.doneUsers.push(taskAccepter.uid)
						if(taskAccepter.uid == this.userId ){
							this.userStatus = '已完成'
							this.checkSurvey(this.userId)
						}
					}
					else if(taskAccepter.status=='finish'){
						this.finishUsers.push(taskAccepter.uid)
						if(taskAccepter.uid == this.userId ){
							this.userStatus = '已结束'
							this.checkSurvey(this.userId)
						}
					}

				}
				this.$refs.TaskBasicInfo.userStatus = this.userStatus

			}, function(response){
				console.log(response.body)
				alert('error')
			});
		},


		participate(){
			//检查是否能参加

			if(this.duty.maxAccepters==this.duty.curAccepters){
				alert('参加人数已满')
				return
			}
			else {
				var sDate = new Date(this.duty.startTime)
				var eDate = new Date(this.duty.endTime)
				var nDate = new Date()
				if(nDate < sDate){
					alert('活动还没开始')
					return
				}
				else if(nDate > eDate){
					alert('活动已经结束')
					return
				}
			}


			var takeForm = {did: this.duty.id}
			this.$http.post('/api/duties/take', takeForm).then(function(response){
				console.log(response.body)
				this.initPage()
				var successMsg = ''
				if(this.duty.type == '其他'){
					successMsg = '报名成功，完成任务后请点击确认按钮确认完成'
				}
				else if(this.duty.type == '问卷'){
					successMsg = '报名成功，请完成问卷'
				}

				alert(successMsg)
				//重载问卷并跳转到问卷
				this.surveyWritable = true
				this.loadSurvey = false
				this.$nextTick(()=>{
					this.loadSurvey = true
					this.checkStatus = 'checkContent'
				})
			}, function(response){
				alert(response.body)
			});
		},

		confirm(){
			var commitForm = {did: this.duty.id}
			this.$http.post('/api/duties/commit', commitForm).then(function(response){
				console.log(response.body)
				this.initPage()
				alert('确认完成任务成功')
			}, function(response){
				alert(response.body)
			});
		},
		//dangerous todo
		checkSurvey(checkUser, isSkip=false){
			var checkQuery = {did: this.dutyId}
			this.$http.get('/api/survey/data', {params:checkQuery} ).then(function(response){
				var answers = response.body.data
				for(let answer of answers){
					if(answer.uid == checkUser){
							this.$refs.SurveyViewer.model.data = JSON.parse(answer.scontent)
							this.checkUser = checkUser
							if(isSkip){
								this.checkStatus = 'checkContent'
							}
					}
				}
			}, function(response){
				alert(response.body)
			});
		}

	}
}
</script>
