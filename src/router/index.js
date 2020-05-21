import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/index.vue'
import Articles from '../components/Blog/articles.vue'
import Sort from '../components/Sort/sorts.vue'
import Tag from '../components/tag/labels.vue'
import ArticlesAddOrUpdate from '../components/Blog/articles-add-or-update.vue'
import Login from '../components/User/Login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    component: Index,
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
        component: ArticlesAddOrUpdate
      }
    ]
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from ,next) => {
  if(to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('login')
  next()
})
export default router
