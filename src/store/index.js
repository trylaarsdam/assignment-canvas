import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    breadcrumbs: [
      // {
      //   text: 'Dashboard',
      //   disabled: false,
      //   href: 'breadcrumbs_dashboard',
      // },
    ],
    user: {
      // id: "d596285e-0327-40fd-94f7-77c0ed5b630f",
      // name: "Todd Rylaarsdam",
      // email: "trylaarsdam22@georgefox.edu",
      // role: "Administrator",
      // password: "test13245",
      // username: "trylaarsdam",
      // canvasURL: "https://georgefox.instructure.com",
    },
    showAppBar: true,
  },
  getters: {
  },
  mutations: {
    SET_BREADCRUMBS(state, breadcrumbs) {
      // console.log("Setting breadcrumbs in store")
      state.breadcrumbs = breadcrumbs
    },
    APPEND_BREADCRUMB(state, breadcrumb) {
      state.breadcrumbs.push(breadcrumb)
    },
    POP_BREADCRUMB(state) {
      state.breadcrumbs.pop()
    },
    SET_USER(state, user) {
      state.user = user
    },
    SET_APP_BAR(state, showAppBar) {
      state.showAppBar = showAppBar
    }
  },
  actions: {

  },
  modules: {
  }
})
