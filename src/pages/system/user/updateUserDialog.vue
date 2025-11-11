<!-- 修改角色 -->
<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { updateUser } from '~/api/api/user';
import type { RoleList } from '~/types/role';
import type { UserList } from '~/types/user';

const show = ref(false);

const props = defineProps<{
  roleData: RoleList[];
}>();

const emit = defineEmits<{
  (event: 'getData'): void;
}>();

/* dom */
const formRef = ref<FormInstance>();

const state = reactive<UserList>({
  id: 0,
  role_id: 0,
  user_name: '',
  is_deleted: 0,
  created_time: '',
  status: 0
});

/**
 * 展示弹窗
 */
const showDialog = (): void => {
  show.value = !show.value;
};

const setData = (data: UserList): void => {
  show.value = !show.value;
  Object.assign(state, data);
};

/**
 * 确认提交
 */
const submitForm = (formEl: FormInstance | undefined): void => {
  formEl?.validate(async (valid): Promise<void> => {
    if (valid) {
      const res = await updateUser({
        ...state
      });
      console.log(res);
      if (res.code == 200) {
        emit('getData');
        ElMessage.success('修改用户信息成功');
        showDialog();
      } else {
        ElMessage.success('修改用户信息失败');
      }
    }
  });
};

defineExpose({ showDialog, setData });
</script>

<template>
  <el-dialog
    v-model="show"
    title="修改用户信息"
    width="500"
    :before-close="showDialog"
    align-center
  >
    <el-form ref="formRef" :model="state" label-width="auto" class="demo-ruleForm">
      <el-form-item
        label="用户名字"
        prop="user_name"
        :rules="[{ required: true, message: '缺少用户名字' }]"
      >
        <el-input
          v-model.number="state.user_name"
          type="text"
          autocomplete="off"
          placeholder="请输入标签名字"
        />
      </el-form-item>
      <el-form-item
        label="用户角色"
        prop="user_name"
        :rules="[{ required: true, message: '请选择用户角色' }]"
      >
        <el-select v-model="state.role_id" placeholder="Select">
          <el-option
            v-for="item in props.roleData"
            :key="item.id"
            :label="item.role_name"
            :value="item.id"
          />
        </el-select>
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
