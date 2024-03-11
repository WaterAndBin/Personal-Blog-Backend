<script lang="ts" setup>
import auditDialog from './auditDialog.vue';
import { getAuditArticleList } from '~/server/api/article';
import type { ArticleList } from '~/types/article';

/* dom */
const articleDetailDialogRef = ref();
const auditDialogRef = ref();

/**
 * 初始数据
 */
const initState = {
  page: 1 as number, // 页码,当前页面
  pageSize: 10 as number, // 单页面需要展示多少数据
  pageTotal: 0 as number, // 数据总数
  loading: true as boolean, // 判断是否显示加载
  tableData: [] as ArticleList[] // 全部数据
};
const state = reactive({ ...initState });

/**
 *  获取数据列表
 */
const getData = (): void => {
  state.loading = true;
  setTimeout(async () => {
    const res = await getAuditArticleList(state.page, state.pageSize);
    if (res.code == 200) {
      state.tableData = res.data.list;
      state.pageTotal = res.data.total;
      ElMessage.success('获取列表数据成功');
    }
    state.loading = false;
  }, 1000);
};

/**
 * 设置页码
 * @param pages 获取的页码
 * @param pageSizes 页码的总数
 */
const setPage = (pages: number, pageSizes: number): void => {
  state.page = pages;
  state.pageSize = pageSizes;
  getData();
};

onMounted(() => {
  getData();
});
</script>

<template>
  <LoadingPages :loading="state.loading">
    <div class="flex flex-1 flex-col justify-between">
      <div class="h-full w-full">
        <div class="text-2xl font-semibold">文章审核</div>
        <div class="w-full flex flex-col">
          <div class="grid my-3 justify-items-end"></div>
          <div class="">
            <el-table :data="state.tableData" border style="width: 100%">
              <el-table-column prop="id" label="文章id" />
              <el-table-column prop="author_id" label="作者id" />
              <el-table-column prop="article_title" label="文章标题" />
              <el-table-column prop="account" label="文章封面">
                <template #default="scope">
                  <div v-if="scope.row.article_cover">
                    <el-image
                      style="width: 100px"
                      :src="'http://127.0.0.1:9090/' + scope.row.article_cover"
                      :zoom-rate="1.2"
                      :max-scale="7"
                      :min-scale="0.2"
                      :preview-src-list="['http://127.0.0.1:9090/' + scope.row.article_cover]"
                      fit="cover"
                    />
                  </div>
                  <div v-else>-</div>
                </template>
              </el-table-column>
              <el-table-column prop="article_title" label="文章标题" />
              <el-table-column prop="created_time" label="发布时间" />
              <el-table-column fixed="right" label="操作" width="150" header-align="center">
                <template #default="scope">
                  <div class="flex-default">
                    <el-button
                      type="primary"
                      size="small"
                      @click="articleDetailDialogRef.getDataShow(scope.row)"
                    >
                      文章内容
                    </el-button>
                    <el-button
                      type="primary"
                      size="small"
                      @click="auditDialogRef.setData(scope.row.id)"
                    >
                      审核
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div>
        <Pages
          :page="state.page"
          :page-size="state.pageSize"
          :page-total="state.pageTotal"
          :set-page="setPage"
        ></Pages>
      </div>
    </div>

    <!-- 文章详情 -->
    <ArticleDetailDialog ref="articleDetailDialogRef"></ArticleDetailDialog>
    <!-- 审核 -->
    <auditDialog ref="auditDialogRef" @get-data="getData"></auditDialog>
  </LoadingPages>
</template>
