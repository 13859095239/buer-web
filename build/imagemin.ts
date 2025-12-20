/**
 * 压缩图片vite插件
 *
 * @author zoulan
 * @since 2023-05-27
 */
import viteImagemin from 'vite-plugin-imagemin';

export function configImageminPlugin() {
  const plugin = viteImagemin({
    // 是否在控制台输出压缩结果
    verbose: true,
    gifsicle: {
      optimizationLevel: 7,
      interlaced: false
    },
    optipng: {
      optimizationLevel: 7
    },
    mozjpeg: {
      quality: 20
    },
    pngquant: {
      quality: [0.8, 0.9],
      speed: 4
    },
    svgo: {
      plugins: [
        {
          name: 'removeViewBox'
        },
        {
          name: 'removeEmptyAttrs',
          active: false
        }
      ]
    }
  });
  return plugin;
}
