<script setup lang="ts">
/**
 * 接收loading
 */
const props = defineProps<{
  loading: boolean;
}>();

const loadingPagesRef = ref<HTMLElement>();

watch(
  () => props.loading,
  () => {
    /* 检查loading是否为true还是false */
    if (loadingPagesRef) {
      /* 挂载加载效果 */
      const loadingAll = ElLoading.service({
        target: loadingPagesRef.value as HTMLElement
      });
      if (!props.loading) {
        loadingAll.close();
      }
    }
  },
  {
    immediate: true
  }
);
</script>

<template>
  <div ref="loadingPagesRef">
    {{ props.loading }}
    <slot></slot>
  </div>
</template>
