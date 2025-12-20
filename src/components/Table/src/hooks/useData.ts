/**
 * 数据操作 hooks
 *
 * @author zoulan
 * @since 2023-06-05
 */
import type { Ref } from 'vue';
import { ref } from 'vue';

import { format } from '/@/utils/format';
import { warnModel } from '/@/utils/prompt';

import type { BasicTableProps, TableMethods } from '../types';

interface Page {
  current: Ref<number>;
  pageSize: Ref<number>;
}
const loading = ref(false);
export function useData(props: BasicTableProps, page: Page, searchParms: Ref<Recordable>, methods: TableMethods) {
  const dataSource = ref<Recordable[]>([]);
  const total = ref<number>(0);
  /** 刷新表格 */
  async function reload(params?: Recordable) {
    if (!methods.validateEditor()) {
      // 刷新时，清空编辑数据
      // 存在编辑数据未保存，警告提示
      const r = await warnModel('清空表格中未保存的编辑数据');
      if (!r) {
        return;
      } else {
        // 清空编辑数据
        methods.clearEditorData();
      }
    }
    const searchFormData = methods.getSearchFormMethods?.()?.getFormData() || {};
    // 参数初始化
    const var1 = { ...searchFormData, ...params };
    if (props.tableType === 'basic') {
      // 开启loading组件
      props.autoLoading && methods.loading.openLoading();
      // 基本表格
      const result = await props.getApi?.({
        order: '',
        asc: '',
        pageNumber: page.current.value,
        pageSize: page.pageSize.value,
        ...searchParms.value,
        ...var1
      });
      // 关闭loading组件
      props.autoLoading && methods.loading.closeLoading();
      formatRecords(result.records);
      total.value = result.totalRow;
      dataSource.value = result.records;
    } else {
      // 开启loading组件
      props.autoLoading && methods.loading.openLoading();
      // 基本表格
      const result = await props.getApi?.({
        order: '',
        asc: '',
        pageNumber: page.current.value,
        pageSize: page.pageSize.value,
        ...searchParms.value,
        ...var1
      });
      // 关闭loading组件
      props.autoLoading && methods.loading.closeLoading();
      formatRecords(result);
      total.value = 111;
      dataSource.value = result;
    }
    if (props.onDataChange) {
      props.onDataChange(dataSource.value);
    }
  }
  /** 获取行数据，通过key */
  function findRowDataByKey(key: string): Recordable | undefined {
    return dataSource.value.find((item) => item[props.rowKey!] === key);
  }

  /**
   * 获取行的key
   * @param record 行数据
   */
  function getKeyByRow(record): string {
    return record[props.rowKey!];
  }

  /** 清空所有数据，包含查询条件及选中项 */
  function clearData() {
    dataSource.value = [];
    page.current.value = 1;
    // 清空选中项
    methods.clearSelected();
  }
  /** 格式转换表格数据,如日期格式等 */
  function formatRecords(records: Recordable[]) {
    props.columns?.forEach((column) => {
      if (column.format) {
        records.forEach((record) => {
          const colKey = column.colKey as string;
          record[colKey] = format(record[colKey], column.format!);
        });
      }
    });
  }
  return {
    dataSource,
    reload,
    total,
    loading,
    findRowDataByKey,
    getKeyByRow,
    clearData
  };
}
