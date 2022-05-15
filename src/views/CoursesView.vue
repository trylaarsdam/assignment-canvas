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
      const response = await axios.get("http://10.128.1.199:7001/api/courses", {
        auth: {
          username: "trylaarsdam",
          password: "test12345",
        },
      });
      console.log("Response: ", response.data.data);
      this.courses = response.data.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
