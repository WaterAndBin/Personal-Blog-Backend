<!-- 修改角色 -->
<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { addNewUser } from '~/api/api/user';
import type { RoleList } from '~/types/role';

const show = ref(false);

const props = defineProps<{
  roleData: RoleList[];
}>();

const emit = defineEmits<{
  (event: 'getData'): void;
}>();

/* dom */
const formRef = ref<FormInstance>();

const state = reactive<any>({
  account: '',
  password: '',
  role_id: 23,
  user_name: ''
});

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
      const res = await addNewUser({
        ...state
      });
      console.log(res);
      if (res.code == 200) {
        emit('getData');
        ElMessage.success('添加用户成功');
        showDialog();
      } else {
        ElMessage.warning(res.message);
      }
    }
  });
};

defineExpose({ showDialog });
</script>

<template>
  <el-dialog v-model="show" title="新增用户" width="500" :before-close="showDialog" align-center>
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
          placeholder="请输入用户名字"
        />
      </el-form-item>
      <el-form-item label="账号" prop="account" :rules="[{ required: true, message: '缺少账号' }]">
        <el-input
          v-model.number="state.account"
          type="text"
          autocomplete="off"
          placeholder="请输入账号"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '缺少密码' }]">
        <el-input
          v-model.number="state.password"
          type="text"
          autocomplete="off"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item
        label="用户角色"
        prop="role_id"
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
