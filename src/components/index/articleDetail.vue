<template>
    <div class="container">
        <el-backtop></el-backtop>
        <remote-css  href="https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css"></remote-css>
        <div class="navbar">
            <el-avatar :src="avatar"></el-avatar>
            <ul class="menu">
                <li><a @click="toIndex">首页</a></li>
                <li><a>技术杂谈</a></li>
                <li><a>心情随笔</a></li>
                <li><a>友情链接</a></li>
                <li><a>关于我</a></li>
            </ul>
        </div>
        <div class="img_container">
            <h2 v-text="article.articleTitle"></h2>
            <p></p>
        </div>
        <div class="markdown-body customer_body" v-html="article.articleContent" v-highlight></div>

    </div>
</template>

<script>
import 'mavon-editor/dist/markdown/github-markdown.min.css'

export default {
    props: {

    },
    data() {
        return {
            article: {},
            avatar: 'https://pic2.zhimg.com/80/v2-1e78d8115e803957facb3c2783eec15c_720w.jpg'
        }
    },
    components: {
        'remote-css': {
            render(createElement) {            
              return createElement('link', { attrs: { rel: 'stylesheet', href: this.href }});
            },
            props: {
            href: { type: String, required: true },
            },
        }
    },
    created() {
        this.getArticle()
    },
    methods: {
        getArticle(){
            this.$http({
                url: `articles/info/${this.$route.query.articleId}`,
            }).then(({data}) => {
                console.log(data)
                this.article = data.articles
            })
        },
        toIndex(){
            this.$router.push('/index')
        }
    },
}
</script>

<style scoped lang="less">
.container{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.el-avatar{
    margin-right: 100px;
}
.navbar{
    height: 80px;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    justify-items: end;
    align-items: center;
    background-color: #5B973D;
    box-shadow: 2px 10px 6px #ededee;
}
.menu{
    display: grid;
    grid-template-columns: repeat(5,1fr);
}
.menu li{
    list-style: none;    
}
.menu li a{
    text-decoration: none;
    color: #333333;
    font-size: 18px;
    font-weight: 300px;
    font-family: sans-serif;
    padding: 5px 10px;
    cursor: pointer;
}
.menu li a:hover{
    border-bottom: 2px solid #7CE577;
}
.customer_body{
    width: 1200px;
    margin: 50px auto;
}
.img_container{
    height: 600px;
    width: 100%;
    background: url(../../assets/banner02.jpg) no-repeat center center/cover;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
}
.img_container h2{
    font-size: 20px;
    font-weight: 500;
}
</style>
