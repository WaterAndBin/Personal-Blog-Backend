<script lang="ts" setup>
/* 侧边栏 */
const { isCollapse } = useAside();
/* 标题 */
const hidden = ref<boolean>(false);

const showTitle = (): boolean => {
  setTimeout((): void => {
    hidden.value = !isCollapse.value;
  }, 200);

  return hidden.value;
};
</script>

<template>
  <div class="box-border h-full border-1 border-gray-700/10 border-r-solid">
    <!-- 标题 -->
    <div class="h-[60px] flex items-center justify-center">
      <svg-icon name="logo" height="28" wight="28" class="w-10 cursor-pointer" />
      <span v-show="showTitle()" class="ml-1 text-xl font-semibold">管理后台</span>
    </div>
    <!-- 菜单 -->
    <div>
      <el-menu
        default-active="2"
        class="w-50 overflow-hidden"
        :collapse="isCollapse"
        :router="true"
      >
        <Menu></Menu>
      </el-menu>
    </div>
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  /* width: 200px; */
  /* min-height: 400px; */
}

.--el-menu-border-color {
  border-color: transparent;
}
</style>
