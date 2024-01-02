<script lang="ts" setup>
const { isCollapse } = useAside();

const handleOpen = (key: string, keyPath: string[]): void => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]): void => {
  console.log(key, keyPath);
};

const showTitle = (): any => {
  let result = ref<boolean>(false);

  setTimeout(() => {
    result = isCollapse;
  }, 100);

  return result;
};
</script>

<template>
  <div>
    <!-- 标题 -->
    <div class="h-[60px] flex justify-center items-center bg-red-100">
      <svg-icon name="logo" height="28" wight="28" class="w-10 cursor-pointer" />
      <span v-show="showTitle()" class="font-semibold text-xl ml-1">管理后台</span>
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
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><ElIconIceCream /></el-icon>
          <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><ElIconIceCream /></el-icon>
          <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><ElIconIceCream /></el-icon>
          <template #title>Navigator Four</template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
