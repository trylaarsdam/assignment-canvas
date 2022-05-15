<template>
  <div class="CourseCard">
    <v-card
      :color="this.assignment.color == null ? '#1876D1' : this.assignment.color"
      dark
    >
      <v-card-title class="text-h5"> {{ this.assignment.title }} </v-card-title>

      <v-card-subtitle>{{ this.assignment.content }}</v-card-subtitle>

      <v-card-actions>
        <v-btn text :to="'/assignment/' + parseInt(this.course.id)">
          More Info
        </v-btn>
        <!-- <v-btn text> Open in Canvas </v-btn> -->
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "AssignmentCard",
  props: {
    assignment: {
      title: String,
      content: String,
      author: String,
      color: String,
      points: Number,
    },
  },
};
</script>
