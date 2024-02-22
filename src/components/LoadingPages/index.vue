<script setup lang="ts">
/**
 * 接收loading
 */
const props = defineProps<{
  loading: boolean;
}>();
</script>

<template>
  <div class="relative flex flex-col">
    <slot></slot>

    <div v-if="props.loading" class="absolute z-5 h-full w-full bg-gray-900/60 p-5 -left-5 -top-5">
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
