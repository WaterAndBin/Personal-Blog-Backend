<!-- 审核弹窗 -->
<script lang="ts" setup>
import type { ArticleDetail } from '~/types/article';

const show = ref(false);

const emit = defineEmits<{
  (event: 'getData'): void;
}>();

/**
 * 展示弹窗
 */
const showDialog = (): void => {
  show.value = !show.value;
};

const timerData = ref<ArticleDetail>({
  id: 0,
  article_title: '',
  article_cover: '',
  article_content: '',
  author_id: 0,
  created_time: '',
  updated_time: '',
  tabs_id: '',
  status: 0,
  is_deleted: 0,
  type: 0,
  auditors: 0,
  review_time: '',
  reject_reason: '',
  reject_type: 0,
  author: {}
});

const getDataShow = (data: ArticleDetail): void => {
  timerData.value = data;
  console.log(data);
  showDialog();
};

defineExpose({ showDialog, getDataShow });
</script>

<template>
  <el-dialog v-model="show" title="文章内容" width="700" :before-close="showDialog">
    <div>
      <!-- 作者 -->
      <div class="mb-3 box-border">
        <div class="text-center text-3xl">
          {{ timerData.article_title }}
        </div>
        <div class="mt-2 text-center">作者：{{ timerData.author.user_name ?? '' }}</div>
        <div class="mt-2 text-center">发布时间：{{ timerData.created_time }}</div>
      </div>
      <!-- 内容 -->
      <div v-html="timerData.article_content"></div>
    </div>
  </el-dialog>
</template>
