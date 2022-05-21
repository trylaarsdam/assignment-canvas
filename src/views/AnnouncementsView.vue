<template>
  <div class="announcements">
    <h1>This is the announcements view</h1>
  </div>
</template>

<script>
export default {
  name: "AnnouncementsView",
  created() {
    // console.log("Setting breadcrumbs from announcements");
    this.$store.commit("SET_BREADCRUMBS", [
      {
        text: "Announcements",
        disabled: false,
        href: "/announcements",
        // to: "/announcements",
        exact: true,
      },
    ]);
  },
};
</script>


