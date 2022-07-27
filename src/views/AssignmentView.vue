<template>
<h1>{{assignment.name}}</h1>
</template>

<script>
const axios = require("axios").default;

export default {
  name: "AssignmentView",
  components: {

  },
  data() {
    return {
      loading: true,
      assignment: {},
      course: {
        name: "Loading Course Name"
      }
    };
  },
  async created() {
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
        `https://canvasapi.toddr.org/api/assignments/${this.$route.params.courseID}/${this.$route.params.assignmentID}`,
        {
          auth: {
            username: this.$store.state.user.email,
            password: this.$store.state.user.password,
          },
        }
      );
      console.log("Response: ", response.data.data);
      this.assignment = response.data.data;
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
        text: `Assignment ${this.assignment.id}`,
        disabled: false,
        href: `/assignment/${this.$route.params.courseID}/${this.$route.params.assignmentID}`
      }
    ]);
    this.loading = false;
  },
};
</script>