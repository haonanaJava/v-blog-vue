<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户IP" prop="userIp">
      <el-input v-model="dataForm.userIp" placeholder="用户IP"></el-input>
    </el-form-item>
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="dataForm.userName" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item label="用户密码" prop="userPassword">
      <el-input v-model="dataForm.userPassword" placeholder="用户密码"></el-input>
    </el-form-item>
    <el-form-item label="用户邮箱" prop="userEmail">
      <el-input v-model="dataForm.userEmail" placeholder="用户邮箱"></el-input>
    </el-form-item>
    <el-form-item label="用户头像" prop="userProfilePhoto">
      <el-input v-model="dataForm.userProfilePhoto" placeholder="用户头像"></el-input>
    </el-form-item>
    <el-form-item label="注册时间" prop="userRegistrationTime">
      <el-input v-model="dataForm.userRegistrationTime" placeholder="注册时间"></el-input>
    </el-form-item>
    <el-form-item label="用户生日" prop="userBirthday">
      <el-input v-model="dataForm.userBirthday" placeholder="用户生日"></el-input>
    </el-form-item>
    <el-form-item label="用户年龄" prop="userAge">
      <el-input v-model="dataForm.userAge" placeholder="用户年龄"></el-input>
    </el-form-item>
    <el-form-item label="用户手机号" prop="userTelephoneNumber">
      <el-input v-model="dataForm.userTelephoneNumber" placeholder="用户手机号"></el-input>
    </el-form-item>
    <el-form-item label="用户昵称" prop="userNickname">
      <el-input v-model="dataForm.userNickname" placeholder="用户昵称"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          userId: 0,
          userIp: '',
          userName: '',
          userPassword: '',
          userEmail: '',
          userProfilePhoto: '',
          userRegistrationTime: '',
          userBirthday: '',
          userAge: '',
          userTelephoneNumber: '',
          userNickname: ''
        },
        dataRule: {
          userIp: [
            { required: true, message: '用户IP不能为空', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          userPassword: [
            { required: true, message: '用户密码不能为空', trigger: 'blur' }
          ],
          userEmail: [
            { required: true, message: '用户邮箱不能为空', trigger: 'blur' }
          ],
          userProfilePhoto: [
            { required: true, message: '用户头像不能为空', trigger: 'blur' }
          ],
          userRegistrationTime: [
            { required: true, message: '注册时间不能为空', trigger: 'blur' }
          ],
          userBirthday: [
            { required: true, message: '用户生日不能为空', trigger: 'blur' }
          ],
          userAge: [
            { required: true, message: '用户年龄不能为空', trigger: 'blur' }
          ],
          userTelephoneNumber: [
            { required: true, message: '用户手机号不能为空', trigger: 'blur' }
          ],
          userNickname: [
            { required: true, message: '用户昵称不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.userId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.userId) {
            this.$http({
              url: this.$http.adornUrl(`/blog/users/info/${this.dataForm.userId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userIp = data.users.userIp
                this.dataForm.userName = data.users.userName
                this.dataForm.userPassword = data.users.userPassword
                this.dataForm.userEmail = data.users.userEmail
                this.dataForm.userProfilePhoto = data.users.userProfilePhoto
                this.dataForm.userRegistrationTime = data.users.userRegistrationTime
                this.dataForm.userBirthday = data.users.userBirthday
                this.dataForm.userAge = data.users.userAge
                this.dataForm.userTelephoneNumber = data.users.userTelephoneNumber
                this.dataForm.userNickname = data.users.userNickname
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/blog/users/${!this.dataForm.userId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'userId': this.dataForm.userId || undefined,
                'userIp': this.dataForm.userIp,
                'userName': this.dataForm.userName,
                'userPassword': this.dataForm.userPassword,
                'userEmail': this.dataForm.userEmail,
                'userProfilePhoto': this.dataForm.userProfilePhoto,
                'userRegistrationTime': this.dataForm.userRegistrationTime,
                'userBirthday': this.dataForm.userBirthday,
                'userAge': this.dataForm.userAge,
                'userTelephoneNumber': this.dataForm.userTelephoneNumber,
                'userNickname': this.dataForm.userNickname
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
