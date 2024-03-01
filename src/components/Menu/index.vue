<script lang="ts" setup>
const menu = useMenuData();
/* 请求菜单 */
menu.getMenuData();
</script>

<template>
  <div>
    <div v-if="menu.menuData.value.length != 0">
      <el-sub-menu
        v-for="(item, index) in menu.menuData.value"
        :key="index + item.id"
        :index="item.menu_path"
      >
        <template #title>
          <el-icon><ElIconIceCream /></el-icon>
          <span>{{ item.menu_name }}</span>
        </template>
        <el-menu-item
          v-for="(items, i) in item.children"
          :key="i + items.id"
          :index="items.menu_path"
        >
          {{ items?.menu_name ?? '' }}
        </el-menu-item>
      </el-sub-menu>
    </div>
  </div>
</template>
