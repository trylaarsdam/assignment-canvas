<template>
  <div class="admin-panel">
    <v-toolbar dark>
      <v-tabs
        v-model="tab"
        fixed-tabs
        dark
      >
        <v-tab
          v-for="i in tabs"
          :key="i"
          :href="`#tab-${i}`"
        >
          {{ i }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
    

    <v-tabs-items v-model="tab" dark>
      <v-tab-item
        dark
        :value="`tab-Users`"
      >
        <v-card dark>
          <v-list>
            <UserCard v-for="aUser in users" :key="aUser.id" :user="aUser" :admin="true" />
          </v-list>
        </v-card>
      </v-tab-item>
      <v-tab-item
        dark
        :value="`tab-System`"
      >
        <v-card dark>
          <v-card-text dark>THIS IS SOME TEXT <br/> <br/><br/>system</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item
        dark
        :value="`tab-Errors`"
      >
        <v-card dark>
          <v-card-text dark>THIS IS SOME TEXT <br/> <br/><br/>errors</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import md5 from "md5";
const axios = require("axios").default;
import UserCard from "../components/UserCard.vue"

export default {
  name: "AdminView",
  async created() {
    // console.log("Setting breadcrumbs from announcements");
    this.$store.commit("SET_BREADCRUMBS", [
      {
        text: "Admin Panel",
        disabled: false,
        href: "admin",
      },
    ]);

    try {
      const response = await axios.get(
        "https://canvasapi.toddr.org/internal/users",
        {
          auth: {
            username: this.$store.state.user.email,
            password: this.$store.state.user.password,
          },
        }
      );
      console.log("Response: ", response.data.users);
      this.users = response.data.users;
    } catch (error) {
      console.error(error);
    }
  },
  components: {
    UserCard
  },
  data() {
    return {
      tab: "2",
      users: [],
      tabs: [
        "Users", "System", "Errors"
      ],
      gravatarURL:
        "https://www.gravatar.com/avatar/" +
        md5(this.$store.state.user.email.toLowerCase()) +
        "?d=retro",
      user: this.$store.state.user,
    };
  },
};
</script>
