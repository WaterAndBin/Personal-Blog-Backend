<script setup lang="ts">
/**
 * 接收loading
 */
const props = defineProps<{
  loading: boolean;
}>();
</script>

<template>
  <div class="flex flex-col relative">
    <slot></slot>

    <div class="w-full h-full bg-gray-900/60 absolute -top-5 -left-5 p-5 z-5" v-if="props.loading">
      <div class="relative h-full">
        <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
svg {
  width: 4em;
  transform-origin: center;
  animation: rotate4 2s linear infinite;
  position: absolute;
  left: 50%;
  top: 43%;
}

circle {
  fill: none;
  stroke: white;
  stroke-width: 2;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash4 1.5s ease-in-out infinite;
}

@keyframes rotate4 {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash4 {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dashoffset: -125px;
  }
}
</style>
