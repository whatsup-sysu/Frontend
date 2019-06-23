<template>
    <div class="topup_page">
        <el-container>
            <el-main>
                <el-form ref="form" :model="form" :rules="rules" label-position='right' label-width="80px"> 
                    <el-form-item label="充值金额" class="form_item" prop="money">
                        <el-input style="width: 300px" v-model="form.money" placeholder="请输入充值金额" clearable></el-input>
                    </el-form-item>
                </el-form>
            </el-main>
            <el-footer>
                <el-button @click="cancle">取 消</el-button>
                <el-button type="primary" @click="onSubmit('form')">确认</el-button>
            </el-footer>
        </el-container>
    </div>
</template>

<script>

export default {
    data () {
        return {
            form: {
                money: '',
            },
            rules: {
                money: [
                    { required: true, message: '请输入金额', trigger: 'blur' },
                    { pattern: /^\d{0,9}$/, message: '充值金额只能为整数', trigger: 'blur'}
                ],
            }
        }
    },

    methods: {
    	onSubmit: function(formName) {
            let m = parseInt(this.form.money) ;
    		var data = { amount: m };
            this.$http.post("/api/trades/topup", data, {emulateJSON: true}).then(function(res){
                console.log(res.body); 
                this.$message({
                    message: '充值成功!',
                    type: 'success'
                });
            },function(res){
                this.$message.error('充值失败，请稍后重试!');
            });
            this.$emit('methodTopupSucceed', 'quit');
        },
        cancle: function(){
            this.$emit('methodTopupFailed', 'quit');
        }
    }
};
</script>

<style scoped>
.form_item {
    width: 400px;
    margin: 0 auto;
}
</style>