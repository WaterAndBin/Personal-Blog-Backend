import { getMenu } from '~/server/api/menu';
import type { MenuTree } from '~/types/menu';

/* 用户的仓库 */
const useMenuStore = defineStore('menu', {
  persist: true,
  state: () => {
    return {
      menuData: [] as MenuTree[]
    };
  },
  actions: {
    /* 存储token */
    async getMenuData(): Promise<void> {
      const res = await getMenu();
      if (res.code == 200) {
        this.menuData = res.data;
      } else {
        this.menuData = [];
      }
    }
  }
});

export default useMenuStore;
