<template>
  <div class="home">
    <AppBar />
  </div>
</template>

<script>
// @ is an alias to /src
import AppBar from "@/components/AppBar.vue";

export default {
  name: "HomeView",
  components: {
    AppBar,
  },
};
</script>
