<template>
  <div>
    <el-drawer v-model="dialogHidden" title="I am the title" :with-header="false">
      <span>Hi there!</span>
    </el-drawer>
  </div>
</template>

<script>
const dialogHidden = ref < boolean > false;
</script>
