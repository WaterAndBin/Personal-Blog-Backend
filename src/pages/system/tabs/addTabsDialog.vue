<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
// import { addRole } from '~/server/api/role';
import { addTabs } from '~/api/api/tabs';

const show = ref(false);

const emit = defineEmits<{
  (event: 'getData'): void;
}>();

/* dom */
const formRef = ref<FormInstance>();

/* 初始化数据 */
const initState = {
  tab_name: '' as string
};
const state = reactive({ ...initState });

/**
 * 展示弹窗
 */
const showDialog = (): void => {
  show.value = !show.value;
};

/**
 * 确认提交
 */
const submitForm = (formEl: FormInstance | undefined): void => {
  formEl?.validate(async (valid): Promise<void> => {
    if (valid) {
      const res = await addTabs(state.tab_name);
      if (res.code == 200) {
        emit('getData');
        ElMessage.success('添加标签成功');
      } else {
        ElMessage.success('添加标签失败');
      }
    }
  });
};

defineExpose({ showDialog });
</script>

<!-- 添加角色 -->
<template>
  <el-dialog v-model="show" title="添加新标签" width="500" :before-close="showDialog" align-center>
    <el-form ref="formRef" :model="state" label-width="auto">
      <el-form-item
        label="标签名字"
        prop="tab_name"
        :rules="[{ required: true, message: '缺少标签名字' }]"
      >
        <el-input
          v-model.number="state.tab_name"
          type="text"
          autocomplete="off"
          placeholder="请输入标签名字"
        />
      </el-form-item>
      <el-form-item>
        <div class="dialog-default">
          <el-button @click="show = false">取消</el-button>
          <el-button type="primary" @click="submitForm(formRef)">确认</el-button>
        </div>
      </el-form-item>
    </el-form>
    <!-- <template #footer>
      <div class="dialog-footer">
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="show = false">确认</el-button>
      </div>
    </template> -->
  </el-dialog>
</template>
