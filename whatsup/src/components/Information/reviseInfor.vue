<template>
    <div>
        <el-container>
            <el-form style="margin:0px auto;" ref="form"  :model="form" :rules="rules" label-position='right' label-width="80px"> 
                <el-form-item label="昵称" class="login_form_item" prop="username">
                    <el-input v-model="form.username" placeholder="请输入昵称" clearable prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <el-form-item label="手机" class="login_form_item" prop="phone">
                    <el-input class="register_form_item" v-model="form.phone" placeholder="请输入手机号码" clearable  prefix-icon="el-icon-phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" class="login_form_item" prop="email">
                    <el-input class="register_form_item" v-model="form.email" placeholder="请输入邮箱" clearable  prefix-icon="el-icon-message"></el-input>
                </el-form-item>
                <el-form-item label="身份" prop="status">
                    <el-radio-group v-model="form.status">
                        <el-radio label="student"></el-radio>
                        <el-radio label="organization"></el-radio>
                    </el-radio-group>
                </el-form-item>
                
            </el-form>
            
        </el-container>
        <el-button @click="remove">取 消</el-button>
        <el-button @click="onSubmit('form')" type="primary" >确 定</el-button>
    </div>
</template>

<script>

export default {
    props:['id', 'username', 'email', 'phone', 'status' ],
    mounted: function(){
        this.form.username = this.username;
        this.form.email = this.email;
        this.form.phone = this.phone;
        this.form.status = this.status;
    },

    data () {
        return {
            form: {
                username: '',
                email: '',
                phone: '',
                status: '',
            },

            rules: {
                id: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'},
                ],
                checkPass: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, message: '邮箱格式不正确', trigger: 'blur' },
                ],
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { pattern: /^[0-9-_]{11}$/, message: '手机号码格式不正确', trigger: 'blur' },
                ],
                status: [
                    { required: true, message: '请输入身份', trigger: 'blur' },
                ],
            },
            
        }
    },

    methods: {
        onSubmit: function(formName) {
            var _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var url = "/api/users/user/"+this.id;
                    var type = "put";
                    var data = { username: this.form.username, phone: this.form.phone,
                                    email: this.form.email, status: this.form.status};

                    this.$http.put(url, data, {emulateJSON: true}).then(function(res){
                            console.log(res);
                            this.$message({
                                message: '修改信息成功!',
                                type: 'success'
                            });
                        },function(res){
                            console.log('请求失败处理');
                            this.$message.error('修改信息失败!');
                            console.log(res.body);
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            _this.quit();
        },

        quit: function(){
            this.$emit('methodReviseSucceed', 'quit');
        },

        remove: function(){
            this.$emit('methodReviseFailed', 'quit');
        }
    }
};
</script>

<style>
@import "../../assets/css/LoginAndRegister.css" 

</style>