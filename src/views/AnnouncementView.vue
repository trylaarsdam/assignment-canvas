<template>
  <div v-if="!loading">
    <v-row no-gutters>
      <v-col cols="12" sm="8">
        <h1>{{announcement.title}}</h1>
      </v-col>
      <v-col cols="12" sm="4" style="margin: auto;">
        <p>Created By: {{announcement.author.display_name}}</p>
        <p>Posted: {{announcement.posted_at}}</p>
      </v-col>
    </v-row>
    <v-divider dark style="padding: 0.5rem;" />
    <p v-html="announcement.message" />
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
const axios = require("axios").default;

export default {
  name: "AnnouncementView",
  components: {

  },
  data() {
    return {
      loading: true,
      announcement: {},
      course: {
        name: "Loading Course Name"
      }
    };
  },
  async created() {
    if(this.$store.state.user.banned) {
      this.$router.push("/auth/banned")
    }
    // console.log("Setting breadcrumbs from announcements");
    try {
      const response = await axios.get(
        "https://canvasapi.toddr.org/api/courses/" + this.$route.params.courseID,
        {
          auth: {
            username: this.$store.state.user.email,
            password: this.$store.state.user.password,
          },
        }
      );
      console.log("Response: ", response.data.data);
      this.course = response.data.data;
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await axios.get(
        `https://canvasapi.toddr.org/api/announcements/${this.$route.params.courseID}/${this.$route.params.announcementID}`,
        {
          auth: {
            username: this.$store.state.user.email,
            password: this.$store.state.user.password,
          },
        }
      );
      console.log("Response: ", response.data.data.message);
      this.announcement = response.data.data;
    } catch (error) {
      console.error(error);
    }

    this.$store.commit("SET_BREADCRUMBS", [
      {
        text: `${this.course.name}`,
        disabled: false,
        href: `/course/${this.$route.params.courseID}`,
        exact: true,
        // to: "/announcements",
      },
      {
        text: `${this.announcement.title.substring(0, 30)}`,
        disabled: false,
        href: `/assignment/${this.$route.params.courseID}/${this.$route.params.announcementID}`
      }
    ]);
    this.loading = false;
  },
};
</script>

<style local>
.loading {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
