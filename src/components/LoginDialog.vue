<template>
  <v-card dark>
    <v-card-title class=""> Login to Assignment Canvas </v-card-title>

    <v-card-text style="margin-top: 1rem">
      <v-form>
        <p style="color: red" v-if="invalid">Email or password invalid</p>
        <v-text-field
          v-model="email"
          :rules="[rules.required, rules.email]"
          label="Email"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          @click:append="show1 = !show1"
          :type="show1 ? 'text' : 'password'"
          outlined
        ></v-text-field>
      </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        text
        v-if="password.length >= 8 && this.rules.email(this.email) == true"
        @click="login"
      >
        Login
      </v-btn>
      <v-btn disabled text v-else>Login</v-btn>
    </v-card-actions>
    <v-overlay :value="loggingIn">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
const axios = require("axios");

export default {
  name: "LoginDialog",
  methods: {
    async login() {
      this.loggingIn = true;
      try {
        const response = await axios.get(
          "http://10.128.1.166:7001/internal/login?email=" +
            this.email +
            "&password=" +
            this.password,
          {}
        );
        if (response.data.status != "success") {
          this.invalid = true;
          this.password = "";
        } else {
          this.$store.commit("SET_USER", response.data.user);
          this.$store.commit("SET_APP_BAR", true);
          this.$router.push("/feed");
          this.$cookies.set("email", this.email);
          this.$cookies.set("password", this.password);
        }
      } catch (error) {
        console.error(error);
        this.invalid = true;
      }
      this.loggingIn = false;
    },
  },
  data() {
    return {
      show1: false,
      email: "",
      password: "",
      invalid: false,
      loggingIn: false,
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
};
</script>
