<template>
  <div>
    <el-menu :default-active="activeIndex" router mode="horizontal">
        <el-menu-item index="blog">
          <i class="el-icon-notebook-1"></i>
        文章管理</el-menu-item>

        <el-menu-item index="addBlog" >
          <i class="el-icon-collection"></i>
        写博客</el-menu-item>

        <el-menu-item index="tag" >
          <i class="el-icon-collection-tag"></i>
          标签管理</el-menu-item>

        <el-menu-item index="sort">
          <i class="el-icon-sort"></i>
          分类管理</el-menu-item>

        <el-menu-item index="comment">
          <i class="el-icon-s-comment"></i>
          评论管理</el-menu-item>

        <el-menu-item index="essay">
          <i class="el-icon-cold-drink"></i>
          随笔管理</el-menu-item>

        <el-menu-item class="loginNav" index="login">
          <i class="el-icon-moon"></i>
          登录</el-menu-item>

        <el-menu-item class="loginNav">
          <i class="el-icon-moon-night"></i>
          <el-link @click="logout" type="danger">注销</el-link>
          </el-menu-item>

          <el-menu-item index="blogroll">
          <i class="el-icon-link"></i>
          友情链接</el-menu-item>
    </el-menu>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      logout(){
        window.sessionStorage.removeItem('token')
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="less">
.loginNav{
  float: right !important;
}
.container{
    margin: 20px 300px;
    height: 100%;
}
</style>