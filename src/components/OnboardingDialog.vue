<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      persistent
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>
      <v-card dark>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Registration</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-toolbar-items>
            <v-btn dark text @click="dialog = false"> Save </v-btn>
          </v-toolbar-items> -->
        </v-toolbar>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">
              Your Account
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">
              Canvas Setup
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3"> Confirmation </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="100%"
              ></v-card>
              <v-form>
                <v-container>
                  <h1>Your Account</h1>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="first"
                        :rules="[rules.required]"
                        label="First Name"
                        outlined
                        shaped
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="last"
                        label="Last Name"
                        outlined
                        :rules="[rules.required]"
                        shaped
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row style="padding-top: 0px">
                    <v-col cols="12" sm="6" style="">
                      <v-text-field
                        v-model="email"
                        :rules="[rules.required, rules.email]"
                        label="Email"
                        outlined
                        shaped
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" style="">
                      <v-text-field
                        v-model="password"
                        label="Password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        @click:append="show1 = !show1"
                        :type="show1 ? 'text' : 'password'"
                        outlined
                        shaped
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-spacer />
                    <v-btn
                      color="primary"
                      @click="e1 = 2"
                      v-if="
                        this.password.length >= 8 &&
                        this.rules.email(this.email) == true &&
                        this.first.length > 0 &&
                        this.last.length > 0
                      "
                    >
                      Continue
                    </v-btn>
                    <v-btn color="primary" @click="e1 = 2" v-else disabled>
                      Continue
                    </v-btn>
                  </v-row>
                </v-container>
              </v-form>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="100%"
              ></v-card>
              <v-container>
                <v-form>
                  <h1>Canvas Configuration</h1>
                  <v-row>
                    <p style="padding-top: 1rem">
                      Your canvas URL is the domain where your canvas instance
                      is hosted. This is usually
                      "[institution].instructure.com". If you are at George Fox
                      University, your URL is <i>georgefox.instructure.com</i>.
                      Do not include https:// or anything after the domain.
                    </p>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="canvasURL"
                        label="Canvas URL"
                        outlined
                        :rules="[rules.required]"
                        shaped
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="8">
                      <p>
                        If you entered your URL correctly the button to the
                        right should bring you to your profile settings. Scroll
                        down to <i>Approved Integrations</i> and click "New
                        Access Token". Enter a purpse and leave the expiry date
                        blank. Hit "Generate" and then copy the token that
                        appears into the field below.
                      </p>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-btn
                        block
                        :href="
                          'https://' + this.canvasURL + '/profile/settings'
                        "
                        target="_blank"
                      >
                        <v-icon>mdi-left-arrow</v-icon>
                        <span>Go to Canvas</span>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="canvasKey"
                        :rules="[rules.required, rules.canvasKey]"
                        label="Canvas API Key"
                        outlined
                        shaped
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
                <v-row>
                  <v-btn color="primary" @click="e1 = 1"> Back </v-btn>
                  <v-spacer />
                  <v-btn
                    color="primary"
                    @click="checkData"
                    v-if="
                      this.canvasKey.length == 70 && this.canvasURL.length > 0
                    "
                  >
                    Continue
                  </v-btn>
                  <v-btn color="primary" @click="e1 = 2" v-else disabled>
                    Continue
                  </v-btn>
                </v-row>
              </v-container>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-container>
                <v-row>
                  <h1>Confirmation</h1>
                </v-row>
                <v-row>
                  <v-col align-self>
                    <v-progress-circular v-if="checkingData" indeterminate />
                    <div v-else>
                      <p v-if="confirmationStatus == 'success'">
                        Congratulations, the Canvas information you entered was
                        valid and works correctly. To create your account,
                        simply press "Create Account" and you'll be all setup.
                      </p>
                      <p v-else>
                        Your Canvas URL and/or Canvas API key were invalid.
                        Please double check that those values are both valid. If
                        you need more help, contact
                        <a href="mailto:todd@toddr.org">todd@toddr.org</a>
                      </p>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-btn color="primary" @click="e1 = 2"> Back </v-btn>
                  <v-spacer />
                  <v-btn
                    color="green"
                    @click="createAccount"
                    v-if="confirmationStatus == 'success'"
                  >
                    Complete Setup
                  </v-btn>
                  <v-btn color="primary" @click="e1 = 2" v-else disabled>
                    Complete Setup
                  </v-btn>
                </v-row>
              </v-container>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card>
      <v-overlay :value="creatingAccount">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-dialog>
  </v-row>
</template>

<script>
// const crypto = require("crypto");
const axios = require("axios");

async function hash(string) {
  const msgUint8 = new TextEncoder().encode(string); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

export default {
  data() {
    return {
      dialog: true,
      notifications: false,
      sound: true,
      widgets: false,
      e1: 1,
      email: "",
      first: "",
      last: "",
      canvasKey: "",
      canvasURL: "",
      password: "",
      checkingData: true,
      confirmationStatus: "checking",
      creatingAccount: false,
      show1: false,
      rules: {
        required: (value) => !!value || "Required Field",
        min: (v) => v.length >= 8 || "Min 8 characters",
        canvasKey: (v) => v.length == 70 || "Not a valid canvas API key format",
        emailMatch: () => `The email and password you entered don't match`,
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  methods: {
    async checkData() {
      this.checkingData = true;
      this.e1 = 3;

      try {
        const response = await axios.get(
          "http://10.128.1.166:7001/internal/users/test?canvasURL=" +
            this.canvasURL +
            "&canvasKey=" +
            this.canvasKey,
          {
            auth: {
              username: "trylaarsdam",
              password: "test12345",
            },
          }
        );
        if (response.data.status == "success") {
          this.confirmationStatus = "success";
        } else {
          this.confirmationStatus = "error";
        }
        this.checkingData = false;
      } catch (error) {
        console.error(error);
      }
    },
    async createAccount() {
      this.creatingAccount = true;
      try {
        const response = await axios.post(
          "http://10.128.1.166:7001/internal/users/new?canvasURL=" +
            this.canvasURL +
            "&canvasKey=" +
            this.canvasKey +
            "&email=" +
            this.email +
            "&name=" +
            this.first +
            " " +
            this.last +
            "&password=" +
            (await hash(this.password)),
          {
            auth: {
              username: "trylaarsdam",
              password: "test12345",
            },
          }
        );
        if (response.data.status == "success") {
          this.creatingAccount = false;
        } else {
          this.creatingAccount = false;
        }
        this.checkingData = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
