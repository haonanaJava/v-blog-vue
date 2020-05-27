<template>
    <div class="body">
        <el-backtop></el-backtop>
        <header>
            <el-menu default-active="homePage" 
            class="el-menu-demo"
            mode="horizontal"
            text-color="#989898"
            active-text-color="#7CE577"
            router
            >
            <el-avatar class="siteLogo" src="https://pic2.zhimg.com/80/v2-1e78d8115e803957facb3c2783eec15c_720w.jpg"></el-avatar>
            <el-menu-item index="index">首页</el-menu-item>
            <el-menu-item index="Technology">技术杂谈</el-menu-item>
            <el-menu-item index="essay">心情随笔</el-menu-item>
            <el-menu-item index="friendLink">友情连接</el-menu-item>
            <el-menu-item index="aboutMe">关于我</el-menu-item>
            </el-menu>
        </header>

        <div class="sort_item">
            <el-card>
                <div v-for="item in sortsList" :key="item.sortId" class="sort_button">
                    <el-badge >
                        <el-button type="success" @click="clickSortButton(item.sortId)" v-text="item.sortName"></el-button>
                    </el-badge>
                </div>
            </el-card>
        </div>
        <div class="article_list">
            <a class="article_item" v-for="item in articleList" :key="item.articleId" @click="clickArticleItem(item.articleId)">
                <div class="article_item_header">
                    <img src="https://pic2.zhimg.com/80/v2-1e78d8115e803957facb3c2783eec15c_720w.jpg" alt="">
                    <h1 v-text="item.articleTitle">文章标题</h1>
                </div>
                <div class="article_item_content">
                    <p v-text="item.articleDesc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim fugiat, 
                        consectetur laborum sapiente numquam iusto laudantium 
                        totam excepturi aut necessitatibus quis quo mollitia
                         debitis praesentium illum ipsa quas dolor beatae.
                    </p>
                    <img src="https://picsum.photos/seed/picsum/130/110/" alt="">
                </div>
                <div class="article_item_footer">
                    <span id="article_date"><font-awesome-icon :icon="['fas','calendar-alt']" />发布于{{item.articleDate}}</span>
                    <span id="article_views">浏览{{item.articleViews}}</span>
                    <div class="article_tag" v-for="tag in item.labelsEntityList" :key="tag.labelId">
                        <el-tag type="primary">{{tag.labelName}}</el-tag>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            sortsList: [],
            articleList: []
        };
    },
    created() {
        this.getSortsList()
        this.getArticleList()
    },
    methods: {
        getSortsList(){
            this.$http({
                url: 'sorts/list_sorts',
                method: 'get'
            }).then(({data}) => {
                if(data.code !== 0){
                    return this.$message.error('分类列表加载失败')
                }
                this.sortsList = data.list
                this.sortsList
            })
        },
        clickSortButton(sortId){
            console.log(sortId)
            this.$http({
                url: `articles/listBySorts/${sortId}`,
                method: 'get'
            }).then(({data}) => {
                if(data.code !== 0) {
                    return this.$message.error('该分类下还没有文章')
                }
                // if(data.code == 300){
                //     return this.$message.info('该分类下还没有文章')
                // }
                this.articleList = data.list
            })
        },
        getArticleList(){
            this.$http({
                url: 'articles/listWithLabel',
                method: 'get'
            }).then(({data}) => {
                this.articleList = data.list
            })
        },
        clickArticleItem(articleId){
            this.$router.push({
                path: '/articleDetail',
                query: {'articleId': articleId}
            })
        }
    },
};
</script>

<style scoped lang="less">
header{
    display: flex;
    justify-content: center;
    box-shadow: 2px 4px 6px #ededee;
    background-color: #4A8230;
    height: 80px;
}
.el-menu{
    width: 1200px;
    height: 80px;
    display: flex;
    justify-content: flex-end;
    background-color: #4A8230;
}
.el-menu-item{
    float: right !important;
    font-size: 1em;
    font-weight: 300;
    margin: 15px 0 0 0 !important;
}
.el-menu-item:hover{
    background-color: #82CE57 !important;
}
.siteLogo{
    margin: 20px 670px 10px 0;
    order: -1;
}
.sort_item{
    width: 1200px;
    margin: 50px auto;
}
.svg-inline--fa{
    font-size: 20px;
    margin-right: 5px;
}
.sort_button{
    display: inline-block;
    margin: 5px 10px;
}
.article_list{
    width: 1200px;
    margin: 20px auto;
    display: grid;
    grid-template-rows: repeat(12,1fr);
}
.article_item{
    cursor: pointer;
    display: grid;
    grid-template-rows: 35px 150px 35px;
    position: relative;
}
.article_item_header{
    display: grid;
    grid-template-columns: 40px 200px;
}
.article_item_header img{
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
}
.article_item_header h1{
    align-self: center;
    justify-self: start;
    margin-left: 15px;
    font-size: 20px;
    font-weight: 600;
    color: #423E28;
}

.article_item_content{
    display: grid;
    grid-template-columns: 800px 400px;
}
.article_item_content p{
    font-size: 18px;
    color: #969AA4;
    line-height: 2;
}
.article_item_footer{
    position: absolute;
    top: 130px;
    display: grid;
    grid-template-columns: repeat(12,1fr);
}
#article_date{
    grid-column-start: 1;
    grid-column-end: 4;
    align-self: center;
    justify-self: start;
    // position: absolute;
    // top: -40px;
}
#article_views{
    align-self: center;
    justify-self: start;
    color: #6CDBC3;
    // position: absolute;
    // top: -40px;
    // left: 200px;
}
.article_tag{
    align-self: center;
    margin: 0 10px;
}
</style>
