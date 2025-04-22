<template>
  <div class="client-index">
    <MyPackages v-if="view === 'my_packages'"></MyPackages>

    <SendPackage v-else-if="view === 'send_package'"></SendPackage>

    <TrackPackage
      v-else-if="view === 'track_package'"
      :trackingNumber="trackingNumber"
    ></TrackPackage>

    <SignIn
      v-else-if="view === 'sign_in'"
      @to-signup="view = 'sign_up'"
      @signin-success="onSigninSuccess"
    ></SignIn>

    <SignUp
      v-else-if="view === 'sign_up'"
      @to-signin="view = 'sign_in'"
    ></SignUp>

    <div v-else>
      <div class="track-form">
        <input
          v-model="trackingNumber"
          type="text"
          placeholder="Enter tracking number"
          required
        />
        <button @click="trackPackage">Track</button>
      </div>

      <div class="actions">
        <button @click="goToSendPackage">Send Package</button>
        <button @click="goToMyPackages">My Packages</button>
      </div>

      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import MyPackages from "./MyPackages.vue";
import SendPackage from "./SendPackage.vue";
import TrackPackage from "./TrackPackage.vue";

import SignIn from "./SignIn.vue";
import SignUp from "./SignUp.vue";

import { useAuth } from "@/services/useAuth";

const { clientToken } = useAuth();

export default {
  components: {
    MyPackages,
    SendPackage,
    TrackPackage,
    SignIn,
    SignUp,
  },
  data() {
    return {
      error: null,
      trackingNumber: null,
      view: null,
    };
  },
  methods: {
    trackPackage() {
      console.log(this.trackingNumber);
      this.view = "track_package";
    },
    goToSendPackage() {
      if (clientToken()) {
        this.view = "send_package";
      } else {
        this.view = "sign_in";
      }
    },
    goToMyPackages() {
      if (clientToken) {
        this.view = "my_packages";
      } else {
        this.view = "sign_in";
      }
    },
    onSigninSuccess() {
      console.log("--- here");
      this.view = null;
    },
  },
};
</script>
