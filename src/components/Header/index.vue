<script lang="ts" setup>
import Personal from './Personal.vue';
import Light from './Light.vue';
const defaultAisde = useAside();

const toggleFullScreen = (): void => {
  const element = document.documentElement; // 获取整个页面的根元素

  if (document.fullscreenElement !== undefined) {
    // 如果当前不是全屏状态，则进入全屏
    if (element.requestFullscreen !== undefined) {
      element.requestFullscreen();
    } else {
      console.log('浏览器不支持进入全屏');
    }
  } else {
    // 如果当前已经是全屏状态，则退出全屏
    if (document.exitFullscreen !== undefined) {
      document.exitFullscreen();
    } else {
      console.log('浏览器不支持退出全屏');
    }
    console.log('浏览器不支持退出全屏');
  }
};
</script>

<template>
  <div class="h-full w-full flex items-center justify-between">
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
    <div class="flex items-center">
      <div class="mr-4 flex items-center">
        <Light></Light>
      </div>
      <div class="mr-4 flex items-center">
        <el-tooltip class="" effect="dark" content="全屏" placement="bottom-start">
          <svg-icon
            name="header-fullscreen.svg"
            height="28"
            wight="28"
            class="w-9 cursor-pointer outline-0"
            @click="toggleFullScreen"
          ></svg-icon>
        </el-tooltip>
      </div>
      <!-- 个人中心 -->
      <Personal></Personal>
    </div>
  </div>
</template>
