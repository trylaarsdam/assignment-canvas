<template>
  <v-card color="#272727" dark style="padding: 0.5rem; border-radius: 10px; border: 2px solid #666;">
    <v-card-title class="text-h6" v-if="reply.deleted != true">
      {{ reply.user_id }}
    </v-card-title>

    <v-card-subtitle
      class="announcementContent"
      v-html="reply.message"
      v-if="reply.deleted != true"
    >
    </v-card-subtitle>
    <v-card-subtitle v-else>
      Deleted Reply
    </v-card-subtitle>
    <div v-for="nestedReply in reply.replies" :key="nestedReply.id">
      <ReplyView :reply="nestedReply" />
    </div>
  </v-card>
</template>

<script>
export default {
  name: "ReplyView",
  props: ["reply"]
}
</script>