<!-- 修改角色 -->
<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { handleRejectReasonList } from '~/server/api/report';
import type { AuditArticleStatus } from '~/types/article';
import { rejectType } from '~/utils/common';

const show = ref(false);

const emit = defineEmits<{
  (event: 'getData'): void;
  (event: 'showDialog'): void;
}>();

/* dom */
const formRef = ref<FormInstance>();

const state = reactive<AuditArticleStatus>({
  id: '',
  status: 2,
  reject_type: -1,
  reject_reason: '',
  type: 0
});

/**
 * 展示弹窗
 */
const showDialog = (): void => {
  show.value = !show.value;
};

const setData = (data: string): void => {
  state.id = data;
  show.value = !show.value;
};

/**
 * 确认提交
 */
const submitForm = (formEl: FormInstance | undefined): void => {
  formEl?.validate(async (valid): Promise<void> => {
    if (valid) {
      const res = await handleRejectReasonList(state);
      if (res.code == 200) {
        emit('getData');
        ElMessage.success('核实成功');
        /* 关闭当前窗口 */
        showDialog();
        /* 关闭上一个窗口 */
        emit('showDialog');
        /* 重新获取举报文章列表 */
        emit('getData');
      } else {
        ElMessage.success('核实失败');
      }
    }
  });
};

defineExpose({ showDialog, setData });
</script>

<template>
  <el-dialog v-model="show" title="核实结果" width="600" :before-close="showDialog">
    <el-form ref="formRef" :model="state" label-width="auto" class="demo-ruleForm">
      <el-form-item label="是否通过" prop="status">
        <el-radio-group v-model="state.status">
          <el-radio :label="2">通过</el-radio>
          <el-radio :label="3">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="state.status == 3" label="不通过类型" prop="reject_type">
        <el-radio-group v-model="state.reject_type">
          <el-radio v-for="(items, index) in rejectType" :key="index" :label="items.type">
            {{ items.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="state.status == 3" label="不通过理由" prop="reject_reason">
        <el-input
          v-model="state.reject_reason"
          maxlength="200"
          placeholder="请输入不通过的理由"
          show-word-limit
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <div class="dialog-default">
          <el-button @click="show = false">取消</el-button>
          <el-button type="primary" @click="submitForm(formRef)">确认</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
