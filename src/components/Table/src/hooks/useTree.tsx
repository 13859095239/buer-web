/**
 * 树表格 hooks
 *
 * @author zoulan
 * @since 2025-07-08
 */

import { defaultsDeep } from 'lodash-es';
import type { DragSortContext, EnhancedTableInstanceFunctions, EnhancedTableProps } from 'tdesign-vue-next';
import type { Ref } from 'vue';
import { reactive } from 'vue';

import { KEYS_CHILDREN, KEYS_PARENT_ID, KEYS_VALUE } from '/@/settings/componentSetting';
import { isEmpty } from '/@/utils/is';
import { errorMessage } from '/@/utils/prompt';

import type { BasicTableProps } from '../types';
import type { InsertTreeNodeType } from '../types/table';

export function useTree(props: BasicTableProps, tableRef: Ref<EnhancedTableInstanceFunctions>) {
  const treeConfig: EnhancedTableProps['tree'] = reactive({
    childrenKey: KEYS_CHILDREN,
    treeNodeColumnIndex: 1,
    indent: 25,
    expandTreeNodeOnClick: false
  });
  function onExpandedTreeNodesChange(expandedTreeNodes, context) {
    console.log(expandedTreeNodes, context);
    // 全选不需要处理；仅处理懒加载
    if (!context.rowState) return;
  }

  /**
   * 插入树表格节点
   *
   * @param anchorKey 锚定的行key
   * @param row 行数据
   * @param insertTreeNodeType 树表格插入节点类型
   */
  function insertTreeNode(anchorKey: string, row: Recordable, insertTreeNodeType: InsertTreeNodeType) {
    switch (insertTreeNodeType) {
      case 'appendTo':
        tableRef.value.appendTo(anchorKey, row);
        break;
      case 'insertAfter':
        tableRef.value.insertAfter(anchorKey, row);
        break;
      case 'insertBefore':
        tableRef.value.insertBefore(anchorKey, row);
        break;
    }
    let sortIds: string[] = [];
    if (isEmpty(row[KEYS_PARENT_ID])) {
      // 根节点
      sortIds = tableRef.value.getTreeNode().map((node) => node[KEYS_VALUE]);
    } else {
      const tableRow = tableRef.value.getData(row.id);
      sortIds = tableRow.parent!.row.children!.map((node) => node[KEYS_VALUE]);
    }
    // 回发排序事件
    props.tableDrag?.onDrag(sortIds);
  }

  /**
   * 更新表格节点
   * 只更新当前行的信息，不更新层级关系
   *
   * @param row 行数据
   */
  function updateTreeNode(row: Recordable) {
    const rowKey = row[props.rowKey!];
    // 获取更新前行数据
    const sourceRow = tableRef.value.getData(rowKey).row;
    // 合并新旧数据,避免表格树获取的children数据，因编辑时没有而丢失
    defaultsDeep(row, sourceRow);
    // 更新表格节点
    tableRef.value.setData(row[props.rowKey!], row);
  }

  /**
   * 移除当前节点及其所有子节点
   *
   * @param rowKey 行id
   */
  function removeTreeNode(rowKey) {
    tableRef.value.remove(rowKey);
  }

  /**
   * 移动树表格节点
   *
   * @param key 新的目标父节点
   * @param row 行数据
   */
  function moveTreeNode(targetParentId: string, row: Recordable) {
    // 当前移动行key
    const rowKey = row[props.rowKey!];
    // 1.删除当前节点
    removeTreeNode(rowKey);
    // 2.新的父节点插入当前子节点
    insertTreeNode(targetParentId, row, 'appendTo');
  }

  /**
   * 拖拽排序树表格节点
   *
   * @param context 树表格拖拽上下文
   */
  function onDragSort(context: DragSortContext<Recordable>) {
    if (context.current[KEYS_PARENT_ID] != context.target[KEYS_PARENT_ID]) {
      errorMessage('不同层级的元素，不允许调整顺序');
      return;
    }
    // 拖拽的元素同一行的所有rowKeys
    const sortIds = context.newData.map((row) => row[props.rowKey!]);
    // 回发拖拽排序事件
    props.tableDrag?.onDrag(sortIds);
  }
  return {
    treeConfig,
    onExpandedTreeNodesChange,
    insertTreeNode,
    updateTreeNode,
    removeTreeNode,
    onDragSort,
    moveTreeNode
  };
}
