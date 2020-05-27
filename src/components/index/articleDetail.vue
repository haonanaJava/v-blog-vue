<template>
    <div class="container">
        <el-backtop></el-backtop>
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

        <div class="message_borad">
            <div class="message_form">
                <el-form ref="form" :model="messageForm" label-position="left"  label-width="80px" size="medium">
                    <el-form-item label="邮箱" prop="email">
                        <el-input type="email" v-model="messageForm.commentEmail"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="nickname">
                        <el-input type="text" v-model="messageForm.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="留言内容">
                        <el-input type="textarea" v-model="messageForm.commentContent" placeholder="留言..." maxlength="30" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item size="large">
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button>重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="message_list">
                <el-card v-for="(item,index) in messageList" :key="index">
                    <font-awesome-icon :icon="['fas','user-edit']"/>
                    <span id="nickname" v-text="item.nickname">向天再借5cm</span>
                    <p v-text="item.commentContent"></p>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import 'mavon-editor/dist/markdown/github-markdown.min.css'

export default {
    data() {
        return {
            article: {},
            avatar: 'https://pic2.zhimg.com/80/v2-1e78d8115e803957facb3c2783eec15c_720w.jpg',
            messageForm: {
                articleId: '',
                commentEmail: '',
                nickname: '',
                commentContent: ''
            },
            message_rule: {
                email: [
                    {required: true,message: '请输入邮箱',trigger: 'blur'},
                    {type: 'email', message: '请输入正确的邮箱格式',trigger: 'change'}
                ],
                nickname: [
                    {required: true,message: '请输入昵称',trigger: 'blur'},
                    {min: 3,max: 7,message: '长度在3到7个字符',trigger: 'change'}
                ]
            },
            messageList: [],
        }
    },
    created() {
        this.getArticle()
        this.getCommentList()
    },
    methods: {
        getArticle(){
            this.$http({
                url: `articles/info/${this.$route.query.articleId}`,
            }).then(({data}) => {
                this.article = data.articles
            })
        },
        toIndex(){
            this.$router.push('/index')
        },
        getCommentList(){
            this.$http({
                url: `comments/list_comment/${this.$route.query.articleId}`,
                method: 'get'
            }).then(({data}) => {
                if(data.code !== 0){
                    return this.$message.error('获取评论列表失败')
                }
                this.messageList = data.list
            })
        },
        onSubmit(){
            this.$http({
                url: `comments/save/${this.$route.query.articleId}`,
                method: 'post',
                data: this.messageForm
            }).then(({data}) => {
                if(data.code !== 0){
                    return this.$message.error('留言失败')
                }
                this.getCommentList()
                this.messageForm = {}
            })
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

.message_borad{
    width: 800px;
    margin: 0 auto;
    display: grid;
    grid-row: repeat(2,1fr);
}

.message_list{
}
.fa-user-edit{
    font-size: 20px;
}

#nickname{
    margin-left: 10px;
    font-size: 17px;
    font-weight: 600;
    color: #0C2A08;
}

.message_list p{
    margin: 10px 5px;
    line-height: 19px;
    color: #587B7F;
}

.el-card{
    margin: 10px 0 10px 0;
}
</style>
