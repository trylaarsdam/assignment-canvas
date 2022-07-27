<template>
  <div class="courses" v-if="!loading">
    <h1>All Courses</h1>
    <div class="courseContainer" v-for="item in courses" :key="item.id">
      <CourseCard :course="item" />
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
import CourseCard from "../components/CourseCard.vue";
const axios = require("axios").default;

export default {
  name: "CoursesView",
  data: () => ({
    courses: [],
    loading: true
  }),
  components: {
    CourseCard,
  },
  async created() {
    if(this.$store.state.user.banned) {
      this.$router.push("/auth/banned")
    }
    // console.log("Setting breadcrumbs from announcements");
    this.$store.commit("SET_BREADCRUMBS", [
      {
        text: "Courses",
        disabled: false,
        href: "courses",
      },
    ]);

    try {
      const response = await axios.get(
        "https://canvasapi.toddr.org/api/courses",
        {
          auth: {
            username: this.$store.state.user.email,
            password: this.$store.state.user.password,
          },
        }
      );
      console.log("Response: ", response.data.data);
      this.courses = response.data.data;
    } catch (error) {
      console.error(error);
    }
    this.loading = false;
  },
};
</script>

<style local>
h2 {
  color: white;
}
h1 {
  color: white;
}
.courseContainer {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.loading {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
