import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/components/indexs/index'
import meizi from '@/components/vivew/meizi'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/indexs/index',
      name: 'indexs',
      component: index
    },
    {
      path:'/vivew/meizi',
      name:'meizi',
      component:meizi
    }
  ]
})
