import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import type { App } from 'vue';

const store = createPinia();
export function setupStore(app: App<Element>) {
  // pinia store 持久化存储的插件
  store.use(
    createPersistedState({
      storage: localStorage
    })
  );
  app.use(store);
}

export { store };
