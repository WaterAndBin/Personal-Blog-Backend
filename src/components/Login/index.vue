<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { userLogin } from '~/api/api/user';
import type { UserAccount } from '~/types/user';

/* dom结构 */
const formRef = ref<FormInstance>();
/* 仓库 */
const userStore = useUserStore();
/* 路由 */
const router = useRouter();

/* 数据 */
const initState: UserAccount = {
  account: '', // 账号
  password: '' // 密码
};
const state = reactive<UserAccount>({ ...initState });

const submitForm = (formEl: FormInstance | undefined, condition: string): void => {
  formEl?.validate(async (valid): Promise<void> => {
    if (valid) {
      // if (condition === 'register') {
      //   const res = await userRegister(state);
      //   console.log(res);
      // }
      if (condition === 'login') {
        const res = await userLogin(state);
        if (res.code == 200) {
          userStore.setToken(res.token);
          ElMessage.success('登录成功');
          router.push('/home');
        } else {
          ElMessage.warning(res.message);
        }
      }
    }
  });
};
</script>

<template>
  <el-form ref="formRef" :model="state" label-width="auto" class="demo-ruleForm">
    <el-form-item label="账号" prop="account" :rules="[{ required: true, message: '账号未填' }]">
      <el-input
        v-model.number="state.account"
        type="text"
        autocomplete="off"
        placeholder="请输入账号"
      />
    </el-form-item>

    <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '密码未填' }]">
      <el-input
        v-model.number="state.password"
        type="password"
        autocomplete="off"
        placeholder="请输入密码"
      />
    </el-form-item>

    <el-form-item>
      <div class="w-full flex-default">
        <el-button type="primary" @click="submitForm(formRef, 'login')">登录</el-button>
        <!-- <el-button type="primary" @click="submitForm(formRef, 'register')">注册</el-button> -->
      </div>
    </el-form-item>
  </el-form>
</template>
