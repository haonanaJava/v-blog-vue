import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../components/index/admin.vue'
import Articles from '../components/Blog/articles.vue'
import Sort from '../components/Sort/sorts.vue'
import Tag from '../components/tag/labels.vue'
import ArticlesAddOrUpdate from '../components/Blog/articles-add-or-update.vue'
import Login from '../components/User/Login.vue'
import Index from '../components/index/Index.vue'
import ArticleDetail from '../components/index/articleDetail.vue'
import AboutMe from '../components/index/aboutMe.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    component: Admin,
    redirect: '/blog',
    children: [
      {
        path: '/blog',
        component: Articles
      },
      {
        path: '/sort',
        component: Sort
      },
      {
        path: '/tag',
        component: Tag
      },
      {
        path: '/addBlog',
        name: 'addBlog',
        component: ArticlesAddOrUpdate
      }
    ]
  },
  {
    path: '/aboutMe',
    component: AboutMe
  },
  {
    path: '/articleDetail',
    component: ArticleDetail
  },
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/index',
    component: Index
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from ,next) => {
  if(to.path === '/login' || to.path === '/' || to.path === '/index' || to.path.search('articleDetail') !== -1 || to.path === '/aboutMe') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('login')
  next()
})
export default router
