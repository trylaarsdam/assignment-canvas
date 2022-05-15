<template>
  <div class="courseContainer" v-if="!loading">
    <h1>{{ this.course.name }}</h1>
    <div class="assignmentContainer">
      <h2>Assignments</h2>
      <div
        v-for="assignment in assignments"
        :key="assignment.id"
        class="assignmentCardContainer"
      >
        <AssignmentCard :assignment="assignment" style="padding-bottom: 10px" />
      </div>
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
const axios = require("axios").default;
import AssignmentCard from "../components/AssignmentCard.vue";

export default {
  name: "CourseView",
  components: {
    AssignmentCard,
  },
  data() {
    return {
      loading: true,
      course: {
        name: "Unknown Course",
      },
      assignments: [],
      announcements: [],
    };
  },
  async created() {
    // console.log("Setting breadcrumbs from announcements");
    console.log("course id", this.id);
    try {
      const response = await axios.get(
        "http://10.128.1.199:7001/api/courses/" + this.$route.params.id,
        {
          auth: {
            username: "trylaarsdam",
            password: "test12345",
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
        "http://10.128.1.199:7001/api/courses/" +
          this.$route.params.id +
          "/assignments",
        {
          auth: {
            username: "trylaarsdam",
            password: "test12345",
          },
        }
      );
      console.log("Response: ", response.data.data);
      this.assignments = response.data.data;
    } catch (error) {
      console.error(error);
    }

    this.$store.commit("SET_BREADCRUMBS", [
      {
        text: "Courses",
        disabled: false,
        href: "/courses",
        exact: true,
        // to: "/announcements",
      },
      {
        text: this.course.name,
        disabled: false,
        href: "/course/" + this.$route.params.id,
        exact: true,
      },
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
h2 {
  color: white;
}
h1 {
  color: white;
}
</style>
