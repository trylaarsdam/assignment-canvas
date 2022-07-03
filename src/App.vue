<template>
  <v-app>
    <v-navigation-drawer app dark permanent v-if="this.$store.state.showAppBar">
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://cdn.toddr.org/assets/images/t-logo.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Assignment Canvas
            </v-list-item-title>
            <v-list-item-subtitle>v2.0.0b</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item link to="/feed">
          <v-list-item-icon>
            <v-icon>mdi-rss</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Feed</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/courses">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>My Courses</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/announcements">
          <v-list-item-icon>
            <v-icon>mdi-message-reply-text-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Announcements</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/assignments">
          <v-list-item-icon>
            <v-icon>mdi-note-edit-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Assignments</v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list nav dense>
          <v-list-item link to="/profile">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
        </v-list>

        <div class="pa-2">
          <v-btn block> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app dark v-if="this.$store.state.showAppBar">
      <!-- -->
      <v-breadcrumbs
        dark
        :items="this.$store.state.breadcrumbs"
      ></v-breadcrumbs>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main style="background-color: #111">
      <!-- Provides the application the proper gutter -->
      <v-container fluid v-if="this.$store.state.showAppBar">
        <!-- If using vue-router -->
        <router-view>
          <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
          </nav>
        </router-view>
      </v-container>
      <router-view v-else> </router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      right: null,
    };
  },
};
</script>

<style local>
.fixedBottom {
  position: fixed !important;
  bottom: 0 !important;
  width: 100%;
}
html {
  background-color: #111;
  overscroll-behavior-y: none;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; /* enables “momentum” (smooth) scrolling */
}
</style>

<style>
h2 {
  color: white;
}
h1 {
  color: white;
}
p {
  color: white;
}
</style>
