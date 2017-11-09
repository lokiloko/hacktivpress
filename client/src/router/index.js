import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Blog from '@/components/Blog'
import ArticleDetail from '@/components/ArticleDetail'
import ArticleList from '@/components/ArticleList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/',
      component: Blog,
      children: [
        {
          path: '',
          name: 'Home',
          component: ArticleList
        },
        {
          path: '/details/:id',
          name: 'Details',
          component: ArticleDetail,
          props: true
        }
      ]
    }
  ]
})
