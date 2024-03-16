import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import useUserStore from './user';
import useCrumbsStore from './crumbs';
import useMenuStore from './menu';

const store = createPinia();
store.use(piniaPluginPersistedstate);

export { useUserStore, useCrumbsStore, useMenuStore };
