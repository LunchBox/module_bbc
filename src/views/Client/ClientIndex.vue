<template>
  <div class="client-index">
    <MyPackages v-if="view === 'my_packages'"></MyPackages>
    <SendPackage v-if="view === 'send_package'"></SendPackage>
    <TrackPackage
      v-if="view === 'track_package'"
      :trackingNumber="trackingNumber"
    ></TrackPackage>
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

export default {
  components: {
    MyPackages,
    SendPackage,
    TrackPackage,
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
      this.view = "send_package";
    },
    goToMyPackages() {
      this.view = "my_packages";
    },
  },
};
</script>
