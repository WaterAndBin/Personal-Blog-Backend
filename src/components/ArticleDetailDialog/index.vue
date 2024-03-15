<!-- 审核弹窗 -->
<script lang="ts" setup>
import type { ArticleDetail } from '~/types/article';
import type { UserList } from '~/types/user';

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
  author: '' as any
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
    <div class="m-[3rem_auto] border-default box-border min-h-40 w-180 border-3 p-3">
      <div>
        <!-- 标题 -->
        <div class="text-2xl font-semibold text-center">
          <span>{{ timerData.article_title }}</span>
        </div>
        <!-- 作者的信息 -->
        <div class="my-2 text-center font-semibold">
          <span class="mx-1">作者：{{ timerData.author.user_name }}</span>
          <span class="mx-1">发布时间：{{ timerData.created_time }}</span>
        </div>
        <!-- 文章的内容 -->
        <div>
          <div v-html="timerData.article_content"></div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
