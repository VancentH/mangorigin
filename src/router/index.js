import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/Main.vue'

import Home from '@/Home'
import Item from '@/item/index'
import ItemDetail from '@/components/ItemDetail'
import Cart from '@/Cart'
import Question from '@/Question/index'
import Board from '@/Board'
import Login from '@/Login'
import NotFoundComponent from '@/error/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: __dirname,
  linkActiveClass: 'active',
  routes: [
    {
      path: '*',
      name: 'NotFoundComponent',
      component: NotFoundComponent
    },
    {
      path: '/mangorigin_demo',
      component: Main,
      redirect: {
        name: 'Home'
      },
      children: [
        {
          path: '/mangorigin_demo/home',
          name: 'Home',
          component: Home,
          meta: { title: '首頁｜芒果原 MangOrigin' }
        },
        {
          path: '/mangorigin_demo/item',
          name: 'Item',
          component: Item,
          meta: { title: '商品列表｜芒果原 MangOrigin' }
        },
        {
          path: '/mangorigin_demo/item/:id',
          name: 'ItemDetail',
          component: ItemDetail,
          meta: { title: `商品｜芒果原 MangOrigin` }
        },
        {
          path: '/mangorigin_demo/cart',
          name: 'Cart',
          component: Cart,
          meta: { title: '購物車｜芒果原 MangOrigin' }
        },
        {
          path: '/mangorigin_demo/question',
          name: 'Question',
          component: Question,
          meta: { title: '常見問題｜芒果原 MangOrigin' }
        },
        {
          path: '/mangorigin_demo/board',
          name: 'Board',
          component: Board
        },
        {
          path: '/mangorigin_demo/Login',
          name: 'Login',
          component: Login,
          meta: { title: '管理員登入｜芒果原 MangOrigin' }
        }
      ]
      // redirect: {
      //   name: 'Home'
      // }
    }
  ]
})

export default router;