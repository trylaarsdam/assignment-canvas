<template>
  <div class="AnnouncementContent">
    <v-card color="#272727" dark>
      <v-card-title class="text-h6">
        <v-icon class="iconButtonPadding">
          mdi-message-reply-text-outline </v-icon
        >{{ this.announcement.title }}
      </v-card-title>

      <v-card-subtitle
        class="announcementContent"
        v-html="this.announcement.message"
      ></v-card-subtitle>

      <v-card-actions>
        <v-btn text :to="'/announcement/' + parseInt(this.announcement.id)">
          View
        </v-btn>
        <!-- <v-btn text> Open in Canvas </v-btn> -->
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "AnnouncementCard",
  props: {
    announcement: Object,
  },
};
</script>

<style local>
.announcementContent {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
