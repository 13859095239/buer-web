<!--
  - 用户列表页
  -
  - @author zoulan
  - @since 2023-07-12
  -->
<template>
  <SiderContainer>
    <template #sider>
      <BasicTree
        v-model="deptId"
        v-bind="treeProps"
      />
    </template>
    <BasicTable
      v-model:methods="tableMethods"
      :height="appStore.contentHeight"
      v-bind="tableProps"
    />
    <Edit
      ref="editRef"
      :deptId="deptId"
      @saved="tableMethods.reload()"
    />
    <ResetPassword ref="resetPasswordRef" />
    <BasicExcelImportModal
      v-model:visible="importVisible"
      title="用户数据导入"
      uploadUrl="system/user/upload"
      importUrl="system/user/import/async"
      templateUrl="system/user/template"
      @success="handleImportSuccess"
      @error="handleImportError"
    />
  </SiderContainer>
</template>
<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { ref, shallowRef } from 'vue';

import { treeDept } from '/@/api/system/dept';
import { exportUser, pageUser, removeUserByIds } from '/@/api/system/user';
import { SiderContainer } from '/@/components/Container';
import { BasicExcelImportModal } from '/@/components/ExcelImportModal';
import type { BasicTableProps, TableMethods } from '/@/components/Table';
import { BasicTable } from '/@/components/Table';
import { ActionIconEnum } from '/@/components/Table/src/enums';
import { useTableActionsColumn } from '/@/components/Table/src/hooks/useColumn';
import type { BasicTreeProps } from '/@/components/Tree';
import { BasicTree } from '/@/components/Tree';
import { useAppStore } from '/@/store/modules/app';
import { saveFileByBlob } from '/@/utils/download';
import { deleteSuccess, deleteWarnModel } from '/@/utils/prompt';

import Edit from './Edit.vue';
import ResetPassword from './ResetPassword.vue';

const editRef = ref<InstanceType<typeof Edit> | null>();
const resetPasswordRef = ref<InstanceType<typeof ResetPassword> | null>();
const tableMethods = ref<TableMethods>({} as TableMethods);
const deptId = ref<string | undefined>();
const appStore = useAppStore();
const importVisible = ref(false);

// 导入相关方法
const handleImportSuccess = (result: any) => {
  MessagePlugin.success(`导入成功，共导入 ${result.success} 条数据`);
  tableMethods.value.reload();
  importVisible.value = false;
};

const handleImportError = (error: Error) => {
  MessagePlugin.error(`导入失败: ${error.message}`);
};

// 导出用户数据
const handleExport = async () => {
  const searchFormData = tableMethods.value.getSearchFormMethods?.()?.getFormData() || {};
  const params = {
    ...searchFormData,
    deptId: deptId.value
  };
  const response = await exportUser(params);
  saveFileByBlob(response as Blob, '用户数据');
  MessagePlugin.success('导出成功');
};
/** 初始化部门树对象 */
const treeProps = shallowRef<BasicTreeProps>({
  isLazy: false,
  searchForm: {
    name: '名称'
  },
  getApi: (params) => treeDept(params),
  onSelectedChange: () => {
    tableMethods.value.reload();
  }
});

/** 初始化Table */
const tableProps = shallowRef<BasicTableProps>({
  immediate: false,
  title: '用户管理',
  getApi: (params) => pageUser({ ...params, deptId: deptId.value }),
  toolbar: [
    {
      name: '新增',
      onClick: () => {
        deptId.value = '';
        editRef.value?.showAdd();
      }
    },
    {
      name: '导入',
      onClick: () => {
        importVisible.value = true;
      }
    },
    {
      name: '删除',
      theme: 'danger',
      isRelationSelected: true,
      onClick: ({ selectedRowKeys }) => {
        deleteWarnModel().then(() => {
          removeUserByIds(selectedRowKeys).then(() => {
            deleteSuccess();
            tableMethods.value.reload();
          });
        });
      }
    }
  ],
  columns: [
    { title: '用户名', colKey: 'username', width: 150 },
    { title: '姓名', colKey: 'nickname', width: 150 },
    { title: '手机号', colKey: 'phone', width: 120 },
    { title: '状态', colKey: 'lockFlag', format: 'lockFlag', width: 100 },
    { title: '排序', colKey: 'sort', width: 100 },
    {
      title: '操作',
      colKey: 'actions',
      width: 220,
      fixed: 'right',
      cell: (_h, cell) =>
        useTableActionsColumn(cell, [
          {
            label: '编辑',
            onClick: ({ id }) => {
              editRef.value?.showEdit(id);
            }
          },
          {
            label: '查看',
            onClick: ({ id }) => {
              editRef.value?.show(id);
            }
          },
          {
            label: '密码重置',
            onClick: ({ id, username, nickname }) => {
              resetPasswordRef.value!.showEdit(id, username, nickname);
            }
          },
          {
            label: '删除',
            theme: 'danger',
            onClick: ({ id }) => {
              deleteWarnModel().then(() => {
                removeUserByIds([id]).then(() => {
                  deleteSuccess();
                  tableMethods.value.reload();
                });
              });
            }
          }
        ])
    }
  ],
  searchFormProps: {
    type: 'default',
    inputSearchField: 'name',
    inputSearchPlaceholder: '姓名',
    formSchemas: [
      { label: '用户名', field: 'username', component: 'Input' },
      { label: '姓名', field: 'name', component: 'Input' },
      { label: '手机号', field: 'phone', component: 'Input' }
    ]
  },
  BasicSiderToolbar: [
    {
      name: '导出',
      icon: ActionIconEnum.EXPORT,
      onClick: handleExport
    }
  ]
});
</script>
