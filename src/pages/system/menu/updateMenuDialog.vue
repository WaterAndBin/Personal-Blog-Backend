<!-- 修改角色 -->
<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { updateMenu } from '~/server/api/menu';
import type { MenuTree } from '~/types/menu';

const show = ref(false);
const menuStore = useMenuStore();

const emit = defineEmits<{
  (event: 'getData'): void;
}>();

/* dom */
const formRef = ref<FormInstance>();

const initState: MenuTree = {
  id: 0,
  menu_name: '',
  menu_path: '',
  menu_parent: 0,
  status: 0,
  is_deleted: 0,
  created_id: 0,
  created_time: '',
  updated_id: 0,
  updated_time: '',
  icon: ''
};
const state = reactive<MenuTree>({ ...initState });

/**
 * 展示弹窗
 */
const showDialog = (): void => {
  show.value = !show.value;
};

const setData = (data: MenuTree): void => {
  show.value = !show.value;
  Object.assign(state, data);
};

/**
 * 确认提交
 */
const submitForm = (formEl: FormInstance | undefined): void => {
  formEl?.validate(async (valid): Promise<void> => {
    if (valid) {
      const res = await updateMenu({
        ...state
      });
      console.log(res);
      if (res.code == 200) {
        emit('getData');
        menuStore.getMenuData();
        ElMessage.success('修改菜单成功');
        showDialog();
      } else {
        ElMessage.success('修改菜单失败');
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
        label="菜单名称"
        prop="menu_name"
        :rules="[{ required: true, message: '缺少菜单名称' }]"
      >
        <el-input
          v-model.number="state.menu_name"
          type="text"
          autocomplete="off"
          placeholder="请输入菜单名称"
        />
      </el-form-item>
      <el-form-item
        label="菜单路径"
        prop="menu_path"
        :rules="[{ required: false, message: '缺少菜单路径' }]"
      >
        <el-input
          v-model.number="state.menu_path"
          type="text"
          autocomplete="off"
          placeholder="请输入菜单路径"
        />
      </el-form-item>
      <el-form-item
        label="菜单名称"
        prop="menu_parent"
        :rules="[{ required: true, message: '缺少菜单父级' }]"
      >
        <el-input
          v-model.number="state.menu_parent"
          type="text"
          autocomplete="off"
          placeholder="请输入菜单父级"
        />
      </el-form-item>
      <el-form-item label="菜单图标" prop="icon">
        <el-input v-model.number="state.icon" type="text" autocomplete="off" placeholder="图标" />
      </el-form-item>
      <el-form-item label="图标预览" prop="icon">
        <Icon :name="state.icon ?? ''" color="black" />
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
