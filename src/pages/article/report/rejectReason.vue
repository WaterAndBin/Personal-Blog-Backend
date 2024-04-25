<!-- 修改角色 -->
<script lang="ts" setup>
import reportDialog from './reportDialog.vue';
import { getRejectReasonList } from '~/server/api/report';
import { rejectType } from '~/utils/common';

const show = ref(false);
const id = ref(-1);
/* dom */
const reportDialogRef = ref();

const emit = defineEmits<{
  (event: 'getData'): void;
}>();

const state = ref<any[]>([]);

/**
 * 展示弹窗
 */
const showDialog = (): void => {
  show.value = !show.value;
};

const setData = async (data: number): Promise<void> => {
  const res = await getRejectReasonList(data);
  if (res.code == 200) {
    id.value = data;
    state.value = res.data;
  }
  show.value = !show.value;
};

defineExpose({ showDialog, setData });
</script>

<template>
  <el-dialog v-model="show" title="举报原因" width="600" :before-close="showDialog">
    <div>
      <div class="mb-5 flex justify-end">
        <el-button type="primary" size="small" @click="reportDialogRef.setData(id)">
          核实举报
        </el-button>
      </div>
      <el-table :data="state" border style="width: 100%">
        <el-table-column prop="id" label="举报类型">
          <template #default="scope">
            <div>
              {{
                rejectType.find((items) => items.type == scope.row.reject_type)?.label ?? '未知举报'
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="reject_reason" label="举报理由" />
      </el-table>
    </div>

    <!-- 核实结果 -->
    <reportDialog ref="reportDialogRef" @showDialog="showDialog" @getData="emit('getData')" />
  </el-dialog>
</template>
