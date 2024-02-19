/* 面包屑 */
interface Crumbs {
  menu_name: string;
  path: string;
  active: number;
  query?: any;
  params?: any;
  other_menu_name?: any;
  other_path?: any;
}

export const useCrumbsStore = defineStore('crumbs', {
  persist: true,
  state: () => {
    return {
      crumbs: [
        {
          menu_name: '主页',
          active: 1,
          path: '/'
        }
      ] as Crumbs[], // 面包屑数组
      navigatePath: '' // 当前路径
    };
  },
  actions: {
    // 添加面包屑
    addCrumbs(data: Crumbs) {
      const { crumbs } = this;

      crumbs.forEach((item) => (item.active = 0));

      const index = crumbs.findIndex((item) => item.menu_name === data.menu_name);

      if (index === -1) crumbs.push(data);
      else crumbs[index].active = 1;

      this.navigatePath = data.path;
    },
    // 删除面包屑
    async deleteCrumbs(data: Crumbs) {
      const { crumbs } = this;
      const index = crumbs.findIndex((item) => item.menu_name === data.menu_name);

      console.log(index);

      if (index === 0 && crumbs.length === 1) {
        await navigateTo({ path: '/' });
      } else if (crumbs[index].active == 1) {
        await navigateTo({
          path: crumbs[index - 1].path,
          query: crumbs[index - 1].query
        });
        this.addCrumbs(crumbs[index - 1]);
      }
      crumbs.splice(index, 1);
    },
    /* 查找各个路径页面,仅适用于需要存储页数的地址 */
    findCrumbs(data: Crumbs) {
      const { crumbs } = this;
      /* 寻找路径 */
      const index = crumbs.findIndex((item) => item.path === data.path && item.active == 1);
      if (index) {
        this.crumbs[index] = {
          ...this.crumbs[index],
          menu_name: data.other_menu_name,
          path: data.other_path,
          query: data.query
        };
      }
    },
    clearAll() {
      console.log('123');
      this.crumbs.splice(0, this.crumbs.length);
      this.crumbs.push({
        menu_name: '主页',
        active: 1,
        path: '/'
      });
      this.navigatePath = '/';
      navigateTo('/');
    }
  },
  getters: {}
});

export default useCrumbsStore;
