<template>
  <div class="profile">
    <h1>This is a profile</h1>
  </div>
</template>

<script>
export default {
  name: "ProfileView",
  created() {
    // console.log("Setting breadcrumbs from announcements");
    this.$store.commit("SET_BREADCRUMBS", [
      {
        text: "Profile",
        disabled: false,
        href: "profile",
      },
    ]);
  },
};
</script>
