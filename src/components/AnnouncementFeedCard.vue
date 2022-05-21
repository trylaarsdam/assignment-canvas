<template>
  <v-card class="mx-auto" dark>
    <v-list-item>
      <v-list-item-content>
        <div class="text-overline mb-4">
          {{ this.announcement.course.name }}
        </div>
        <v-list-item-title class="text-h5 mb-1">
          {{ this.announcement.title }}
        </v-list-item-title>
        <v-list-item-subtitle
          class="announcementContent"
          v-html="this.announcement.message"
        ></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn text :to="'/announcement/' + parseInt(this.announcement.id)">
        View
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AnnouncementFeedCard",
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
