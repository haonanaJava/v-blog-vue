<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="分类名称" prop="sortName">
      <el-input v-model="dataForm.sortName" placeholder="分类名称"></el-input>
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
          sortName: '',
        },
        dataRule: {
          sortName: [
            { required: true, message: '分类名称不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.sortId = id || 0
        this.visible = true
          // this.$refs['dataForm'].resetFields()
          if (this.dataForm.sortId) {
            this.$http({
              url: `sorts/info/${this.dataForm.sortId}`,
              method: 'get'
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.sortName = data.sorts.sortName
              }
            })
          }
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http.post(
              `sorts/${!this.dataForm.sortId ? 'save' : 'update'}`,this.dataForm
            ).then(({data}) => {
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
