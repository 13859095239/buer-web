## 开发事项

### 安装nodejs24最新版本

### 安装SwitchHosts切换开发环境

- 不要自行修改代码中的IP。
- 可以SwitchHosts工具切换后端服务地址。
- 配置如下：
  127.0.0.1 buer-gateway

## 框架介绍

- 基于vue3、vite 最新版本。
- 本项目推荐客户使用谷歌浏览器最新版本，安装方便，兼容性及性能好。
- package.json中有各种启动方式说明。
- 请勿随意引入第三方插件,引入时需合理评估合理性、必要性、重复性。
- 定时启动package.json文件中update命令，更新插件至最新版本，避免长时间未更新导致的漏洞问题。

### UI库

- 使用tdesign-vue-next,详情见官网 https://tdesign.tencent.com/vue-next/overview

#### 保持风格一致性

- 开发自己的页面的时候,尽可能地使用这些 Design Token 来实现背景色、边距、圆角等样式，方便开发出可以
  统一变换样式效果的应用
- 详情见 https://tdesign.tencent.com/starter/docs/vue-next/design-token

### 关于样式

- unocss 原子化 CSS 引擎
  详情见官网 https://www.unocss.cn/
- 样式使用 tailwindcss
  原则上不要手动编写样式
  详情见官网 https://tailwindcss.com/docs/installation/using-vite

### 关于图标库

- 基于 unocss 实现图标的统一管理
- 便于统一管理,请勿引入其他的图标库。

#### 支持本地svg

- 本地图标强制放在 assets/svg 目录中,系统自动编译。
- 样式增加class="my-本地图标名称"即可。

#### 非本地图标,可以访问 https://icones.js.org/collection/tdesign

- 优先使用tdesign类,与UI库tdesign-vue-next最大程度上保持界面一致性。
- 使用方式是选好图标后，在样式加入 class="i-图标名称"即可。

### 组件库

- 框架对tdesign-vue-next、timy等组件进行业务封装，如表格组件、表单组件、上传附件、富文本组件。
- 组件库的目的针对不同业务，实现快速开发。
- 遇到有业务组件需求的，可以提出，共同增加到框架中，让框架提供更多的组件。

### 项目个性化陪配置

- 项目个性化配置,在settings目录中，可根据项目需要自行设置。

## 编译器

### 强制要求编译器vscode最新版本

### 必须安装的插件

- ESLint 代码检查
- Stylelint 样式检查
- Iconify IntelliSense 图标库在代码中可以显示小图标
- Less IntelliSense less样式、
- Code formatter 样式格式化
- Tailwind CSS IntelliSense 样式提示
- UnoCSS UnoCSS插件
- Vue (Official) Vue3必备
- XML查看器
- DotENV .env高亮显示

### eslint
- 用eslint,保障代码一致性
- .vscode/settings.json中有eslint配置,当代码保存时自动修复eslint错误
- 如遇到eslint自动修复导致代码无法运行的特殊情况,可以在不希望被格式化的代码上增加如下配置
/* eslint-disable simple-import-sort/imports */ 
<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
- 其中 simple-import-sort/imports 是eslint错误项
- 遇到eslint格式化卡慢时，可以设置eslint插件debug,查看日志排除问题

## 开发

### 注释
- 不管代码多少,都要写注释,条理清晰
- 开发者遇到库表变更，对应的字段注释要及时更新，做到数据库的注释与库表的注释一致

### 枚举与字典的应用场景
- 为规范开发，便于重构，系统不允许出现"1" === form.menuType,都需要用常量来替代。

#### 字典

- 可以根据项目不同，随便增删改的，如公告类型
- 所有字典的值及回显都是由后端处理，前端不做处理

#### 枚举
- 不可以随便增删改的，如：状态、性别
- 所有枚举都由前端处理，后端不做处理。
- 具体用法搜索MENU_TYPE_LIST（数据展示）、MENU_TYPE_ENUM（赋值/匹配）
- constants目录下，一个业务系统一个文件，如：systemConstants.ts

### 模板页积累
- 针对增删改查页面
- 前端算半个产品经理，从产品设计上遇到不规范/反人类的设计，从源头上需要规避。
- 开发上，要有模板化开发思想，不断的完善高质量的模板，给后续开发使用，让框架更完善
- 目前提供各类增删改查模板页，可自行摸索用AI工具生成或手动修改。
- 遇到模板没有的，高质量的做个对应的模板页，做到可复用。

### 公共组件
- 目前components目录下都是项目的通用组件,每个项目理论上都应该孵化出高质量的公共组件反哺框架
- 组件讲究输入、输出，对外调用尽量精简，尽可能的1-3行代码实现业务组件调用
- 组件所有对外参数都需要注解  注解采用/** xxxx */，这类注解对外提示。方法内部注解不做限制。
