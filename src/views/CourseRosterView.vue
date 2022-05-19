<template>
  <div class="courseViewContainer" v-if="!loading">
    <v-card dark>
      <v-toolbar>
        <v-toolbar-title> {{ this.course.name }} Roster </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn flat :to="'/course/' + this.$route.params.id">
          <v-icon class="iconButtonPadding">mdi-arrow-right</v-icon>
          Back to Course
        </v-btn>
      </v-toolbar>
      <div class="assignmentContainer">
        <div
          v-for="item in data"
          :key="JSON.stringify(item)"
          class="assignmentCardContainer"
        >
          <UserCard :user="item" style="padding-bottom: 10px" />
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
import UserCard from "../components/UserCard.vue";

export default {
  name: "CourseView",
  components: {
    UserCard,
  },
  data() {
    return {
      loading: true,
      course: {
        name: "Unknown Course",
      },
      data: [],
    };
  },
  methods: {},
  async created() {
    // console.log("Setting breadcrumbs from announcements");
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
          "/users",
        {
          auth: {
            username: "trylaarsdam",
            password: "test12345",
          },
        }
      );
      console.log("Response: ", response.data.data);
      this.assignments = response.data.data;
      this.data.push(...this.assignments);
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
      {
        text: "Roster",
        disabled: false,
        href: "/course/" + this.$route.params.id + "/roster",
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
