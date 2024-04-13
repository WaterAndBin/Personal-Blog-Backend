<!-- 审核弹窗 -->
<script lang="ts" setup>
import { getAllTabs } from '~/server/api/tabs';
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
  author: '' as any
});

const getDataShow = (data: ArticleDetail): void => {
  timerData.value = data;
  console.log(data);
  showDialog();
};

const tabs = ref<any[]>([]);
const getData = async (): Promise<void> => {
  const res = await getAllTabs();
  if (res.code == 200) {
    tabs.value = res.data;
  }
};

onMounted(() => {
  getData();
});

defineExpose({ showDialog, getDataShow });
</script>

<template>
  <el-dialog v-model="show" title="文章内容" width="800" :before-close="showDialog">
    <div class="article_box m-[3rem_auto] box-border min-h-40 w-180 border-3 border-default p-3">
      <div>
        <!-- 标题 -->
        <div class="text-center text-2xl font-semibold">
          <span>{{ timerData.article_title }}</span>
        </div>
        <!-- 作者的信息 -->
        <div class="my-2 text-center font-semibold">
          <span class="mx-1">作者：{{ timerData.author.user_name }}</span>
          <span class="mx-1">发布时间：{{ timerData.created_time }}</span>
        </div>
        <!-- 标签 -->
        <div class="flex-default">
          <span
            v-for="(items, index) in JSON.parse(timerData.tabs_id)"
            :key="index"
            class="mx-2 border-2 border-default border-solid p-1"
          >
            <span v-for="(item, index) in tabs" :key="index + item.id">
              <span v-if="item.id == items">
                {{ item.tab_name }}
              </span>
            </span>
          </span>
        </div>
        <!-- 文章的内容 -->
        <span class="">
          <div v-html="timerData.article_content"></div>
        </span>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss">
.article_box {
  .pre-header-right {
    display: none;
  }
}
</style>
