<template>
  <div class="profile">
    <v-card flat dark style="padding: 0.5rem">
      <v-card-text>
        <v-row class="mb-4" align="center">
          <v-avatar color="grey" class="mr-4">
            <img :src="gravatarURL" alt="Profile Picture" />
          </v-avatar>
          <strong class="text-h6">Hello, {{ user.name }}</strong>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </v-row>
        <h3>Your Account Information:</h3>
        <p>
          Email: <strong>{{ user.email }}</strong>
          <br />
          Role: <strong>{{ user.role }}</strong>
          <br />
          User ID: <strong>{{ user.id }}</strong>
        </p>
        <hr />
        <br />
        <h3>Your Canvas Information:</h3>
        <p>
          Canvas API Key:
          <strong>
            {{ user.canvasKey.length >= 1 ? "Configured" : "Not configured" }}
          </strong>
          <br />
          Canvas URL: <strong>{{ user.canvasURL }}</strong>
        </p>
        <hr />
        <br />
        <h3>Support:</h3>
        <v-container>
          <v-row no-gutters dark>
            <v-col cols="12" sm="6" md="8">
              <v-card class="pa-2" tile dark flat>
                <p>
                  If your canvas API key has changed, or you need to change
                  other account information, you can redo the onboarding
                  process.
                </p>
              </v-card>
            </v-col>
            <v-col cols="6" md="4" dark>
              <v-card class="pa-2" tile dark flat>
                <v-btn color="primary" elevation="2">Restart Onboarding</v-btn>
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters dark>
            <v-col cols="12" sm="6" md="8">
              <v-card class="pa-2" tile dark flat>
                <p>
                  If you want to delete your account, or want to make other
                  changes (like your email address/name, etc) to your account,
                  you can contact us here:
                </p>
              </v-card>
            </v-col>
            <v-col cols="6" md="4" dark>
              <v-card class="pa-2" tile dark flat>
                <v-btn
                  color="primary"
                  elevation="2"
                  href="mailto:todd@toddr.org"
                  >Email Todd</v-btn
                >
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <AdminProfileOptions v-if="user.role == 'Administrator'" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import md5 from "md5";
import AdminProfileOptions from "../components/AdminProfileOptions.vue";

export default {
  name: "ProfileView",
  created() {
    // console.log("Setting breadcrumbs from announcements");
    this.$store.commit("SET_BREADCRUMBS", [
      {
        text: "Profile",
        disabled: false,
        href: "profile",
      },
    ]);
  },
  components: {
    AdminProfileOptions,
  },
  data() {
    return {
      gravatarURL:
        "https://www.gravatar.com/avatar/" +
        md5(this.$store.state.user.email.toLowerCase()) +
        "?d=retro",
      user: this.$store.state.user,
    };
  },
};
</script>
