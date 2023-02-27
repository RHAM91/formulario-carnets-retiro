import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'
import Lista from '@/views/Lista.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: '/main',
  },
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
  },
  {
    path: '/lista',
    name: 'Lista',
    component: Lista
  }
]

const router = new VueRouter({
  routes
})

export default router
