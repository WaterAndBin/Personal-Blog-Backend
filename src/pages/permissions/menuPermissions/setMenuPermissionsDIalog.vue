<script lang="ts" setup>
import { setMenuPermissions } from '~/server/api/permissions';
import type { MenuTree } from '~/types/menu';

/* 是否隐藏 */
const dialogHidden = ref<boolean>(false);
/* 传进来的数据 */
const props = defineProps<{
  treeData: MenuTree[];
}>();
const emits = defineEmits<{
  (event: 'getData'): void;
}>();
/* dom */
const treeRef = ref();
const formData = reactive({
  role_id: '',
  lists: []
});

const defaultProps = {
  children: 'children',
  label: 'menu_name'
};

const show = (): void => {
  dialogHidden.value = true;
};

const close = (): void => {
  dialogHidden.value = false;
};

/**
 * 设置数据
 */
const setData = (roleId: string, data: string): void => {
  formData.role_id = roleId;
  formData.lists = JSON.parse(data);
  show();
};

/* 确认提交 */
const sure = async (): Promise<void> => {
  /* 获取树的数组 */
  const data = treeRef.value?.getCheckedKeys();
  const res = await setMenuPermissions(formData.role_id, data);
  if (res.code == 200) {
    ElMessage.success('修改权限成功');
    emits('getData');
    close();
  }
};

defineExpose({
  show,
  close,
  setData
});
</script>

<template>
  <div>
    <el-drawer v-model="dialogHidden" title="菜单权限修改" :with-header="false">
      <div class="h-full w-full flex flex-col">
        <h3>菜单权限</h3>
        <div class="flex-1">
          <el-tree
            ref="treeRef"
            style="max-width: 600px"
            :data="props.treeData"
            :show-checkbox="true"
            :check-strictly="true"
            node-key="id"
            :props="defaultProps"
            :default-checked-keys="formData.lists"
            :default-expand-all="true"
          />
        </div>
        <div><el-button type="primary" @click="sure">确认</el-button></div>
      </div>
    </el-drawer>
  </div>
</template>
