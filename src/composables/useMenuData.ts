import { getMenu } from '~/server/api/menu';
import type { MenuTree } from '~/types/menu';

export function useMenuData(): {
  menuData: Ref<MenuTree[]>;
  getMenuData: () => Promise<void>;
} {
  const menuData = useState<MenuTree[]>('menuData', () => []);

  const getMenuData = async (): Promise<void> => {
    const res = await getMenu();
    if (res.code == 200) {
      menuData.value = res.data;
    }
  };

  return {
    menuData,
    getMenuData
  };
}
