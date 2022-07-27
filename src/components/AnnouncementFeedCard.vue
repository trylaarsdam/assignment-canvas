<template>
  <v-card class="mx-auto" dark>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{ this.announcement.title }}
          <router-link
            :to="'/course/' + parseInt(this.announcement.course.id)"
            style="text-decoration: none; padding: 0.5rem"
          >
            <v-chip color="primary" style="cursor: pointer">{{
              this.announcement.course.name
            }}</v-chip>
          </router-link>
          <v-chip color="secondary">{{
            this.announcement.author.display_name
          }}</v-chip>
        </v-list-item-title>
        <v-list-item-subtitle
          class="announcementContent"
          v-html="this.announcement.message"
        ></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn text :to="'/announcement/' + parseInt(this.announcement.course.id) + '/' + parseInt(this.announcement.id)">
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
  -webkit-line-clamp: 5; /* number of lines to show */
  line-clamp: 5;
  -webkit-box-orient: vertical;
}
</style>
