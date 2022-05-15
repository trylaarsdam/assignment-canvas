<template>
  <div></div>
</template>

<script>
const axios = require("axios").default;

export default {
  name: "CourseView",
  props: ["id"],
  data() {
    return {
      assignments: [],
      announcements: [],
    };
  },
  async created() {
    // console.log("Setting breadcrumbs from announcements");
    try {
      const response = await axios.get(
        "http://10.128.1.199:7001/api/courses/assignments/" + this.id,
        {
          auth: {
            username: "trylaarsdam",
            password: "test12345",
          },
        }
      );
      console.log("Response: ", response.data.data);
      this.courses = response.data.data;
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
        text: "Course",
        disabled: true,
        href: "/course/" + this.id,
        exact: true,
      },
    ]);
  },
};
</script>
