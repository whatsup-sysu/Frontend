<template>
	<div >
		<h1>创建任务</h1>
		<div style="width: 640px; margin: 0 auto;"  >
			<el-steps :active="createStep" style="text-align: left">
				<el-step title="填写任务基本信息"></el-step>
				<el-step title="填写任务或问卷的内容"></el-step>
				<el-step title="完成"></el-step>
			</el-steps>
			<v-CreateTaskBasicInfo ref="CreateTaskBasicInfo" v-show="createStep==1"></v-CreateTaskBasicInfo>
			<v-CreateTaskContent ref="CreateTaskContent" v-show="createStep==2&&this.$refs.CreateTaskBasicInfo.basicInfo.taskType=='其他'">
			</v-CreateTaskContent>
		</div>
		<v-CreatorMain ref="survey" v-show="createStep==2&&this.$refs.CreateTaskBasicInfo.basicInfo.taskType=='问卷'" >
		</v-CreatorMain>
		<el-button style="margin-top: 12px;" v-if="createStep > 1" @click="toLastStep">上一步</el-button>
		<el-button style="margin-top: 12px;" @click="checkNextStep">下一步</el-button>
		<router-link :to="{path:'/'}">
			<el-button>返回</el-button>
		</router-link>
	</div>
</template>

<script>
import CreatorMain from '../Survey/CreatorMain.vue'
import CreateTaskBasicInfo from './CreateTaskBasicInfo.vue'
import CreateTaskContent from './CreateTaskContent.vue'
export default {
	components: {
		"v-CreatorMain":CreatorMain,
		"v-CreateTaskBasicInfo":CreateTaskBasicInfo,
		"v-CreateTaskContent":CreateTaskContent
	},

	data() {
	  return {
			userId:'',
			createStep:1

		}
	},
	mounted: function () {
		
		if(this.$cookies.get('id') ){
			this.userId = this.$cookies.get('id')
		}
		else{
			
			this.$router.push({path:'/'});
			
		}

	},

	methods: {
		//格式化Date
		getFormatDateTime: function(date){
			const year = date.getFullYear()
			const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
			const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
			const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
			const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
			const sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

			return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec
		},
		toLastStep(){
			this.createStep --
		},
		checkNextStep(){

			switch (this.createStep) {
				//检查是否能跳转到创建任务的下一步
				case 1:
					if(this.$refs.CreateTaskBasicInfo.checkBasicInfoValid()){
						this.createStep ++
					}
					else{
						this.$message.warning('信息尚未填写正确')
					}
					break;
				case 2:
					if(this.$refs.CreateTaskContent.checkTaskContentValid()){
						this.createStep ++
						this.sendForm()
					}
					else{
						this.$message.warning('信息尚未填写正确')
					}
					break
				default:

			}
		},

		sendForm: function(){
			var starttime = this.getFormatDateTime(this.$refs.CreateTaskBasicInfo.$refs.taskTime.value[0])
			var endtime = this.getFormatDateTime(this.$refs.CreateTaskBasicInfo.$refs.taskTime.value[1])
			var requestForm = {
				title: this.$refs.CreateTaskBasicInfo.basicInfo.taskName,
				introduction: this.$refs.CreateTaskBasicInfo.basicInfo.introduction,
				accepters: this.$refs.CreateTaskBasicInfo.basicInfo.paticipantNum,
				starttime: starttime,
				endtime: endtime,
				money: this.$refs.CreateTaskBasicInfo.basicInfo.taskWage,
				type: this.$refs.CreateTaskBasicInfo.basicInfo.taskType,
			}

			if(requestForm['type'] == '问卷'){
				this.$refs.survey.$refs.survey_creator.surveyCreator.saveSurveyFunc()
				requestForm['content'] = this.$refs.survey.$refs.survey_creator.content
			}
			else if(requestForm['type'] == '其他'){
				requestForm['content'] = this.$refs.CreateTaskContent.taskContent.content
			}

			this.$http.post('/api/duties/create',requestForm).then(function(response){
				this.$message.success('创建成功');
				this.$router.push({path:'/'});
			}, function(response){
				this.createStep = 1
				this.$message.error(response.body.msg);
				
			});
		},

	}
}
</script>
