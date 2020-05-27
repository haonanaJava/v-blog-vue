<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;"
      stripe
      highlight-current-row
      >
      <el-table-column
        type="expand"
        header-align="center"
        align="center"
        width="50"
        >
        <template slot-scope="props"> 
          <el-row>
            <el-col :span="12">
              <span><i class="el-icon-collection-tag"></i>
              包含标签:</span>
              <el-tag
              v-for="label in props.row.labelsEntityList"
              :key="label.labelId"
              closable
              type="success"
              effect="dark"
              @close="deleteTag(label)">
              {{label.labelName}}
            </el-tag>
            </el-col>
            <el-col :span="12">
              <span><i class="el-icon-sort"></i>
              所属分类:</span>
              <el-tag
              v-for="sort in props.row.sortsEntityList"
              :key="sort.sortId"
              closable
              effect="light"
              type="info"
              @close="deleteSort(sort)">
              {{sort.sortName}}
            </el-tag>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        prop="articleId"
        header-align="center"
        align="center"
        label="博文ID">
      </el-table-column>
      <el-table-column
        prop="userId"
        header-align="center"
        align="center"
        label="发表用户ID">
      </el-table-column>
      <el-table-column
        prop="articleTitle"
        header-align="center"
        align="center"
        label="博文标题">
      </el-table-column>
      <el-table-column
        prop="articleViews"
        header-align="center"
        align="center"
        label="浏览量">
      </el-table-column>
      <el-table-column
        prop="articleCommentCount"
        header-align="center"
        align="center"
        label="评论总数">
      </el-table-column>
      <el-table-column
        prop="articleDate"
        :formatter="formatDate"
        header-align="center"
        align="center"
        label="发表时间">
      </el-table-column>
      <el-table-column
        prop="articleLikeCount"
        header-align="center"
        align="center"
        label="喜欢次数">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="是否公开">
        <template slot-scope="slotProps">
          <el-switch
            @change="ArticleStatusChange(slotProps.row)"
            v-model="slotProps.row.articleIsPublic"
            :active-value=0
            :inactive-value=1
            >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column
        header-align="center"
        align="center"
        label="是在否首页展示"
        width="150px">
        <template slot-scope="slotProps">
          <el-switch
            @change="ArticleStatusChange(slotProps.row)"
            v-model="slotProps.row.articleIsDisplay"
            :active-value=0
            :inactive-value=1
            >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-tooltip effect="light" content="修改" placement="top-start">
            <el-button type="primary" size="small" icon="el-icon-edit" circle  @click="addOrUpdateHandle(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip effect="light" content="编辑标签,分类" placement="top-start">
            <el-button type="warning" size="small" icon="el-icon-star-off" @click="openSetSortLabelDiaglogVisible(scope.row.articleId)" circle></el-button>
          </el-tooltip>
          <el-tooltip effect="light" content="删除" placement="top-start">
            <el-button type="danger" size="small" icon="el-icon-delete" circle  @click="deleteHandle(scope.row.articleId)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 修改文章标题的对话框 -->
    <el-dialog title="文章修改" :visible.sync="dialogTableVisible">
      <el-form :model="editForm">
        <el-form-item label="文章标题">
          <el-input v-model="editForm.articleTitle" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEditForm">确 定</el-button>
      </div>
    </el-dialog>
