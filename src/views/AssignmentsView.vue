<template>
  <div class="assignments">
    <h1>This is the assignments view</h1>
  </div>
</template>

<script>
export default {
  name: "AssignmentsView",
  created() {
    // console.log("Setting breadcrumbs from announcements");
    this.$store.commit("SET_BREADCRUMBS", [
      {
        text: "Assignments",
        disabled: false,
        href: "assignments",
      },
    ]);
  },
};
</script>
