<template>
  <el-form :model="basicInfo" label-width="80px">
    <el-form-item label="任务名称">
      <el-col :span="16">
        <el-input  v-model="basicInfo.taskName" type="textarea" :autosize="{ minRows: 1, maxRows: 2}"></el-input>
      </el-col>
      <el-col :span="8">
        <div class="warning">{{warnMsg.taskName}}</div>
      </el-col>
    </el-form-item>

    <el-form-item label="任务简介">
      <el-col :span="16">
        <el-input  v-model="basicInfo.introduction" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
      </el-col>

      <el-col :span="8">
        <div class="warning">{{warnMsg.introduction}}</div>
      </el-col>
    </el-form-item>

    <el-form-item label="任务类型">
      <el-col :span="16">
        <el-radio-group v-model="basicInfo.taskType">
          <el-radio label='问卷'>问卷</el-radio>
          <el-radio label='其他'>其他</el-radio>
        </el-radio-group>
      </el-col>
    </el-form-item>

    <el-form-item label="任务时间">
      <el-col :span="16">
        <v-DateTimePicker ref="taskTime"></v-DateTimePicker>
      </el-col>
      <el-col :span="8">
        <div class="warning">{{warnMsg.taskTime}}</div>
      </el-col>
    </el-form-item>

    <el-form-item label="参加人数" >
      <el-col :span="16">
        <el-input  v-model="basicInfo.paticipantNum"></el-input>
      </el-col>
      <el-col :span="8">
        <div class="warning">{{warnMsg.paticipantNum}}</div>
      </el-col>
    </el-form-item>

    <el-form-item label="薪酬">
      <el-col :span="16">
        <el-input v-model="basicInfo.taskWage" >
          <template slot="append">元/每人</template>
        </el-input>
      </el-col>
      <el-col :span="8">
        <div class="warning">{{warnMsg.taskWage}}</div>
      </el-col>
    </el-form-item>

  </el-form>
</template>
<style>
.warning{
  color: red
}
</style>
<script type="text/javascript">
  import DateTimePicker from './DateTimePicker.vue'
	export default {
    components: {
  		"v-DateTimePicker":DateTimePicker
  	},
    data() {
      return {
        basicInfo: {
          taskName:'',
          introduction:'',
          paticipantNum:'',
          taskWage:'',
          taskType:'其他',

        },

        warnMsg:{
          taskName:'',
          introduction:'',
          taskTime:'',
          paticipantNum:'',
          taskWage:''
        }
      }
    },
    methods: {
  		isNumber: function(obj) {
  			var reg = /^(-?[0-9]+)$/;
  			if (reg.test(obj)) {
  				return true;
  			}
  			return false;
  		},

  		isFloat: function(obj) {
  		  var reg = /^(-?[0-9]+)(\.[0-9]+)?$/;
  		  if (reg.test(obj)) {
  		    return true;
  		  }
  		  return false;
  		},

      checkBasicInfoValid(){
        if(!this.basicInfo.taskName)
  				this.warnMsg.taskName = '请填写任务名字'
  			else
  				this.warnMsg.taskName = ''

        if(!this.basicInfo.introduction)
  				this.warnMsg.introduction = '请填写任务简介'
  			else
  				this.warnMsg.introduction = ''

  			if(!this.$refs.taskTime.value )
  				this.warnMsg.taskTime = '请填写任务时间'
        else if(this.$refs.taskTime.value[1].getTime() < new Date().getTime() )
          this.warnMsg.taskTime = '结束时间在当前时间之前'
  			else
  				this.warnMsg.taskTime = ''

        if(this.isNumber(this.basicInfo.paticipantNum) ){
  				this.basicInfo.paticipantNum = parseInt(this.basicInfo.paticipantNum)
  				if(this.basicInfo.paticipantNum <= 0)
  					this.warnMsg.paticipantNum = '参加人数必须大于0'
  				else
  					this.warnMsg.paticipantNum = ''
  			}
  			else{
  				this.warnMsg.paticipantNum ='参加人数必须为整数';
  			}

  			if(this.isFloat(this.basicInfo.taskWage) ){
  				this.basicInfo.taskWage = parseFloat(this.basicInfo.taskWage)
  				if(this.basicInfo.taskWage <= 0)
  					this.warnMsg.taskWage = '薪酬必须大于0'
  				else
  					this.warnMsg.taskWage = ''
  			}
  			else{
  				this.warnMsg.taskWage = '薪酬必须为数字'
  			}
        var valid = true
  			for(var key in this.warnMsg){
  				if(this.warnMsg[key] != '')
  					valid = false
  			}
        return valid
      }
    }
  }
</script>
