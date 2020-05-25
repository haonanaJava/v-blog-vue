<template>
  <div id="editor">
    <el-form :model="dataForm">
      <el-form-item class="contentItem">
        <mavon-editor 
        v-model="dataForm.articleContent"
        style="height: 720px"
        @change="changeToHtml"
        @imgAdd="$imgAdd"
	      @imgDel="$imgDel"
        />
      </el-form-item>
    </el-form>
    
    <el-drawer
      title="文章基本信息设置"
      :visible.sync="editVisible"
      direction="rtl"
      custom-class="article-drawer"
      ref="articleDrawer"
      :before-close="handleClose"
      >
      <div class="demo-drawer__content">
        <el-form :model="dataForm">
          <el-form-item label="文章标题" :label-width="formLabelWidth">
            <el-input v-model="dataForm.articleTitle" clearable autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文章描述" >
            <el-input
            type="textarea"
            placeholder="请输入文章描述"
            v-model="dataForm.articleDesc"
            maxlength="60"
            :autosize="{ minRows: 3, maxRows: 5}"
            show-word-limit
            >
            </el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="$refs.articleDrawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>

    <el-button type="warning" @click="editArticleProperties">编辑属性</el-button>
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
          articleDesc: '',
          articleViews: '',
          articleCommentCount: '',
          articleDate: '',
          articleLikeCount: ''
        },
        editVisible: false,
        loading: false,
        formLabelWidth: '80px',
        timer: null,
        html: '',
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
    mounted(){
      if(this.$route.query.articleId){
        this.dataForm = this.$route.params.editForm
      }
      console.log(this.html)
    },
    methods: {
      async saveBlog(){
        this.dataForm.articleContent = this.html
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

      },
      editArticleProperties(){
        this.editVisible = true

      },
      cancelForm(){
        this.editVisible = false;
        this.dialog = false;
        clearTimeout(this.timer);
      },
      closeDrawer(){
        
      },
      handleClose(done) {
      if (this.loading) {
        return
      }
      this.$confirm('确定要提交文章吗？')
        .then(_ => {
          this.loading = true
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false
            }, 400);
          }, 2000)
          this.saveBlog()
        })
        .catch(_ => {});
      },
      changeToHtml(value,render){
        this.html = render
      },
      //methods
      $imgAdd (pos, $file) {
        // 第一步.将图片上传到服务器.
        var formdata = new FormData()
        formdata.append('image', $file)
        this.img_file[pos] = $file
        this.$http({
          url: '/api/edit/uploadimg',
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then((res) => {
          let _res = res.data
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          this.$refs.md.$img2Url(pos, _res.url)
        })
      },
      $imgDel (pos) {
        delete this.img_file[pos]
      },
      change (value, render) {
        this.html = render
      },
      // 提交
      submit () {
        console.log(this.content)
        console.log(this.html)
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
