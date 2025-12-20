/**
 * <p>
 * unocss 插件配置
 * 用到样式、图标
 * </p>
 *
 * @author zoulan
 * @since 2023-08-23
 */
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
import {
  defineConfig,
  presetIcons,
  presetMini,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';

export default defineConfig({
  // 集成插件
  presets: [
    // UnoCSS 的基本预设，仅包含最基本的实用程序
    // 稿
    presetMini({ dark: { dark: 'html[theme-mode="dark"]' } }),
    // 官方默认风格，包含wind、preset-mini
    presetWind3({ dark: { dark: 'html[theme-mode="dark"]' } }),
    // 通过 UnoCSS 使用纯 CSS 样式来显示任意图标
    presetIcons({
      // 当匹配不到图标时发出警告
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': '-0.15em',
        width: '1em',
        height: '1em',
        overflow: 'hidden'
      },
      collections: {
        // 加载本地目录下，扩展名.svg的图标
        // 访问方式 <div class="i-my-icons-xx"></div>
        'my-icons': FileSystemIconLoader('./src/assets/icons', (svg) => svg.replace(/#fff/, 'currentColor'))
      }
    })
  ],
  // 快捷方式
  shortcuts: {
    full: 'w-full h-full',
    'flex-center': 'flex items-center justify-center',
    'flex-col-center': 'flex flex-col items-center justify-center'
  },
  // 主题
  theme: {},
  transformers: [
    // 转换器，用于在样式文件中使用@apply、@screen、theme()指令
    // .custom-div { @apply 'hover:text-red hover:font-bold'; }
    transformerDirectives(),
    // 变体组变压器
    // <div class="hover:(bg-gray-400 font-medium) font-(light mono)"/>
    // <div class="hover:bg-gray-400 hover:font-medium font-light font-mono"/>
    transformerVariantGroup()
  ]
});
