<template>
  <div class="courses">
    <h1>This is the courses view</h1>
  </div>
</template>

<script>
export default {
  name: "CoursesView",
  created() {
    // console.log("Setting breadcrumbs from announcements");
    this.$store.commit("SET_BREADCRUMBS", [
      {
        text: "Courses",
        disabled: false,
        href: "courses",
      },
    ]);
  },
};
</script>
