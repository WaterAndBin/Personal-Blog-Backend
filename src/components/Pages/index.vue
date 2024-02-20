<script lang="ts" setup>
const props = defineProps<{
  page: number;
  pageSize: number;
  pageTotal: number;
  setPage: (page: number, pageSize: number) => void;
}>();

const _page = ref<number>(1);
const _pageSize = ref<number>(10);
const _pageTotal = ref<number>(0);

watch(
  props,
  () => {
    _page.value = props.page;
    _pageSize.value = props.pageSize;
    _pageTotal.value = props.pageTotal;
  },
  {
    immediate: true
  }
);

watch([_page, _pageSize], () => {
  props.setPage(_page.value, _pageSize.value);
});
</script>

<template>
  <div class="mt-3 flex justify-center">
    <el-pagination
      v-model:current-page="_page"
      v-model:page-size="_pageSize"
      :page-sizes="[10, 20, 30, 50]"
      :small="false"
      :disabled="false"
      :background="false"
      layout="sizes, prev, pager, next, jumper"
      :total="_pageTotal"
    />
  </div>
</template>
