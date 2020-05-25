<template>
    <div>
        <div class="wrapper">
            <div class="profile-card">
                <div class="content">
                    <nav id="nav-menu">
                        <a class="" href="#" @click="handlerMenuItemClick" data-rel="about-me-section">个人简介</a>
                        <a href="#"  @click="handlerMenuItemClick" data-rel="work-exp-section">工作经历</a>
                        <div class="indicator"></div>
                    </nav>
                    <section class="about-me-section active-section">
                        <div class="personal-info">
                            <div class="title">
                                <h1>何育堂</h1>
                                <p>全栈工程师</p>
                            </div>
                            <button class="follow-btn">
                                <font-awesome-icon :icon="['fas', 'star']" />关注
                            </button>
                        </div>
                        <div class="about-me">
                            <p>我们所经历的每个平凡的日常，也许就是连续发生的奇迹。你不能奢求任何事物永远屹立在那里，
                                在行星划过的夜，连太阳照常升起，一切如昨都是上帝莫大的恩赐。 今天开始认真而感恩地度过每一天。</p>
                        </div>
                        <footer>
                            <ul>
                                <li><a href="#"><font-awesome-icon :icon="['fab', 'weixin']" /></a></li>
                                <li><a href="#"><font-awesome-icon :icon="['fab', 'weibo']"/></a></li>
                                <li><a href="#"><font-awesome-icon :icon="['fab', 'github']"/></a></li>
                                <li><a href="#"><font-awesome-icon :icon="['fab', 'linkedin']"/></a></li>
                            </ul>
                        </footer>
                    </section>
                    <section class="work-exp-section">
                        <div class="work-exps">
                            <div class="work-exps-item">
                                <div class="position">全栈工程师</div>
                                <div class="seperator"></div>
                                <div class="work-info">
                                    <div class="time">
                                        2018.07 ~ 2019.08 <font-awesome-icon :icon="['fas', 'calendar']" />
                                    </div>
                                    <div class="company">家里蹲互联网公司</div>
                                </div>
                            </div>

                            <div class="work-exps-item">
                                <div class="position">全栈工程师</div>
                                <div class="seperator"></div>
                                <div class="work-info">
                                    <div class="time">
                                        2018.07 ~ 2019.08 <font-awesome-icon :icon="['fas', 'calendar']" />
                                    </div>
                                    <div class="company">家里蹲互联网公司</div>
                                </div>
                            </div>

                            <div class="work-exps-item">
                                <div class="position">全栈工程师</div>
                                <div class="seperator"></div>
                                <div class="work-info">
                                    <div class="time">
                                        2018.07 ~ 2019.08 <font-awesome-icon :icon="['fas', 'calendar']" />
                                    </div>
                                    <div class="company">家里蹲互联网公司</div>
                                </div>
                            </div>

                        </div>
                    </section>
                </div>
                <aside class="profile-image">
                    <img src="../../assets/banner03.jpg" alt="">
                </aside>
            </div>
        </div>
    </div>
</template>

<script>
import 'font-awesome/css/font-awesome.min.css'

export default {
    data() {
        return {
            isActive: true,

        };
    },
    methods: {
        
    },
    methods: {
        handlerMenuItemClick(e){
            const navMenuItems = document.querySelectorAll('#nav-menu a')
            const indicator = document.querySelector('.indicator')
            navMenuItems.forEach(item => {
                item.classList.remove('active')
                item.style = ""
            })
            e.target.classList.add('active')
            indicator.style.width = `${e.target.offsetWidth}px`
            indicator.style.left = `${e.target.offsetLeft}px`

            const currentSection = document.querySelector('.active-section')
            currentSection.classList.remove('active-section')

            const newCurrentSection = document.querySelector(`.${e.target.getAttribute('data-rel')}`)
            newCurrentSection.classList.add('active-section')
        },
        
    },
    components: {

    },
}
</script>

<style scoped lang="less">
// @import url('https://fonts.font.im/css?family=Roboto');

:root{
    --primary-color-: #71b3dd;
    --primary-dark-color: #4489b5;
    --text-color-gray: #8b979f;
    --text-color-light-gray: #c1c7cb;
    --text-color-dark-gray: #5a6f7c;
}

*{
    margin: 0;
    padding: 0;
    font-size: 14px;
    box-sizing: border-box;
    font-family: "Roboto","PingFang SC","Microsoft Yahei",sans-serif;
    line-height: 20px;
}

.wrapper{
    display: grid;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.profile-card{
    display: grid;
    grid-template-columns: repeat(12,1fr);
    column-gap: 12px;

    width: 627px;
    height: 374px;
    box-shadow: 0px 0px 22px 3px rgba(0, 0, 0, 0.18);
}

.profile-image{
    grid-column-start: 8;
    grid-column-end: 13;
    max-width: 238px;
    overflow: hidden;
    height: 100%;
    align-self: start;
    justify-self: end;
}

.profile-image img{
    width: 210%;
    transform: translate(-25px,-100px);
    object-fit: cover;
    height: 127%;
}

.content{
    grid-column-start: 1;
    grid-column-end: 8;
    padding: 38px 28px 20px 33px;
    position: relative;
}
nav{
    margin-bottom: 24px;
    display: flex;
    position: relative;
}

nav a{
    color: #8b979f;
    text-decoration: none;
}
nav a.active{
    color: #4489b5;
}
nav a:not(:last-child){
    margin-right: 40px;
}
nav .indicator{
    height: 2px;
    width: 75px;
    background: #4489b5;
    position: absolute;
    bottom: -7px;
    left: 0;
    transition: 0.4s;
}

.content section {
    position: absolute;
    opacity: 0;
    transition: 0.3 ease-out;
}

.content section.active-section{
    opacity: 1;
}

.personal-info{
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.title h1{
    font-size: 2em;
    font-weight: 500;
}

.title p {
    color: #8b979f;
    margin: 6px 0 18px 0;
}

.follow-btn{
    justify-self: end;
    height: 30px;
    background-color: #71b3dd;
    border: none;
    color: white;
    padding: 0 27px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 30px;
}

.follow-btn .fas{
    font-size: 10px;
    margin-right: 6px;
}

.about-me{
    color: #5a6f7c;
    font-weight: 300;
    text-align: justify;
}

footer{
    margin-top: 70px;
}

footer ul{
    display: flex;
}

footer ul li{
    list-style: none;
}

footer ul li:not(:last-child){
    margin-right: 30px;
}

footer .fab{
    color:  #71b3dd;
    font-size: 24px;
}

.work-exps {
    color: #8b979f;
    display: grid;
    grid-template-rows: repeat(3,minmax(80px,auto));
}

.work-exps-item{
    display: grid;
    grid-template-columns: 5fr 1fr 7fr;
    align-items: center;
    justify-content: center;
}

.position{
    font-size: 18px;
    font-weight: 500;
}

.seperator{
    height: 43px;
    border-left: 2px dotted #eaeff2;
}

.time{
color: #c1c7cb;
}

.company{
    font-size: 14px;
    margin-top: 9px;
    color: #5a6f7c;
}
</style>
