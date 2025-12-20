/**
 * 列编辑 hooks
 *
 * @author zoulan
 * @since 2024-04-27
 */
import type { PrimaryTableOnEditedContext } from 'tdesign-vue-next';
import type { Ref } from 'vue';

import { EDITED_FIELD_SUFFIX, NEW_ROW_COLUMN_NANME_FLAG } from '../enums';
import type { EditorData, EditorIntactData } from '../types/editor';
import type { BasicTableProps, TableMethods } from '../types/table';

export function useEditor(props: BasicTableProps, dataSource: Ref<Recordable[]>, methods: TableMethods) {
  /**  完整编辑数据 */
  const editorIntactData: EditorIntactData = {
    addList: [],
    updateMap: new Map(),
    deleteList: []
  };

  /** 新增空行 */
  function addNewRow(defaultRecord: Recordable = {}) {
    // 标记新增行
    defaultRecord[NEW_ROW_COLUMN_NANME_FLAG] = true;
    // defaultRecord[props.rowKey!]= buildUUID();
    dataSource.value.push(defaultRecord);
  }

  /** 删除行 */
  function deleteRowByKeys(keys: string | string[]) {
    // 删除的行
    const deleteRows: Recordable[] = [];
    // 新的数据源
    const newDataSource: Recordable[] = [];
    // 遍历数据源，判断每行的key是否在删除keys中
    dataSource.value.forEach((item: Recordable) => {
      if (keys.includes(methods.getKeyByRow(item))) {
        deleteRows.push(item);
      } else {
        newDataSource.push(item);
      }
    });
    // 数据源重新赋值
    dataSource.value = newDataSource;
    // 更新完整编辑数据
    editorIntactData.deleteList.push(...deleteRows);
  }

  /** 获取编辑数据，用于提交后端用 */
  function getEditorData(): EditorData {
    const editorData: EditorData = {
      addList: [],
      updateList: [],
      deleteKeys: ''
    };
    // 新增的数据
    editorData.addList = dataSource.value.filter((row) => row[NEW_ROW_COLUMN_NANME_FLAG]);
    // 删除的数据
    editorData.deleteKeys = editorIntactData.deleteList.map((row) => row[props.rowKey!]).join(',');
    // 更新的数据
    editorIntactData.updateMap.forEach((updateRowMap, rowKey) => {
      // 遍历更新行
      if (updateRowMap.size > 0) {
        const updateRowRecord: Recordable = { [props.rowKey!]: rowKey };
        // 遍历更新列
        updateRowMap.forEach((updateFieldData, fieldKey) => {
          updateRowRecord[fieldKey] = updateFieldData.target;
        });
        // 添加更新行
        editorData.updateList.push(updateRowRecord);
      }
    });
    return editorData;
  }

  /** 清空编辑数据 */
  function clearEditorData() {
    editorIntactData.addList = [];
    editorIntactData.updateMap = new Map();
    editorIntactData.deleteList = [];
  }

  /** 验证编辑，是否不存在未保存的编辑数据 */
  function validateEditor(): boolean {
    return (
      editorIntactData.addList.length === 0 &&
      editorIntactData.updateMap.size === 0 &&
      editorIntactData.deleteList.length === 0
    );
  }

  /**
   * 更新单元格数据
   *
   * @param context t-table单元格变动时传入的参数
   */
  function updateCellData(context: PrimaryTableOnEditedContext<any>) {
    // 修改列的colKey
    const colKey = context.col.colKey as string;
    // 更新行的key
    const rowKey = context.row[props.rowKey!];
    // 修改后的行数据
    // 该数据只代表编辑框里的数据，并不是最终表格编辑后的数据
    const newRowData = context.newRowData;
    // 当前行数据
    const rowData = context.row;
    // 单元格来源值
    const sourceValue = rowData[colKey];
    // 单元格目标值
    const targetValue = newRowData[colKey];
    // 设置单元格数据
    rowData[colKey] = targetValue;
    // 获取更新行map
    const updateRowMap = editorIntactData.updateMap;
    if (newRowData[NEW_ROW_COLUMN_NANME_FLAG]) {
      // 新增的行，不做编辑处理
      return;
    }
    if (!updateRowMap.has(rowKey)) {
      // updateMap未创建当前编辑单元行的rowKey时,创建mapKey
      updateRowMap.set(rowKey, new Map());
    }
    // 获取更新列map
    const updateFieldMap = updateRowMap.get(rowKey)!;
    if (!updateFieldMap.has(colKey)) {
      // 未修改过的列为空，创建新对象并记录原始数据，用于后续判断列是否被修改过
      updateFieldMap.set(colKey, { source: sourceValue });
    }
    // 获取更新列
    const updateField = updateFieldMap.get(colKey)!;
    updateField.target = targetValue;
    if (updateField.source === updateField.target) {
      // 与原始值一致的，判断为非修改，删除当前列修改的状态
      updateFieldMap.delete(colKey);
      // 如果删除完，行中没有其他列是修改状态的，删除当前行修改的状态
      updateRowMap.keys.length === 0 && updateRowMap.delete(rowKey);
      // 更新列编辑状态
      rowData[colKey + EDITED_FIELD_SUFFIX] = false;
    } else {
      // 与原始值不一致的，判断为修改
      updateFieldMap.set(colKey, { source: sourceValue, target: targetValue });
      // 更新列编辑状态
      rowData[colKey + EDITED_FIELD_SUFFIX] = true;
    }
  }

  return {
    addNewRow,
    updateCellData,
    getEditorData,
    deleteRowByKeys,
    clearEditorData,
    validateEditor
  };
}
