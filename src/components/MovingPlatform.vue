<script setup>
import { defineProps, computed, onMounted, onUnmounted } from "vue";

import { CELL_SIZE } from "@/stores/config";

import { freeze } from "@/stores/playingLevel";

const props = defineProps(["data", "vertical"]);

const moving_rate = 1;
let diff = moving_rate;

let handler;

const blockData = () => props.data;

function movePlatform() {
  if (freeze.value) return;

  blockData().offset += diff;

  if (blockData().offset >= CELL_SIZE) diff = -moving_rate;
  if (blockData().offset <= -CELL_SIZE) diff = moving_rate;
}

onMounted(() => {
  if (handler) clearInterval(handler);
  handler = setInterval(movePlatform, 20);
});

onUnmounted(() => {
  if (handler) clearInterval(handler);
});

const blockStyle = computed(() => {
  if (props.vertical) {
    return { top: `${0 + blockData().offset}px`, width: `${CELL_SIZE}px` };
  } else {
    return { left: `${0 + blockData().offset}px`, width: `${CELL_SIZE}px` };
  }
});
</script>
<template>
  <div class="moving-block" :style="blockStyle"></div>
</template>

<style>
.moving-block {
  position: absolute;
  width: 100%;
  height: 100%;

  top: 0;
  left: 0;

  background: #333;

  z-index: 10;

  background: no-repeat url("@/assets/rock.png") -200px 0;
  background-size: auto var(--block-size);
}
</style>
