<template>
  <div class="announcements" v-if="!loading">
    <h1 style="padding-bottom: 1rem">All Assignments</h1>
    <div
      class="announcementsContainer"
      v-for="item in assignments"
      :key="item.id"
    >
      <AssignmentCard :assignment="item" />
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
import AssignmentCard from "../components/AssignmentCard.vue";

export default {
  name: "AssignmentsView",
  components: {
    AssignmentCard,
  },
  data() {
    return {
      announcements: [],
      loading: true,
    };
  },
  async created() {
    if(this.$store.state.user.banned) {
      this.$router.push("/auth/banned")
    }
    // console.log("Setting breadcrumbs from announcements");
    this.$store.commit("SET_BREADCRUMBS", [
      {
        text: "Assignments",
        disabled: false,
        href: "/assignments",
        // to: "/announcements",
        exact: true,
      },
    ]);

    try {
      const response = await axios.get(
        "https://canvasapi.toddr.org/api/assignments",
        {
          auth: {
            username: this.$store.state.user.email,
            password: this.$store.state.user.password,
          },
        }
      );
      console.log("Response: ", response.data.data);
      this.assignments = response.data.data;
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
