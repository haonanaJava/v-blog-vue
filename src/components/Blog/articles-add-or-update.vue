<template>
  <div id="editor">
    <el-form :model="dataForm">
      <el-form-item>
          <el-input
          type="text"
          placeholder="请输入文章标题"
          v-model="dataForm.articleTitle"
          maxlength="20"
          show-word-limit
          >
          </el-input>
      </el-form-item>
      <el-form-item class="contentItem">
        <mavon-editor 
        v-model="dataForm.articleContent"
        style="height: 720px"
        />
      </el-form-item>
    </el-form>
    

    
    <el-button type="info" @click="publicBlog">发布文章</el-button>
    <el-button type="primary" @click="saveBlog">保存文章</el-button>
  </div>
</template>

<script>
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

  export default {
    components: {mavonEditor},
    data () {
      return {
        visible: false,
        dataForm: {
          articleId: 0,
          userId: '',
          articleTitle: '',
          articleContent: '',
          articleViews: '',
          articleCommentCount: '',
          articleDate: '',
          articleLikeCount: ''
        },
       
        dataRule: {
          articleTitle: [
            { required: true, message: '博文标题不能为空', trigger: 'blur' }
          ],
          articleContent: [
            { required: true, message: '博文内容不能为空', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      async saveBlog(){
        const {data: res} = await this.$http.post('articles/save',this.dataForm)
        if(res.code !== 0){
          return this.$message({
            type: 'info',
            message: '保存文章失败'
          })
        }
        this.$message({
          type: 'success',
          message: '保存文章成功'
        })
        this.$router.push('/blog')
      },
      publicBlog(){

      }
    }
  }
</script>

<style lang="less" scoped>
.mavon-editor {
  width: 100%;
  height: 100%;
}
#editor{
  margin: auto;
  width: 100%;
  height: 800px;
}
.el-button{
  margin-top: 20px;
  margin-right: 30px;
  float: right;
}
.contentItem{
  height: 720px;
}
</style>
