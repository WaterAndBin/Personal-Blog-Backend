<!-- 修改角色 -->
<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { updateRole } from '~/server/api/role';
import type { roleList } from '~/types/role';

const show = ref(false);

const emit = defineEmits<{
  (event: 'getData'): void;
}>();

/* dom */
const formRef = ref<FormInstance>();

const state = reactive<roleList>({
  id: 0,
  role_name: '',
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

const setData = (data: roleList): void => {
  show.value = !show.value;
  Object.assign(state, data);
};

/**
 * 确认提交
 */
const submitForm = (formEl: FormInstance | undefined): void => {
  formEl?.validate(async (valid): Promise<void> => {
    if (valid) {
      const res = await updateRole({ ...state });
      console.log(res);
      if (res.code == 200) {
        emit('getData');
        ElMessage.success('修改角色成功');
        showDialog();
      } else {
        ElMessage.success('修改角色失败');
      }
    }
  });
};

defineExpose({ showDialog, setData });
</script>

<template>
  <el-dialog v-model="show" title="修改角色" width="500" :before-close="showDialog" align-center>
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
