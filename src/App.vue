<template>
  <div>
    <GameDemo v-if="view === 'demo'"></GameDemo>
    <MapEditor @goto="showView"></MapEditor>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MapEditor from "@/views/map_editor/MapEditor.vue";
import GameDemo from "@/views/GameDemo.vue";

const view = ref(null);
function showView(v) {
  view.value = v;
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
