import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Ad from '../views/ads/Ad'
import AdList from '../views/ads/AdList'
import NewAd from '../views/ads/NewAd'
import Login from '../views/auth/Login'
import Registration from '../views/auth/Registration'
import Orders from '../views/Orders'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home,
    },
    {
      path: '/ad/:id',
      name: 'ad',
      component: Ad,
    },
    {
      path: '/list',
      name: 'list',
      component: AdList,
    },
    {
      path: '/new',
      name: 'newAd',
      component: NewAd,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/registration',
      name: 'reg',
      component: Registration,
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
    },
  ],
  mode: 'history',
  base: process.env.BASE_URL,
})

export default router
