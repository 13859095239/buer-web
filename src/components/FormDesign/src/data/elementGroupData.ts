import type { elementGroup } from '../types';

export const elementGroupData: elementGroup[] = [
  {
    label: '基础表单组件',
    elements: [
      { code: 'Input', label: '输入框', icon: 'icon-input' },
      { code: 'InputMulti', label: '输入框', icon: 'icon-input' },
      { code: 'Select', label: '下拉框', icon: 'icon-select' },
      { code: 'Checkbox', label: '复选框', icon: 'icon-checkbox' },
      { code: 'Radio', label: '单选框', icon: 'icon-radio' },
      { code: 'Switch', label: '开关', icon: 'icon-switch' },
      { code: 'DatePicker', label: '日期选择器', icon: 'icon-date-picker' },
      { code: 'TimePicker', label: '时间选择器', icon: 'icon-time-picker' },
      { code: 'Cascader', label: '级联选择器', icon: 'icon-cascader' },
      { code: 'Rate', label: '评分', icon: 'icon-rate' },
      { code: 'Slider', label: '滑块', icon: 'icon-slider' },
      { code: 'ColorPicker', label: '颜色选择器', icon: 'icon-color-picker' },
      { code: 'Transfer', label: '穿梭框', icon: 'icon-transfer' },
      { code: 'TreeSelect', label: '树选择', icon: 'icon-tree-select' },
      { code: 'InputNumber', label: '数字输入框', icon: 'icon-input-number' },
      { code: 'Table', label: '表格', icon: 'icon-table' }
    ]
  },
  {
    label: '高级表单组件',
    elements: [{ code: 'Upload', label: '上传', icon: 'icon-upload' }]
  },
  {
    label: '布局组件',
    elements: [
      { code: 'Tabs', label: '页签组件', icon: 'icon-input' },
      { code: 'Divider', label: '分割线', icon: 'icon-divider' },
      { code: 'Collapse', label: '折叠面板', icon: 'icon-collapse' }
    ]
  }
];

// {
//     elementCode: 'Input',
//     elementLabel: '输入框',
// }
