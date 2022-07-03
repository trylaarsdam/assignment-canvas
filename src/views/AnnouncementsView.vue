<template>
  <div class="announcements" v-if="!loading">
    <h1 style="padding-bottom: 1rem">All Announcements</h1>
    <div
      class="announcementsContainer"
      v-for="item in announcements"
      :key="item.id"
    >
      <AnnouncementFeedCard :announcement="item" />
    </div>
  </div>
  <div class="loading" v-else>
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
import axios from "axios";
import AnnouncementFeedCard from "../components/AnnouncementFeedCard.vue";

export default {
  name: "AnnouncementsView",
  components: {
    AnnouncementFeedCard,
  },
  data() {
    return {
      announcements: [],
      loading: true,
    };
  },
  async created() {
    // console.log("Setting breadcrumbs from announcements");
    this.$store.commit("SET_BREADCRUMBS", [
      {
        text: "Announcements",
        disabled: false,
        href: "/announcements",
        // to: "/announcements",
        exact: true,
      },
    ]);

    try {
      const response = await axios.get(
        "https://api.canvas.toddr.org/api/announcements",
        {
          auth: {
            username: this.$store.state.user.email,
            password: this.$store.state.user.password,
          },
        }
      );
      console.log("Response: ", response.data.data);
      this.announcements = response.data.data;
      this.loading = false;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style local>
h1 {
  color: white;
}
.announcementsContainer {
  padding-bottom: 1rem;
}
.loading {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
