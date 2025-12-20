<!--
  - table 组件
  -
  - @author zoulan
  - @since 2023-08-15
  -->
<template>
  <div
    v-loading="loading"
    class="relative w-full"
  >
    <BasicSearchForm
      v-if="props.searchFormLayout === 'basic' && searchFormPropsComputed && visibleSearch"
      v-model:methods="searchFormMethods"
      v-bind="searchFormPropsComputed"
    />
    <Toolbar
      v-model:selectedRowKey="selectedRowKeyModel"
      v-model:selectedRowKeys="selectedRowKeysModel"
      v-model:columnControllerVisible="columnControllerVisible"
      v-model:visibleSearch="visibleSearch"
      :data="toolbar"
      :hasSelected="hasSelected"
      :selectedRows="selectedRowsModel"
      :methods="getMethods()"
      :siderToolbar="props.BasicSiderToolbar"
    >
      <BasicSearchForm
        v-if="props.searchFormLayout === 'inToolbar' && searchFormPropsComputed"
        v-model:methods="searchFormMethods"
        v-bind="searchFormPropsComputed"
      />
    </Toolbar>
    <EnhancedTable
      ref="tableRef"
      v-model:selectedRowKeys="selectedRowKeysModel"
      v-model:columnControllerVisible="columnControllerVisible"
      v-model:displayColumns="displayColumns"
      resizable
      dragSort="row-handler"
      :rowKey="props.rowKey"
      :columns="columnsComputed"
      :data="dataSource"
      :pagination="pagination"
      :tree="treeConfig"
      size="small"
      :columnController="columnControllerConfig"
      @drag-sort="onDragSort"
      @select-change="handleSelectChange"
      @page-change="changePager"
      @expanded-tree-nodes-change="onExpandedTreeNodesChange"
      @display-columns-change="onDisplayColumnsChange"
    >
    </EnhancedTable>
  </div>
</template>
<script setup lang="ts">
import { defaultsDeep } from 'lodash-es';
import type { EnhancedTableInstanceFunctions } from 'tdesign-vue-next';
import { EnhancedTable } from 'tdesign-vue-next';
import { computed, nextTick, ref, unref } from 'vue';

import type { SearchFormMethods } from '/@/components/SearchForm';
import { BasicSearchForm } from '/@/components/SearchForm';
import { useLoading } from '/@/hooks/web/useLoading';
import { TABLE_ROW_SELECTION_TYPE } from '/@/settings/componentSetting';

import Toolbar from './components/toolbar/index.vue';
import { useData } from './hooks/useData';
import { useDisplayColumn } from './hooks/useDisplayColumn';
import { useEditor } from './hooks/useEditor';
import { usePagination } from './hooks/usePagination';
import { useRowSelection } from './hooks/useRowSelection';
import { useTableProps } from './hooks/useTableProps';
import { useTree } from './hooks/useTree';
import type { BasicTableProps, TableMethods } from './types';
import type { TableEmit } from './types/table';

const props = withDefaults(defineProps<BasicTableProps>(), {
  rowKey: 'id',
  immediate: true,
  autoLoading: true,
  tableType: 'basic',
  rowSelectionType: TABLE_ROW_SELECTION_TYPE,
  pagination: 'default',
  searchFormLayout: 'basic',
  editor: false
});
const emit = defineEmits<TableEmit>();
// table html元素
const tableRef = ref<EnhancedTableInstanceFunctions>();
const visibleSearch = ref(true);
const { loading } = useLoading();
// 选中行对象列表model
const selectedRowsModel = defineModel<Recordable[]>('selectedRows', {
  default: []
});
/** 选中行keys值model,多个以逗号隔开 */
const selectedRowKeyModel = defineModel<string>('selectedRowKey');

/** 选中行keys值model,列表 */
const selectedRowKeysModel = defineModel<string[]>('selectedRowKeys', { default: [] });

// searchForm
let searchFormMethods: SearchFormMethods;

// 组件对外方法
const methods: Partial<TableMethods> = {};

// 查询参数
const searchParms = ref({});

const searchFormPropsComputed = computed(() => {
  const { searchFormProps } = props;
  if (!searchFormProps) return undefined;
  if (!searchFormProps.onSearch) {
    // 默认启用内部的onSearch事件
    searchFormProps.onSearch = () => {
      methods.reload?.();
    };
  }
  return searchFormProps;
});

// 表格树hooks
const {
  treeConfig,
  onExpandedTreeNodesChange,
  insertTreeNode,
  updateTreeNode,
  onDragSort,
  removeTreeNode,
  moveTreeNode
} = useTree(props, tableRef);

// 默认的分页参数
const page = {
  current: ref<number>(0),
  pageSize: ref<number>(2)
};

function getMethods(): TableMethods {
  return methods as Required<TableMethods>;
}

emit('update:methods', getMethods() as Required<TableMethods>);
props.onRegister?.(getMethods());

const { columnsComputed } = useTableProps(props);

const columnControllerVisible = ref(false);

const { displayColumns, onDisplayColumnsChange, columnControllerConfig } = useDisplayColumn(props, columnsComputed);
// 行选择hooks
const {
  handleSelectChange,
  hasSelected,
  setSelectedKeys,
  getSelectedKeys,
  getSelectedKeysForString,
  getSelectedRows,
  clearSelected
} = useRowSelection(selectedRowsModel, selectedRowKeyModel, selectedRowKeysModel);

// 数据hooks
const { dataSource, reload, total, findRowDataByKey, getKeyByRow, clearData } = useData(
  props,
  page,
  searchParms,
  getMethods()
);

// 编辑hooks
const { getEditorData, addNewRow, updateCellData, deleteRowByKeys, clearEditorData, validateEditor } = useEditor(
  props,
  dataSource,
  getMethods()
);

const { pagination, current, pageSize, changePager } = usePagination(props, total, getMethods());

page.current = current;
page.pageSize = pageSize;

// 初始化methods
defaultsDeep(methods, {
  reload,
  clearData,
  hasSelected,
  dataSource: unref(dataSource),
  findRowDataByKey,
  getKeyByRow,
  setSelectedKeys,
  getSelectedKeys,
  getSelectedKeysForString,
  getSelectedRows,
  clearSelected,
  getEditorData,
  addNewRow,
  updateCellData,
  deleteRowByKeys,
  clearEditorData,
  validateEditor,
  getSearchFormMethods: () => searchFormMethods!,
  loading: loading.value,
  insertTreeNode,
  updateTreeNode,
  removeTreeNode,
  moveTreeNode
});
// 初始化自动执行刷新
if (props.immediate) {
  nextTick(() => reload());
}
</script>
<style lang="less" scoped>
@import url('./style/index.less');
</style>
