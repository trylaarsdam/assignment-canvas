<template>
  <div class="feed">
    <h1>This is a feed</h1>
  </div>
</template>

<script>
export default {
  name: "FeedView",
  created() {
    // console.log("Setting breadcrumbs from announcements");
    this.$store.commit("SET_BREADCRUMBS", [
      {
        text: "Feed",
        disabled: false,
        href: "feed",
      },
    ]);
  },
};
</script>
