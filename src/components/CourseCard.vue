<template>
  <div class="CourseCard">
    <v-card
      dark
    >
      <v-card-title class="text-h5"> {{ this.course.name }} </v-card-title>

      <v-card-subtitle>{{ this.course.course_code }}</v-card-subtitle>

      <v-card-actions>
        <v-btn text :to="'/course/' + parseInt(this.course.id)"> View </v-btn>
        <!-- <v-btn text> Open in Canvas </v-btn> -->
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "CourseCard",
  props: {
    course: {
      name: String,
      courseCode: String,
      courseColor: String,
    },
  },
};
</script>
