<template>
	<div style="margin: 15px 15px;height:800px;" >

		<el-collapse>
			<el-collapse-item title="结束活动的用户" name="1" >
				<el-row style="text-align:center" v-for="user in finishUsers":key="user">
					<el-col :span="16" >
						<span style="line-height:40px"> {{user}} </span>
					</el-col>
					<el-col :span="8">
						<el-button type="primary" v-if="taskType=='问卷'" @click="checkSurvey(user,true)" >
							查看问卷
						</el-button>
					</el-col>
				</el-row>
			</el-collapse-item>

			<el-collapse-item title="完成活动的用户" name="2">
				<el-checkbox-group v-model="newFinishUsers" v-for="user in doneUsers":key="user" >
					<el-col :span="16" >
						<el-checkbox  :label="user" >
							{{user}}
						</el-checkbox>
					</el-col>
					<el-col :span="8">
						<el-button type="primary" v-if="taskType=='问卷'" @click="checkSurvey(user,true)" >
							查看问卷
						</el-button>
					</el-col>
				</el-checkbox-group>
				<el-button type="primary" @click="submitNewDoneUser" >
					提交新的活动完成用户
				</el-button>
			</el-collapse-item>

			<el-collapse-item title="未完成活动的用户" name="3" >
				<div style="text-align:center" v-for="user in unDoneUsers":key="user">
					{{user}}
				</div>
			</el-collapse-item>

		</el-collapse>
	</div>
</template>

<script>

  export default {
		props:['taskId','taskType','unDoneUsers','doneUsers','finishUsers','initPage','checkSurvey'],
    data() {
      return {
        newFinishUsers:[],
      };
    },

    methods: {
			submitNewDoneUser(){
				if(this.newFinishUsers.length != 0){
					var confirmForm = {did:this.taskId, accepters:this.newFinishUsers}
					this.$http.post('/api/duties/confirm',confirmForm).then(function(response){
						alert('提交成功')
						this.initPage()
					}, function(response){
						console.log(response.body)
					});
				}
			}
    }
  };

</script>
