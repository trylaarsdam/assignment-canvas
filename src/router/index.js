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
    component: () => import(/* webpackChunkName: "feed" */ '../views/FeedView.vue')
  },
  {
    path: "/announcements",
    name: "announcements",
    component: () => import(/* webpackChunkName: "announcements" */ '../views/AnnouncementsView.vue')
  },
  {
    path: "/courses",
    name: "courses",
    component: () => import(/* webpackChunkName: "courses" */ '../views/CoursesView.vue')
  },
  {
    path: "/assignments",
    name: "assignments",
    component: () => import(/* webpackChunkName: "assignments" */ '../views/AssignmentsView.vue')
  },
  {
    path: "/course/:id",
    name: "course",
    component: () => import(/* webpackChunkName: "course" */ '../views/CourseView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
