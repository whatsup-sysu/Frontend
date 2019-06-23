<template>
  <el-form :model="taskContent" label-width="80px">
    <el-form-item label="任务内容">
      <el-col :span="18">
        <el-input  v-model="taskContent.content"  type="textarea" :autosize="{ minRows: 8, maxRows: 20}"></el-input>
      </el-col>
      <el-col :span="6">
        <div class="warning">{{warnMsg.taskContent}}</div>
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
export default {
  data() {
    return {
      taskContent: {
        content:''
      },
      warnMsg:{
        taskContent:''
      }
    }
  },
  methods: {
    checkTaskContentValid(){
      if(!this.taskContent)
				this.warnMsg.taskContent = '请填写任务名字'
			else
				this.warnMsg.taskContent = ''
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
