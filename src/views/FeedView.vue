<template>
  <div class="courseViewContainer" v-if="!loading">
    <v-card dark>
      <v-toolbar>
        <v-toolbar-title> Your {{ this.course.name }} </v-toolbar-title>

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
      </v-toolbar>
      <div class="assignmentContainer">
        <div
          v-for="item in data"
          :key="JSON.stringify(item)"
          class="assignmentCardContainer"
        >
          <AssignmentCard
            v-if="item.discussion_type == undefined"
            :assignment="item"
            style="padding-bottom: 10px"
          />
          <AnnouncementFeedCard
            v-else
            :announcement="item"
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
import AnnouncementFeedCard from "../components/AnnouncementFeedCard.vue";

export default {
  name: "FeedView",
  components: {
    AssignmentCard,
    AnnouncementFeedCard,
  },
  data() {
    return {
      loading: true,
      course: {
        name: "Feed",
      },
      filter: {
        assignments: true,
        announcements: true,
      },
      data: [],
      assignments: [],
      announcements: [],
    };
  },
  methods: {
    assignmentClick() {
      let newData = [];

      this.filter.assignments = !this.filter.assignments;
      if (this.filter.assignments) {
        this.data.push(...this.assignments);
      } else {
        for (var item in this.data) {
          if (this.data[item].discussion_type) {
            newData.push(this.data[item]);
          }
        }
        this.data = newData;
      }
      this.data.sort((a, b) =>
        new Date(a.created_at) > new Date(b.created_at) ? -1 : 1
      );
      return;
    },
    announcementClick() {
      let newData = [];

      this.filter.announcements = !this.filter.announcements;
      if (this.filter.announcements) {
        this.data.push(...this.announcements);
      } else {
        for (var item in this.data) {
          if (!this.data[item].discussion_type) {
            newData.push(this.data[item]);
          }
        }
        this.data = newData;
      }
      this.data.sort((a, b) =>
        new Date(a.created_at) > new Date(b.created_at) ? -1 : 1
      );
      return;
    },
  },
  async created() {
    // console.log("Setting breadcrumbs from announcements");
    
    try {
      const response = await axios.get(
        "https://canvasapi.toddr.org/api/assignments",
        {
          auth: {
            username: this.$store.state.user.email,
            password: this.$store.state.user.password,
          },
        }
      );
      console.log("Response: ", response.data.data);
      this.assignments = response.data.data;
      this.data.push(...this.assignments);
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await axios.get(
        "https://canvasapi.toddr.org/api/announcements/",
        {
          auth: {
            username: this.$store.state.user.email,
            password: this.$store.state.user.password,
          },
        }
      );
      console.log("Response: ", response.data.data);
      this.announcements = response.data.data;
      this.data.push(...this.announcements);
    } catch (error) {
      console.error(error);
    }

    this.data.sort((a, b) =>
      new Date(a.created_at) > new Date(b.created_at) ? -1 : 1
    );

    this.$store.commit("SET_BREADCRUMBS", [
      {
        text: "Feed",
        disabled: false,
        href: "/feed",
        exact: true,
        // to: "/announcements",
      }
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
