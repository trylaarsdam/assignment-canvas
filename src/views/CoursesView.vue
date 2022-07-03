<template>
  <div class="courses">
    <h1>All Courses</h1>
    <div class="courseContainer" v-for="item in courses" :key="item.id">
      <CourseCard :course="item" />
    </div>
  </div>
</template>

<script>
import CourseCard from "../components/CourseCard.vue";
const axios = require("axios").default;

export default {
  name: "CoursesView",
  data: () => ({
    courses: [],
  }),
  components: {
    CourseCard,
  },
  async created() {
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
        "http://api.canvas.toddr.org/api/courses",
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
</style>
