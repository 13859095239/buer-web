/**
 * 应用程序主入口
 *
 * @author zoulan
 * @since 2023-08-14
 */

/* eslint-disable simple-import-sort/imports */
import { createApp } from 'vue';
// 注意：引入样式文件必须App导入之后,否则回出现层级问题
import App from './App.vue';

import { setupGlobDirectives } from '/@/directives';
import { setupRouter } from '/@/router';
import { setupStore } from '/@/store';

// 加载项目样式
import './design/index.less';
// 加载unocss样式
import 'virtual:uno.css';
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App);
// 注册缓存
setupStore(app);
// 注册路由
setupRouter(app);
// 注册全局指令
setupGlobDirectives(app);
// 挂载应用,Vue实例挂载到 DOM 上
app.mount('#app');
