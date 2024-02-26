<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { userRegister, userLogin } from '~/server/api/user';
import type { userAccount } from '~/types/user';

/* dom结构 */
const formRef = ref<FormInstance>();

const initState: userAccount = {
  account: '', // 账号
  password: '' // 密码
};
const state = reactive<userAccount>({ ...initState });

const submitForm = (formEl: FormInstance | undefined, condition: string): void => {
  formEl?.validate(async (valid): Promise<void> => {
    if (valid) {
      if (condition === 'register') {
        try {
          const res = await userRegister(state);
          console.log(res);
        } catch (error) {
          // Handle error
          console.error(error);
        }
      }
      if (condition === 'login') {
        try {
          const res = await userLogin(state);
          console.log(res);
        } catch (error) {
          // Handle error
          console.error(error);
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
        <el-button type="primary" @click="submitForm(formRef, 'register')">注册</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>
