<template>
  <div>
    <el-drawer v-model="dialogHidden" title="I am the title" :with-header="false">
      <div>
        <h3>菜单权限</h3>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
const dialogHidden = ref<boolean>(false);

const show = (): void => {
  dialogHidden.value = true;
};

defineExpose({
  show
});
</script>
