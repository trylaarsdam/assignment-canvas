<template>
  <div class="AssignmentCard">
    <v-card color="#272727" dark>
      <v-card-title>
        <v-row no-gutters>
          <v-col cols="12" sm="8">
            <p><v-icon class="iconButtonPadding"> mdi-note-edit-outline </v-icon>{{assignment.name}}</p>
          </v-col>
          <v-col cols="12" sm="4" style="margin: auto;">
            <p style="font-size: 16px;">Points: {{assignment.points_possible}} | Due: {{assignment.due_at == null ? "None" : assignment.due_at}}</p>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-subtitle
        class="assignmentContent"
        v-html="this.assignment.description"
      ></v-card-subtitle>

      <v-card-actions>
        <v-btn text :to="`/assignment/${parseInt(this.assignment.course.id)}/${parseInt(this.assignment.id)}`">
          View
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
    assignment: Object,
  },
};
</script>

<style local>
.assignmentContent {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
