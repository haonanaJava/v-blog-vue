<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
    <el-form-item label="留言者昵称" prop="nickname">
      <el-input v-model="dataForm.nickname" placeholder="留言者昵称"></el-input>
    </el-form-item>
    <el-form-item label="评论博文ID" prop="articleId">
      <el-input v-model="dataForm.articleId" placeholder="评论博文ID"></el-input>
    </el-form-item>
    <el-form-item label="点赞数" prop="commentLikeCount">
      <el-input v-model="dataForm.commentLikeCount" placeholder="点赞数"></el-input>
    </el-form-item>
    <el-form-item label="评论日期" prop="commentDate">
      <el-date-picker
      v-model="dataForm.commentDate"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
    </el-form-item>
    <el-form-item label="评论内容" prop="commentContent">
      <el-input v-model="dataForm.commentContent" placeholder="评论内容"></el-input>
    </el-form-item>
    <el-form-item label="留言者邮箱" prop="commentEmail">
      <el-input v-model="dataForm.commentEmail" placeholder="留言者邮箱"></el-input>
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
          commentId: 0,
          nickname: '',
          articleId: '',
          commentLikeCount: '',
          commentDate: '',
          commentContent: '',
          commentEmail: ''
        },
        dataRule: {
          nickname: [
            { required: true, message: '发表用户昵称', trigger: 'blur' }
          ],
          articleId: [
            { required: true, message: '评论博文ID不能为空', trigger: 'blur' }
          ],
          commentLikeCount: [
            { required: true, message: '点赞数不能为空', trigger: 'blur' }
          ],
          commentDate: [
            { required: true, message: '评论日期不能为空', trigger: 'blur' }
          ],
          commentContent: [
            { required: true, message: '评论内容不能为空', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.commentId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.commentId) {
            this.$http({
              url: `/comments/info/${this.dataForm.commentId}`,
              method: 'get',
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.articleId = data.comments.articleId
                this.dataForm.nickname = data.comments.nickname
                this.dataForm.commentLikeCount = data.comments.commentLikeCount
                this.dataForm.commentDate = data.comments.commentDate
                this.dataForm.commentContent = data.comments.commentContent
                this.dataForm.commentEmail = data.comments.commentEmail
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
              url: `/comments/${!this.dataForm.commentId ? 'save' : 'update'}`,
              method: 'post',
              data: {
                'commentId': this.dataForm.commentId || undefined,
                'userId': this.dataForm.userId,
                'articleId': this.dataForm.articleId,
                'commentLikeCount': this.dataForm.commentLikeCount,
                'commentDate': this.dataForm.commentDate,
                'commentContent': this.dataForm.commentContent,
                'parentCommentId': this.dataForm.parentCommentId
              }
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
