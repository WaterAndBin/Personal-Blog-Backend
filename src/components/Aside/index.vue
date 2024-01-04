<script lang="ts" setup>
/* 侧边栏 */
const { isCollapse } = useAside();
/* 标题 */
const hidden = ref<boolean>(false);

const handleOpen = (key: string, keyPath: string[]): void => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]): void => {
  console.log(key, keyPath);
};

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
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><ElIconIceCream /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
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
