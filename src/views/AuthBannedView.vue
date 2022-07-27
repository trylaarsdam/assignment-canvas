<template>
  <v-alert
    type="error"
  >
    Your account has been banned from Assignment Canvas. For more information contact support at admin@toddr.org.
  </v-alert>
</template>

<script>

export default {
  name: "AdminView",
  async created() {
    // console.log("Setting breadcrumbs from announcements");
    this.$store.commit("SET_BREADCRUMBS", [
      
    ]);
  },
  components: {
    
  },
  data() {
    return {
      
    };
  },
};
</script>
