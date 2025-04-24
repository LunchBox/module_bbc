<template>
  <div>
    <div v-if="loading">Loading...</div>
    <ClientIndex v-if="view === 'client_index'"></ClientIndex>
  </div>
</template>

<script>
import ClientIndex from "./views/Client/ClientIndex.vue";

export default {
  name: "App",
  components: {
    ClientIndex,
  },
  data() {
    return {
      loading: true,
      user: null,
      view: null,
    };
  },
  async created() {},
  methods: {},
  mounted() {
    this.loading = false;
    this.view = "client_index";
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
