<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { addRole } from '~/server/api/role';

const show = ref(false);

const emit = defineEmits<{
  (event: 'getData'): void;
}>();

/* dom */
const formRef = ref<FormInstance>();

/* 初始化数据 */
const initState = {
  role_name: '' as string
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
      const res = await addRole(state.role_name);
      if (res.code == 200) {
        emit('getData');
        ElMessage.success('添加角色成功');
        showDialog();
      } else {
        ElMessage.success('添加角色失败');
      }
    }
  });
};

defineExpose({ showDialog });
</script>

<!-- 添加角色 -->
<template>
  <el-dialog v-model="show" title="添加新角色" width="500" :before-close="showDialog" align-center>
    <el-form ref="formRef" :model="state" label-width="auto" class="demo-ruleForm">
      <el-form-item
        label="角色名字"
        prop="role_name"
        :rules="[{ required: true, message: '缺少角色名字' }]"
      >
        <el-input
          v-model.number="state.role_name"
          type="text"
          autocomplete="off"
          placeholder="请输入角色名字"
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
