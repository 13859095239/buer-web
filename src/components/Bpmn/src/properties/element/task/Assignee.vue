<!--
  - userTask 用户任务办理人设置
  - 配置文件
  - <bpmn:multiInstanceLoopCharacteristics>
  -   // 完成条件
  -   <completionCondition>${1 == 1}</completionCondition>
  - </bpmn:multiInstanceLoopCharacteristics>
  - 参数说明
  - nrOfInstances 实例总数
    nrOfCompletedInstances 已经完成的实例个数
    loopCounter 已经循环的次数
    nrOfActiveInstances 当前还没有完成的实例
  - @author zoulan
  - @since 2024-05-27
  -->
<template>
  <BasicForm
    v-model="form"
    v-model:methods="formMethods"
    v-bind="formProps"
  />
</template>
<!-- eslint-disable no-template-curly-in-string  -->
<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const props = defineProps<Props>();
const formMethods = ref<FormMethods>({} as FormMethods);

import { treeDept } from '/@/api/system/dept';
import { listPost } from '/@/api/system/post';
import { listRole } from '/@/api/system/role';
import { listTeam } from '/@/api/system/team';
import type { BpmnMethods } from '/@/components/Bpmn';
import type { BasicFormProps, FormMethods } from '/@/components/Form';
import { BasicForm } from '/@/components/Form';
import {
  ASSIGN_TYPE_LIST,
  ASSIGN_VARIABLE_TYPE_LIST,
  AUDIT_TYPE_LIST,
  Multi_SIGN_PERCENT_LIST
} from '/@/constants/flowConstants';
import { BPMN_MODDLE_PREFIX } from '/@/settings/componentSetting';

import { AssignTypeEnum } from '../../../types';

interface Props {
  methods: BpmnMethods;
}

const { methods } = props;

const form = defineModel<Recordable>({ default: {} });
/** form配置,需要修改formSchemas[],因此用ref不用shallowRef */
const formProps = ref<BasicFormProps>({
  layout: 'vertical',
  formSchemas: [
    {
      label: '候选类型',
      field: 'flowable:assigneeType',
      component: 'Radio',
      radioProps: {
        options: ASSIGN_TYPE_LIST
      },
      onChange(value) {
        methods.updateAcitiviProperties({
          [`${BPMN_MODDLE_PREFIX}:assigneeType`]: value
        });
        assigneeTypeChange(value);
      }
    },
    {
      label: '人员',
      field: 'user',
      show: false,
      component: 'SelectUserModal',
      selectUserModalProps: {
        multiple: true
      },
      onChange(value) {
        if (value) {
          updateAssign();
        } else {
          methods.updateAcitiviProperties({ assignee: undefined });
        }
      }
    },
    {
      label: '角色',
      field: 'role',
      show: false,
      component: 'Select',
      selectProps: {
        multiple: true,
        getApi: (params) => listRole(params)
      },
      onChange() {
        updateAssign();
      }
    },
    {
      label: '部门',
      field: 'dept',
      show: false,
      component: 'TreeSelect',
      treeSelectProps: {
        isLazy: false,
        multiple: true,
        getApi: (params) => treeDept(params)
      },
      onChange() {
        updateAssign();
      }
    },
    {
      label: '岗位',
      field: 'post',
      show: false,
      component: 'Select',
      selectProps: {
        multiple: true,
        getApi: (params) => listPost(params)
      },
      onChange() {
        updateAssign();
      }
    },
    {
      label: '团队',
      field: 'team',
      show: false,
      component: 'Select',
      selectProps: {
        multiple: true,
        getApi: (params) => listTeam(params)
      },
      onChange() {
        updateAssign();
      }
    },
    {
      label: '变量类型',
      field: 'flowable:variableType',
      show: false,
      component: 'Radio',
      radioProps: {
        options: ASSIGN_VARIABLE_TYPE_LIST
      },
      onChange() {
        updateAssign();
      }
    },
    {
      label: '变量名',
      field: 'flowable:variableName',
      show: false,
      component: 'Input',
      onChange() {
        updateAssign();
      }
    },
    {
      label: '审批方式',
      field: 'flowable:auditType',
      component: 'Radio',
      radioProps: { options: AUDIT_TYPE_LIST },
      onChange() {
        updateAssign();
      }
    },
    {
      label: '会签比例',
      field: 'flowable:multiSignPercent',
      component: 'Radio',
      radioProps: { options: Multi_SIGN_PERCENT_LIST },
      onChange() {
        updateAssign();
      }
    }
  ]
});

/**
 * 审批类型改变触发
 * 改变显示对应的编辑列
 *
 * @param assignType 审批类型
 *
 */
function assigneeTypeChange(assignType: AssignTypeEnum) {
  // 隐藏其他候选类型
  Object.values(AssignTypeEnum)
    .filter((item) => item !== assignType)
    .forEach((item) => {
      if (formMethods.value.findField(item) !== undefined) {
        // 有包含编辑组件的隐藏
        formMethods.value.findField(item).show = false;
      }
    });
  if (assignType === AssignTypeEnum.CUSTOM_VARIABLE) {
    // 自定义变量显示
    formMethods.value.findField('flowable:variableType').show = true;
    formMethods.value.findField('flowable:variableName').show = true;
  } else {
    // 自定义变量隐藏
    formMethods.value.findField('flowable:variableType').show = false;
    formMethods.value.findField('flowable:variableName').show = false;
    const findField = formMethods.value.findField(assignType);
    if (findField) {
      findField.show = true;
    }
  }
}

function updateAssign() {
  let userOrGroupIds: string;
  switch (form.value['flowable:assigneeType']) {
    case AssignTypeEnum.USER:
      userOrGroupIds = form.value.user;
      break;
    case AssignTypeEnum.ROLE:
      userOrGroupIds = form.value.role;
      break;
    default:
      userOrGroupIds = '';
  }
  methods.updateAcitiviAssign(
    String(userOrGroupIds).split(','),
    form.value['flowable:assigneeType'],
    form.value['flowable:auditType'],
    form.value['flowable:multiSignPercent'],
    form.value['flowable:variableType'],
    form.value['flowable:variableName']
  );
}

/** 清空数据 */
const clearData = () => {
  form.value = {};
};
onMounted(() => {
  // 解决页面初次加载不会调用onChange
  assigneeTypeChange(form.value['flowable:assigneeType']);
});

defineExpose({
  clearData
});
</script>
