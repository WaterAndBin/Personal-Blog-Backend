<!-- 修改角色 -->
<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { updateTabs } from '~/api/api/tabs';
import type { TabsList } from '~/types/tabs';

const show = ref(false);

const emit = defineEmits<{
  (event: 'getData'): void;
}>();

/* dom */
const formRef = ref<FormInstance>();

const state = reactive<TabsList>({
  id: 0,
  tab_name: '',
  is_deleted: 0,
  created_id: 0,
  created_time: '',
  updated_id: '',
  updated_time: '',
  status: 0
});

/**
 * 展示弹窗
 */
const showDialog = (): void => {
  show.value = !show.value;
};

const setData = (data: TabsList): void => {
  show.value = !show.value;
  Object.assign(state, data);
};

/**
 * 确认提交
 */
const submitForm = (formEl: FormInstance | undefined): void => {
  formEl?.validate(async (valid): Promise<void> => {
    if (valid) {
      const res = await updateTabs({
        ...state
      });
      console.log(res);
      if (res.code == 200) {
        emit('getData');
        ElMessage.success('修改标签成功');
        showDialog();
      } else {
        ElMessage.success('修改标签失败');
      }
    }
  });
};

defineExpose({ showDialog, setData });
</script>

<template>
  <el-dialog v-model="show" title="修改标签" width="500" :before-close="showDialog" align-center>
    <el-form ref="formRef" :model="state" label-width="auto" class="demo-ruleForm">
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
