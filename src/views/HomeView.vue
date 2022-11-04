<template>
  <div>
    <v-card class="overflow-hidden no-padding" dark>
      <v-app-bar dark>
        <v-img
          src="https://toddr.org/assets/images/t-logo.png"
          max-height="40"
          max-width="40"
        />

        <v-spacer></v-spacer>
        <v-btn color="green" style="margin-right: 1rem" @click="login">
          <v-icon style="margin-right: 0.5rem">mdi-login-variant</v-icon>
          Login
        </v-btn>
        <v-btn color="blue" style="margin-right: 1rem" @click="onboarding">
          <v-icon style="margin-right: 0.5rem">mdi-arrow-right</v-icon>
          Get Started
        </v-btn>
      </v-app-bar>
    </v-card>
    <section class="centered">
      <v-layout column wrap class="my-5" align-center>
        <v-flex xs12 sm4 class="my-3">
          <div class="text-xs-center">
            <h1>Assignment Canvas</h1>
            <h2 class="headline">The best way to view your Canvas courses</h2>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card rounded dark height="300px">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2"
                      >mdi-security</v-icon
                    >
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Privacy Focused</div>
                  </v-card-title>
                  <v-card-text>
                    Assignment Canvas <i>never</i> stores any of your academic
                    data. All information retreived from Canvas is sent straight
                    to your browser and never stored on our servers. We also
                    never write anything to Canvas on your behalf, so you can be
                    sure that your data is safe on Canvas and nowhere else.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card rounded dark height="300px">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2"
                      >mdi-newspaper-variant-multiple-outline</v-icon
                    >
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">One Central Feed</div>
                  </v-card-title>
                  <v-card-text>
                    Gone is the endless clicking between courses to get your
                    assignments and view announcements. Assignment Canvas
                    centralizes this information into one always up to date
                    feed, with easy to use filtering tools to quickly find
                    exactly what you want to know.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card dark height="300px">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2"
                      >mdi-share</v-icon
                    >
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Easily Sharable</div>
                  </v-card-title>
                  <v-card-text>
                    Assignment Canvas uses Canvas' global ID system, so you can
                    share an Assignment Canvas link with someone else, and if
                    they have access to that same canvas course, it will work
                    right out of the box for them.
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
    <template>
      <v-footer color="blue" absolute padless>
        <v-row justify="center" no-gutters>
          <p style="padding-top: 1rem">
            © 2022
            <a
              style="color: white; text-decoration: none"
              href="https://toddr.org"
              ><b>Todd Rylaarsdam</b></a
            >
          </p>
        </v-row>
      </v-footer>
    </template>
    <OnboardingDialog v-if="onboardingOpen" />
    <v-dialog v-model="dialog" width="500"><LoginDialog /></v-dialog>
  </div>
</template>

<script>
import OnboardingDialog from "../components/OnboardingDialog.vue";
import LoginDialog from "../components/LoginDialog.vue";
export default {
  name: "HomeView",
  components: {
    LoginDialog,
    OnboardingDialog,
  },
  data: () => ({
    onboardingOpen: false,
    dialog: false,
  }),
  methods: {
    login() {
      this.dialog = true;
      // this.$store.commit("SET_APP_BAR", true);
      // this.$router.push("/feed");
    },
    onboarding() {
      this.onboardingOpen = true;
    },
  },
  mounted: function () {
    this.$store.commit("SET_APP_BAR", false);
  },
};
</script>

<style local>
.no-padding {
  padding: 0 !important;
  margin: 0 !important;
}
.centered {
  margin: 0;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
-webkit-scrollbar {
  display: none;
}
html {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
