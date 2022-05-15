<template>
  <div class="courseViewContainer" v-if="!loading">
    <v-card dark>
      <v-toolbar>
        <v-toolbar-title> {{ this.course.name }} </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn
          :color="this.filter.announcements ? 'teal' : 'gray'"
          class="buttonPadding"
          flat
          @click="announcementClick"
        >
          <v-icon class="iconButtonPadding">
            mdi-message-reply-text-outline
          </v-icon>
          Announcements
        </v-btn>
        <v-btn
          :color="this.filter.assignments ? 'teal' : 'gray'"
          class="buttonPadding"
          flat
          @click="assignmentClick"
        >
          <v-icon class="iconButtonPadding"> mdi-note-edit-outline </v-icon>
          Assignments
        </v-btn>
        <v-btn v-click="" class="buttonPadding" flat>
          <v-icon class="iconButtonPadding">mdi-account-group</v-icon>
          Roster
        </v-btn>

        <v-btn flat>
          <v-icon class="iconButtonPadding">mdi-share</v-icon>
          Open Canvas
        </v-btn>
      </v-toolbar>
      <div class="assignmentContainer">
        <div
          v-for="assignment in assignments"
          :key="assignment.id"
          class="assignmentCardContainer"
        >
          <AssignmentCard
            :assignment="assignment"
            style="padding-bottom: 10px"
          />
        </div>
      </div>
    </v-card>
  </div>
  <div class="loading" v-else>
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
const axios = require("axios").default;
import AssignmentCard from "../components/AssignmentCard.vue";

export default {
  name: "CourseView",
  components: {
    AssignmentCard,
  },
  data() {
    return {
      loading: true,
      course: {
        name: "Unknown Course",
      },
      filter: {
        assignments: true,
        announcements: true,
      },
      assignments: [],
      announcements: [],
    };
  },
  methods: {
    assignmentClick() {
      this.filter.assignments = !this.filter.assignments;
    },
    announcementClick() {
      this.filter.announcements = !this.filter.announcements;
    },
  },
  async created() {
    // console.log("Setting breadcrumbs from announcements");
    console.log("course id", this.id);
    try {
      const response = await axios.get(
        "http://10.128.1.199:7001/api/courses/" + this.$route.params.id,
        {
          auth: {
            username: "trylaarsdam",
            password: "test12345",
          },
        }
      );
      console.log("Response: ", response.data.data);
      this.course = response.data.data;
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await axios.get(
        "http://10.128.1.199:7001/api/courses/" +
          this.$route.params.id +
          "/assignments",
        {
          auth: {
            username: "trylaarsdam",
            password: "test12345",
          },
        }
      );
      console.log("Response: ", response.data.data);
      this.assignments = response.data.data;
    } catch (error) {
      console.error(error);
    }

    this.$store.commit("SET_BREADCRUMBS", [
      {
        text: "Courses",
        disabled: false,
        href: "/courses",
        exact: true,
        // to: "/announcements",
      },
      {
        text: this.course.name,
        disabled: false,
        href: "/course/" + this.$route.params.id,
        exact: true,
      },
    ]);
    this.loading = false;
  },
};
</script>

<style local>
.loading {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.assignmentContainer {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
.buttonPadding {
  margin-right: 10px;
}
.courseViewContainer {
  margin: -11px;
}
.iconButtonPadding {
  padding-right: 10px;
}
h2 {
  color: white;
}
h1 {
  color: white;
}
</style>
