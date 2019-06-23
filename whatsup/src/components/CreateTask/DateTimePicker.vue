<template>
	<div class="block" >
		<el-date-picker
			v-model="value"
			type="datetimerange":picker-options="pickerOptions"
			start-placeholder="开始日期"
			end-placeholder="结束日期"
			style='width:100%'>
		</el-date-picker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
       pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value: '',
      };
    }
  };
</script>