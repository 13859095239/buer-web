/**
 * @antfu/eslint-config 配置文件
 * 实现eslint的统一配置,eslint与prettier整合等自动修复格式
 * 官网 https://github.com/antfu/eslint-config
 * 配置参考 https://github.com/Tencent/tdesign-vue-next-starter
 *
 * @author zoulan
 * @since 2025-07-29
 */
import antfu from '@antfu/eslint-config';
import prettier from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import vueCss from 'eslint-plugin-vue-scoped-css';
import globals from 'globals';
import typescript from 'typescript-eslint';

export default antfu(
  {
    // 项目类型为 'app'，适用于应用程序项目 可选lib
    type: 'app',
    stylistic: {
      // 缩进风格
      indent: 2,
      // 单引号
      quotes: 'single'
    },
    typescript: true,
    vue: true,
    unocss: true,
    jsonc: false,
    yaml: false,
    markdown: false,
    formatters: {
      css: true,
      html: true,
    },
    // 排除的文件和目录
    ignores: [
      '**/node_modules',
      '**/*.md',
      '**/*.sh',
      '**/*.md',
      '**/*.woff',
      '**/*.ttf',
      '**/.vscode',
      '**/.idea',
      '**/dist',
      '**/public',
      '**/docs',
      './husky',
      './local',
      './components.d.ts',
      './src/main.ts'
    ]
  },
  [
    ...vueCss.configs['flat/recommended'],
    prettier,
    {
      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.node,
          ...globals.jest,
          defineProps: 'readonly',
          defineEmits: 'readonly'
        },
        ecmaVersion: 6,
        sourceType: 'module',

        parserOptions: {
          parser: typescript.parser,
          allowImportExportEverywhere: true,

          ecmaFeatures: {
            jsx: true
          }
        }
      },

      plugins: {
        'simple-import-sort': simpleImportSort
      },

      settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx']
      },

      rules: {
        /* Closed due to template running
         * (Recommended to open!)
         */
        'no-console': 'off',
        'ts/no-explicit-any': 'off',

        /* Disallow person rules */
        'antfu/top-level-function': 'off',
        'antfu/if-newline': 'off',
        'n/prefer-global/process': 'off',

        /* If you need control the imports sequence, must be off
         *  https://github.com/vuejs/vue-eslint-parser/issues/58
         */
        'import/first': 'off',

        /* Allow start with _ */
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_'
          }
        ],
        'vue/no-unused-vars': [
          'error',
          {
            ignorePattern: '^_'
          }
        ],
        // Using ts/no-unused-vars instead
        'no-unused-vars': 'off',

        /* Some variables are initialized in the function */
        '@typescript-eslint/no-use-before-define': 'off',
        'no-use-before-define': 'off',

        /* Disable antfu sort, use simple sort import */
        'perfectionist/sort-imports': 'off',
        'perfectionist/sort-named-imports': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        // Disable unused-imports rules in other presets
        'unused-imports/no-unused-imports': 'off',
        'unused-imports/no-unused-vars': 'off'
      }
    },

    {
      files: ['**/*.vue'],

      rules: {
        // 不强制组件名为 kebab-case
        'vue/component-name-in-template-casing': [
          'error',
          'PascalCase',
          {
            registeredComponentsOnly: true
          }
        ],
        // 不强制 template 属性用 kebab-case
        'vue/attribute-hyphenation': ['error', 'never'],
        'vue/custom-event-name-casing': ['error', 'kebab-case'],
        'vue/block-order': [
          'error',
          {
            order: ['template', 'script', 'style']
          }
        ],
        'vue/block-lang': [
          'error',
          {
            script: {
              lang: ['ts', 'tsx']
            }
          }
        ],
        'vue/multi-word-component-names': 'off',
        'vue/no-reserved-props': 'off',
        'vue/no-v-html': 'off',

        'vue-scoped-css/no-parsing-error': 'off',
        'vue-scoped-css/no-unused-selector': 'off',
        'vue-scoped-css/enforce-style-type': [
          'error',
          {
            allows: ['scoped']
          }
        ],
        'vue/padding-line-between-blocks': ['error', 'never']
      }
    }
  ]
);
