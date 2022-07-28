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
    path: "/profile",
    name: "profile",
    component: () => import(/* webpackChunkName: "profile" */ "../views/ProfileView.vue")
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
    path: "/assignment/:courseID/:assignmentID",
    name: "assignment",
    component: () => import(/* webpackChunkName: "assignments" */ '../views/AssignmentView.vue')
  },
  {
    path: "/announcement/:courseID/:announcementID",
    name: "announcement",
    component: () => import(/* webpackChunkName: "announcements" */ '../views/AnnouncementView.vue')
  },
  {
    path: "/course/:id",
    name: "course",
    component: () => import(/* webpackChunkName: "course" */ '../views/CourseView.vue')
  },
  {
    path: "/course/:id/roster",
    name: "course-roster",
    component: () => import(/* webpackChunkName: "course-roster" */ '../views/CourseRosterView.vue')
  },
  {
    path: "/admin",
    name: "admin-panel",
    component: () => import(/* webpackChunkName: "admin-panel" */ "../views/AdminView.vue")
  },
  {
    path: "/user/:id",
    name: "user-manager"
  },
  {
    path: "/auth/banned",
    name: "banned",
    component: () => import(/* webpackChunkName: "admin-panel" */ "../views/AuthBannedView.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
