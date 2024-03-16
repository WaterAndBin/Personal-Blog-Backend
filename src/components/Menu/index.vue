<script lang="ts" setup>
const menuStore = useMenuStore();
/* 请求菜单 */
menuStore.getMenuData();
</script>

<template>
  <template v-if="menuStore.menuData.length != 0">
    <el-sub-menu
      v-for="(item, index) in menuStore.menuData"
      :key="item.id + index + item.menu_name"
      :index="item.id + index + item.menu_name"
      :router="true"
    >
      <template #title>
        <el-icon>
          <Icon :name="item.icon ?? ''" color="black" />
        </el-icon>
        <span>{{ item.menu_name }}</span>
      </template>
      <template v-if="item.children && item.children.length != 0">
        <el-menu-item
          v-for="(items, i) in item.children"
          :key="i + items.id"
          :index="items.menu_path"
        >
          {{ items?.menu_name ?? '' }}
        </el-menu-item>
      </template>
    </el-sub-menu>
  </template>
</template>
