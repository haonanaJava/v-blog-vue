<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="标签名称" prop="labelName">
      <el-input v-model="dataForm.labelName" placeholder="标签名称"></el-input>
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
          labelName: '',
        },
        dataRule: {
          labelName: [
            { required: true, message: '标签名称不能为空', trigger: 'blur' }
          ],
          labelAlias: [
            { required: true, message: '标签别名不能为空', trigger: 'blur' }
          ],
          labelDescription: [
            { required: true, message: '标签描述不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.labelId = id || 0
        this.visible = true
        // this.$nextTick(() => {
          // this.$refs['dataForm'].resetFields()
          if (this.dataForm.labelId) {
            this.$http({
              url: (`labels/info/${this.dataForm.labelId}`),
              method: 'get',
              params: {}
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.labelName = data.labels.labelName
                this.dataForm.labelAlias = data.labels.labelAlias
                this.dataForm.labelDescription = data.labels.labelDescription
              }
            })
          }
        // })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate(async(valid) => {
          if (valid) {
              const {data: res} = await this.$http.post(`labels/${!this.dataForm.labelId ? 'save' : 'update'}`,this.dataForm)
              if (res && res.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              }
              else {
                this.$message.error(res.msg)
              }
          }
        })
      }
    }
  }
</script>
