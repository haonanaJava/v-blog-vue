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
            <el-menu-item index="homePage">首页</el-menu-item>
            <el-menu-item index="Technology">技术杂谈</el-menu-item>
            <el-menu-item index="essay">心情随笔</el-menu-item>
            <el-menu-item index="friendLink">友情连接</el-menu-item>
            <el-menu-item index="aboutMe">关于我</el-menu-item>
            </el-menu>
        </header>
        <div class="container">
            <div class="slideShow">
                <div class="carousel">
                    <el-carousel 
                    :interval="3000" 
                    arrow="always"
                    height="330px"
                    >
                    <el-carousel-item v-for="(item,index) in carouselPicture" :key="index">
                        <el-link>
                            <el-image :src="item"></el-image>
                        </el-link>
                    </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="card">
                    <el-card :body-style="{ padding: '0px' }" shadow="always">
                    <img src="https://picsum.photos/id/119/400/230" class="image">
                    <div style="padding: 12px;">
                        <el-input
                            placeholder="好文直通车"
                            v-model="searchKey"
                            clearable>
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                        <div class="Sortlink">
                            <el-link type="info"  v-for="(item,index) in sortList" :key="index" v-text="item.sortName"></el-link>
                        </div>
                    </div>
                    </el-card>
                </div>
            </div>
            <div class="content">
                <div class="content_left">
                    <h3>#最近更新</h3>
                    <a @click="routeToArticle(item.articleId)" v-for="(item,index) in indexArticleList" :key="index">
                        <div class="item_content">
                            <div class="item_info">
                                <!-- 文章类型 -->
                                <div class="item_type">
                                    <span class="type_icon">#</span>
                                    <p class="sort_p">JavaScript</p>
                                </div>
                                <!-- 标题 -->
                                <h4 v-text="item.articleTitle"></h4>
                            </div>
                            <!-- 文章描述 -->
                            <div class="item_desc" v-text="item.articleDesc"></div>
                            <!-- 文章基本信息 -->
                            <div class="item_msg">
                                <span >发布于{{item.articleDate}}</span>
                                浏览 {{item.articleViews}}
                            </div>
                        </div>
                        <div class="item_img">
                            <img src="https://picsum.photos/seed/picsum/130/110/" alt="">
                        </div>
                    </a>
                </div>
                <div class="content_right">
                    <div class="recommend">
                        <h3>#特别推荐</h3>
                        <div class="recommend_list">
                            <a href="#" @click="routeToArticle(item.articleId)" v-for="(item,index) in recommendList" :key="index">
                                <div class="recommend_list_title" v-text="item.reason">山河远阔，人间烟火，无一是你，无一不是你。</div>
                                <div class="recommend_list_msg" v-text="item.articleDate">1个月内 <span style="margin-left: 10px;" v-text="item.articleViews">浏览72</span></div>
                            </a>
                            <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
                        </div>
                    </div>
                    <div class="label"></div>
                    <div class="messageBoard"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            siteLogo: '',
            carouselPicture: [
                'https://picsum.photos/seed/picsum/790/330',
                'https://picsum.photos/id/103/790/330',
                'https://picsum.photos/790/330'
            ],
            searchKey: '',
            indexArticleList: [],
            recommendList: [],
            sortList: [],

        };
    },
    created() {
        this.getIndexArticleList()
        this.listRecommendArticle()
        this.getSortList()
    },
    computed:{
    },
    methods: {
        getIndexArticleList(){
            this.$http({
                url: 'articles/list_display'
            }).then(({data}) => {
                for(let i = 0; i < data.list.length;i++){
                    data.list[i].articleDate = this.$moment(data.list[i].articleDate).format('MMM Do YY')
                }
                this.indexArticleList = data.list
            })
        },
        routeToArticle(articleId){
            this.$router.push({
                path: '/articleDetail',
                query: {'articleId': articleId}
            })
        },
        listRecommendArticle(){
            this.$http({
                url: 'recommends/list_recommend'
            }).then(({data}) => {
                for(let i = 0; i< data.recommendList.length;i++){
                    data.recommendList[i].articleDate = this.$moment(data.recommendList[i].articleDate).format('MMM Do YY')
                }
                this.recommendList = data.recommendList
            })
        },
        getSortList(){
            this.$http({
                url: 'sorts/list'
            }).then(({data}) => {
                this.sortList = data.page.list
            })
        }
    },
}
</script>

<style scoped lang="less">
.body{
    font-family: PingFang SC,微软雅黑;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.content_right{
    margin: 0 0 0 10px;
    padding: 0 0 0 20px;
    box-sizing: border-box;
    width: 400px;
    float: left;
}
.el-divider{
    margin-top: 40px !important;
}
.recommend_list{
    margin: 15px 0;
    padding-bottom: 14px;
    // border-bottom: 1px solid #eee;
    cursor: pointer;
}
.recommend_list a{
    text-decoration: none;
    font-size: 15px;
    color: #333333;
    margin-bottom: 20px;
    display: inline-block;
    border-bottom: 1px solid #F0F4F4;
}
.recommend_list_msg{
    color: #999999;
    font-size: 14px;
    margin: 10px 0;
}
.recommend_list_title{
    padding-bottom: 10px;
    font-weight: 700;
}
.recommend_list_title:hover{
    color: #7CE577;
}
.recommend h3{
    color: #333333;
    font-size: 19px;
    padding: 10px 0;
    margin: 20px 0 0 0;
}
.el-button{
    border-radius: 20px !important;
}
.item_type{
    margin-bottom: 5px;
    display: inline-block;
    vertical-align: middle;
    padding: 5px 10px;
    position: relative;
    width: 70px;
    height: 17px;
}
.item_desc{
    color: #999999;
    font-size: 14px;
    // float: left;
}
.item_content{
    float: left;
    width: 650px;
    height: 100%;
    box-sizing: border-box;
}
.content{
    width: 1200px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 20px;
}
.content_left a{
    text-decoration: none;
    color: #333333;
    height: 160px;
    border-bottom: 1px solid #eee;
    margin: 12px 0;
    box-sizing: border-box;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}
.content_left a:hover{
    color: #82CE57;
}
.content_left{
    width: 790px;
    float: left;
}
.item_img img{
    float: right;
    padding: 20px;
}
.content_left h3{
    padding: 10px 0px;
    font-size: 19px;
    color: #333333;
    margin-bottom: 10px;
}
.item_info h4{
    margin: 0 0 10px;
}

.item_msg{
    color: #999999;
    font-size: 14px;
    line-height: 40px;
    height: 20px;
    float: left;
}
.item_msg span{
    margin: 0 10px 0 0;
}
.content_right{
    width: 400px;
    margin: 0 0 0 10px;
}
.type_icon{
    width: 22px;
    height: 22px;
    background-color: #7CE577;
    border-radius: 50%;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    float: left;
    transform: translateY(-50%);
    left: 0;
    top: 50%;
    position: absolute;
}
.sort_p{
    float: left;
    position: absolute;
    top: 50%;
    left: 28px;
    transform: translateY(-50%);
}
header{
    display: flex;
    justify-content: center;
    box-shadow: 2px 4px 6px #ededee;
    background-color: #4A8230;
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
.card image{
    width: 100%;
    display: block;
}
.container{
    width: 1200px;
    margin: 30px auto;

}
.slideShow{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.carousel{
    width: 790px;
}
.card{
    width: 400px;
    height: 330px;
    margin: 0 0 0 10px;
}
.Sortlink{
    padding: 5px;
}
.Sortlink .el-link{
    margin: 10px 5px 0 5px;
}

</style>
