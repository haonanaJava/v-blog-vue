<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button type="primary" @click="addSortButton()">新增</el-button>
        <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="sortId"
        header-align="center"
        align="center"
        label="分类ID">
      </el-table-column>
      <el-table-column
        prop="sortName"
        header-align="center"
        align="center"
        label="分类名称">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.sortId)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.sortId)">删除</el-button>
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>

    <el-dialog
    title="添加分类"
    :visible.sync="addSortDialogVisible"
    width="30%"
    >

      <el-form :model="dataForm" ref="addSortFormRef" label-width="100px">
        <el-form-item
          label="分类名称"
          prop="sortName"
          :rules="[
            { required: true, message: '分类名不能为空'},
          ]"
        >
          <el-input v-model="dataForm.sortName" type="text" clearable></el-input>
        </el-form-item>
      </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelAddSort('addSortFormRef')">取 消</el-button>
      <el-button type="primary" @click="submitSort">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
  import AddOrUpdate from './sorts-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          sortName: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        addSortDialogVisible: false,

      }
    },
    components: {
      AddOrUpdate
    },
    created () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: 'sorts/list',
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
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.sortId
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: 'sorts/delete',
            method: 'post',
            data: ids
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
      addSortButton(){
        this.addSortDialogVisible = true
      },
      cancelAddSort(formName){
        this.addSortDialogVisible = false
        this.$refs[formName].resetFields()
      },
      async submitSort(){
        const {data : res } = await this.$http({
          url: 'sorts/save',
          method: 'post',
          data: this.dataForm
        })
        if(res.code !== 0){
          return this.$message.error('保存分类失败')
        }
        this.$message.success('保存分类成功')
        this.addSortDialogVisible = false
        this.$refs['addSortFormRef'].resetFields()
        this.getDataList()
      }
    }
  }
</script>
