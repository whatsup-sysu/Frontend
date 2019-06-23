<template>
    <el-container class="uploadPhoto">
        <el-upload
            class="upload-demo"
            drag
            action="/api/photo/UploadUserPhoto"
            :show-file-list="true"
            :on-change="handleChange"
            :on-success="successUpload"
            :file-list="fileList"
            accept=".png"
            list-type="picture">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传png文件，且不超过1Mb</div>
        </el-upload>
    </el-container>
</template>

<script>

export default {
    data () {
        return {
            fileList: []
        }
    },
    methods: {
        handleChange(file, fileList) {
            this.fileList = fileList.slice(-1);
        },
        successUpload(response, file, fileList) {
            this.$message({
                message: '更新头像成功!',
                type: 'success'
            });
            this.$emit('methodUploadSucceed', 'quit');
        }
    }
};
</script>

<style scoped>

</style>