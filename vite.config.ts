import path from 'node:path';

import type { ConfigEnv, UserConfig } from 'vite';
import { loadEnv } from 'vite';

import { createVitePlugins } from './build';
import { createViteBuild } from './build/buildOptions';
import { createViteCSSOptions } from './build/cssOptions.js';
import { CreateViteDepOptimizationOptions } from './build/depOptimizationOptions';

function pathResolve(dir: string) {
  return path.join(__dirname, dir);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, __dirname);
  const isBuild = command === 'build';
  return {
    base: env.VITE_PUBLIC_PATH,
    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: `${pathResolve('src')}/`
        },
        {
          find: /\/#\//,
          replacement: `${pathResolve('types')}/`
        }
      ]
    },
    server: {
      host: true,
      port: env.VITE_PORT as unknown as number,
      proxy: {
        '/web/api': {
          target: 'http://buer-gateway:11001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/web\/api/, '')
        }
      }
    },
    build: createViteBuild(),
    css: createViteCSSOptions(),
    plugins: createVitePlugins(isBuild),
    optimizeDeps: CreateViteDepOptimizationOptions()
  };
};
