<template>
  <div class="UserCard">
    <v-card color="#272727" dark>
      <v-card-title class="text-h6">
        <v-icon class="iconButtonPadding"> mdi-account </v-icon
        >{{ this.user.name }}
      </v-card-title>

      <v-card-subtitle
        class="userContent"
        v-html="this.user.email"
      ></v-card-subtitle>

      <!-- <v-card-actions>
        <v-btn text :to="'/user/' + parseInt(this.user.id)"> View </v-btn>
         <v-btn text> Open in Canvas </v-btn> -->
      <!-- </v-card-actions> -->
    </v-card>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    user: Object,
  },
};
</script>

<style local>
.userContent {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
