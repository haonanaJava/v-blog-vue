<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户ID" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="用户ID"></el-input>
    </el-form-item>
    <el-form-item label="好友ID" prop="userFriendsId">
      <el-input v-model="dataForm.userFriendsId" placeholder="好友ID"></el-input>
    </el-form-item>
    <el-form-item label="好友备注" prop="userNote">
      <el-input v-model="dataForm.userNote" placeholder="好友备注"></el-input>
    </el-form-item>
    <el-form-item label="好友状态" prop="userStatus">
      <el-input v-model="dataForm.userStatus" placeholder="好友状态"></el-input>
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
          id: 0,
          userId: '',
          userFriendsId: '',
          userNote: '',
          userStatus: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '用户ID不能为空', trigger: 'blur' }
          ],
          userFriendsId: [
            { required: true, message: '好友ID不能为空', trigger: 'blur' }
          ],
          userNote: [
            { required: true, message: '好友备注不能为空', trigger: 'blur' }
          ],
          userStatus: [
            { required: true, message: '好友状态不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/blog/userfriends/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.userFriends.userId
                this.dataForm.userFriendsId = data.userFriends.userFriendsId
                this.dataForm.userNote = data.userFriends.userNote
                this.dataForm.userStatus = data.userFriends.userStatus
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
              url: this.$http.adornUrl(`/blog/userfriends/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'userId': this.dataForm.userId,
                'userFriendsId': this.dataForm.userFriendsId,
                'userNote': this.dataForm.userNote,
                'userStatus': this.dataForm.userStatus
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
