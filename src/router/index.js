import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import Charts from '@/components/Charts.vue'

const charts = () => import(/* webpackChunkName: "about" */ '@/views/ChartView.vue')
const data = () => import(/* webpackChunkName: "about" */ '@/views/DataView.vue')
const chartOptions = () => import(/* webpackChunkName: "about" */ '@/components/charts/ChartOptions.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main view',
    component: () => import(/* webpackChunkName: "about" */ '@/views/MainView.vue')
  },
  {
    path: '/charts',
    name: 'chart view',
    component: charts,
    props: true
  },
  {
    path: '/data',
    name: 'data view',
    component: data,
    props: true
  },
  {
    path: '/options',
    name: 'chart options',
    component: chartOptions,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
