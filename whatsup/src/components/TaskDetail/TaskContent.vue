<template>
	<div style="width: 100%; margin: 0 auto;" >
		<el-container>
		  <el-header>{{task.taskName}}</el-header>

			<el-container>
		    <el-header style="text-align:left">任务内容:</el-header>
		    <el-main style="text-align:left">
					{{task.taskContent}}
				</el-main>
		  </el-container>
		</el-container>
	</div>
</template>


<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: #D3DCE6;
    color: #333;
		padding: 0 40px;
    text-align: center;
		line-height: 50px
  }
</style>

<script>
	export default {
		data() {
		  return {
				task: {
					taskName:'',
					taskContent:''
				},
			}
		}
	}
</script>
