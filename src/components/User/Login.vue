<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../../assets/logo.png" alt="">
            </div>
            <el-form :model="loginForm" :rules="loginFormRules" ref="LoginFormRef" label-width="0px" class="login_form">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item prop="userPassword">
                    <el-input v-model="loginForm.userPassword" type="password" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button @click="login" type="primary">登录</el-button>
                    <el-button @click="resetForm" type="info">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loginForm: {
                username: '',
                userPassword: ''
            },
            loginFormRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        resetForm() {
            this.$refs.LoginFormRef.resetFields()
        },
        login() {
            this.$refs.LoginFormRef.validate(async valid => {
                if (!valid) return;
                const { data: result } = await this.$http.post('users/login', this.loginForm)
                if (result.code !== 0) return this.$message.error('登录失败')
                this.$message.success('登录成功')
                window.sessionStorage.setItem("token", result.token)
                this.$router.push('/index')
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b ;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -60%);
        background-color: #fff;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}

.btns {
    display: flex;
    justify-content: flex-end;
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0px 20px;
    box-sizing: border-box;
}
</style>