<!-- 设置文章分类以及标签的对话框 -->
    <el-dialog title="设置文章分类及标签" :visible.sync="setSortLabelDiaglogVisible">
      <el-row :gutter="20">
        <el-col :span="12">
            <el-select v-model="SelectedLabels" filterable  multiple placeholder="请选择标签">
            <el-option
              v-for="item in labelOption"
              :key="item.labelId"
              :label="item.labelName"
              :value="item.labelId">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select v-model="SelectedSorts" filterable multiple placeholder="请选择分类">
            <el-option
              v-for="item in sortOption"
              :key="item.sortId"
              :label="item.sortName"
              :value="item.sortId">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    <div slot="footer">
      <el-button @click="setSortLabelDiaglogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitSortLabel">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        dialogTableVisible: false,
        editForm: {
          articleId: '',
          userId: '',
          articleTitle: '',
          articleContent: '',
          articleDesc: '',
          articleViews: '',
          articleCommentCount: '',
          articleDate: '',
          articarticleLikeCountleId: '',
          articarIsPublic: '',
        },
        setSortLabelDiaglogVisible: false,
        labelOption: [],
        SelectedLabels: [],
        sortOption: [],
        SelectedSorts: [],
        editedArticleId: ''
      }
    },
    created () {
      this.getDataList()
    },
    computed: {
    },
    mounted(){
    },
    methods: {
      async ArticleStatusChange(listInfo){
        const {data : res} = await this.$http.put('articles/updateArticle',listInfo)
        if(res.code !== 0){
          return this.$message({
            type: 'info',
            message: '修改状态失败'
          })
        }
        this.$message({
            type: 'success',
            message: '修改状态成功'
          })
        this.getDataList()
      },
      ArticleDisplayChange(listInfo){
        // this.$http({
        //   path: 'article/updateArticle'
        // })  
      },
      // 获取数据列表
       getDataList () {
        this.dataListLoading = true
        this.$http({
          url: 'articles/list',
          method: 'get',
          params: {
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      // 新增 / 修改
      addOrUpdateHandle (articleInfo) {
        this.dialogTableVisible = true
        this.editForm.articleTitle = articleInfo.articleTitle
        this.editForm.articleId = articleInfo.articleId
        this.editForm.articleContent = articleInfo.articleContent
        this.editForm.articleDesc = articleInfo.articleDesc
        this.$router.push({
          path: '/addBlog',
          name: 'addBlog',
          query: {articleId: articleInfo.articleId},
          params: {editForm: this.editForm}
        })
      },
      // 删除
      deleteHandle (id) {
        console.log(id)
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.articleId
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const {data : res} = await this.$http.post('articles/delete',ids)
          if(res.code !== 0){
            return this.$message({type: 'info',message: '删除失败'})
          }
          this.$message({type: 'success',message: '删除成功'})
          this.getDataList()
        }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消删除'
            })
        })
      },
      formatDate(row,column,cellName){
          return this.$moment(row.articleDate).format('YYYY-MM-DD')
      },
       async saveEditForm(){
       const{data : res} = await this.$http.put('articles/updateArticle',this.editForm)
       if(res.code !== 0){
         return this.$message({
            type: 'info',
            message: '修改失败'
          })
        }
        this.$message({
              type: 'info',
              message: '修改成功'
        })
            this.getDataList()
        this.dialogTableVisible = !this.dialogTableVisible
        },
        deleteTag(labelInfo){
          this.$http({
            url: `labels/deleteTag/${labelInfo.labelId}`,
            method: 'delete'
          }).then(({data}) => {
            if(data && data.code === 0){
              this.$message.success('删除标签成功')
              this.getDataList()
            }
          })
        },
        deleteSort(sortInfo){
          this.$http({
            url: `sorts/deleteSort/${sortInfo.sortId}`,
            method: 'delete'
          }).then(({data}) => {
            this.$message.success('删除分类成功')
            this.getDataList()
          })
        },
        openSetSortLabelDiaglogVisible(articleId){
          this.setSortLabelDiaglogVisible = true
          this.getLabelSortList()
          this.editedArticleId = articleId
        },
        async getLabelSortList(){
          const {data: res} = await this.$http.get('labels/list_labels')
          const {data: sortRes} = await this.$http.get('sorts/list_sorts')
          this.labelOption = res.list
          this.sortOption = sortRes.list
        },
        submitSortLabel(){
          if(this.SelectedLabels.length !== 0){
            this.$http({
              url: `articles/setLabel/${this.editedArticleId}`,
              method: 'post',
              data: 
                JSON.stringify(this.SelectedLabels),
            }).then(({data}) => {
              if(data.code !== 0) return this.$message.error('设置标签成功')
              this.getDataList()
              this.setSortLabelDiaglogVisible = false
              this.SelectedLabels = []
              this.$message.success('设置标签成功')
            }).catch(({data}) => {
              if(data.code !== 0){
                this.$message.error('设置标签失败')
              }
            })
          }
          if(this.SelectedSorts.length !== 0){
            this.$http({
              url: `articles/setSort/${this.editedArticleId}`,
              method: 'post',
              data: 
                JSON.stringify(this.SelectedSorts),
            }).then(({data}) => {
              if(data.code !== 0) return this.$message.error('设置标签成功')
              this.getDataList()
              this.SelectedSorts = []
              this.$message.success('设置分类成功')
              this.setSortLabelDiaglogVisible = false
              this.editedArticleId = ''
            }).catch(({data}) => {
              if(data.code !== 0){
                this.$message.error('设置分类失败')
              }
            })
          }
        }
    }
    
  }
</script>
<style lang="less" scoped>
.el-tag{
  margin: 5px 8px;
}
</style>