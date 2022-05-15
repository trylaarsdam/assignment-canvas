<template>
  <v-app>
    <v-navigation-drawer app dark permanent>
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
            <v-list-item-subtitle>v2.0-beta1</v-list-item-subtitle>
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
    </v-navigation-drawer>

    <v-app-bar app dark>
      <!-- -->
      <v-breadcrumbs
        dark
        :items="this.$store.state.breadcrumbs"
      ></v-breadcrumbs>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view>
          <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
          </nav>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Photos", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" },
      ],
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
</style>
