<script lang="ts" setup>
const defaultAisde = useAside();
</script>

<template>
  <div class="flex justify-between items-center h-full w-full">
    <div>
      <svg-icon
        v-show="!defaultAisde.isCollapse"
        name="menu-fold.svg"
        height="28"
        wight="28"
        class="w-9 cursor-pointer"
        @click="defaultAisde.hidden()"
      />
      <svg-icon
        v-show="defaultAisde.isCollapse"
        name="menu-unfold.svg"
        height="28"
        wight="28"
        class="w-9 cursor-pointer"
        @click="defaultAisde.hidden()"
      />
    </div>
    <div>个人中心</div>
  </div>
</template>
