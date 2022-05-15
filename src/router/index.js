import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/feed',
    name: 'feed',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/FeedView.vue')
  },
  {
    path: "/announcements",
    name: "announcements",
    component: () => import(/* webpackChunkName: "about" */ '../views/AnnouncementsView.vue')
  },
  {
    path: "/courses",
    name: "courses",
    component: () => import(/* webpackChunkName: "about" */ '../views/CoursesView.vue')
  },
  {
    path: "/assignments",
    name: "assignments",
    component: () => import(/* webpackChunkName: "about" */ '../views/AssignmentsView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
