<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { addMenu } from '~/server/api/menu';
import type { AddMenu } from '~/types/menu';

const show = ref(false);
const useMenu = useMenuData();

const emit = defineEmits<{
  (event: 'getData'): void;
}>();

/* dom */
const formRef = ref<FormInstance>();

/* 初始化数据 */
const initState: AddMenu = {
  menu_name: '',
  menu_path: '',
  menu_parent: 0
};
const state = reactive<AddMenu>({ ...initState });
const isDisabled = ref<boolean>(false);

/**
 * 展示弹窗
 */
const showDialog = (): void => {
  show.value = !show.value;
};

/**
 * 增加子节点
 * @param data 父节点
 */
const addSon = (data?: number): void => {
  if (data) {
    isDisabled.value = true;
    state.menu_parent = data;
  } else {
    Object.assign(state, initState);
    isDisabled.value = false;
  }
  showDialog();
};

/**
 * 确认提交
 */
const submitForm = (formEl: FormInstance | undefined): void => {
  formEl?.validate(async (valid): Promise<void> => {
    if (valid) {
      const res = await addMenu(state);
      if (res.code == 200) {
        emit('getData');
        showDialog();
        ElMessage.success('添加菜单成功');
        useMenu.getMenuData();
      } else {
        ElMessage.success('添加菜单失败');
      }
    }
  });
};

defineExpose({ showDialog, addSon });
</script>

<!-- 添加角色 -->
<template>
  <el-dialog v-model="show" title="添加新角色" width="500" :before-close="showDialog" align-center>
    <el-form ref="formRef" :model="state" label-width="auto" class="demo-ruleForm">
      <el-form-item
        label="菜单名称"
        prop="menu_name"
        :rules="[{ required: true, message: '请输入菜单名称' }]"
      >
        <el-input
          v-model="state.menu_name"
          type="text"
          autocomplete="off"
          placeholder="请输入菜单名称"
        />
      </el-form-item>
      <el-form-item
        label="菜单路径"
        prop="menu_path"
        :rules="[{ required: false, message: '请输入菜单路径' }]"
      >
        <el-input
          v-model="state.menu_path"
          type="text"
          autocomplete="off"
          placeholder="请输入菜单路径"
        />
      </el-form-item>
      <el-form-item
        label="菜单父级"
        prop="menu_parent"
        :rules="[{ required: true, message: '请输入菜单父级' }]"
      >
        <el-input
          v-model.number="state.menu_parent"
          type="number"
          autocomplete="off"
          placeholder="请输入菜单父级"
          :disabled="isDisabled"
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
