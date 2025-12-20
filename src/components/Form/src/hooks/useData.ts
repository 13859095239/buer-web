/**
 * 数据操作 hooks
 *
 * @author zoulan
 * @since 2023-08-15
 */
import type { ModelRef, Ref } from 'vue';
import { computed, nextTick, unref } from 'vue';

import { unrefObject } from '/@/utils/object';

import type { BasicFormProps } from '../types/form';

export function useData(
  formProps: BasicFormProps,
  formModel: ModelRef<Recordable<any>, string>,
  loading: Ref<boolean>
) {
  /**
   * 获取数据
   */
  async function getData() {
    const { getApi, keyParms } = unref(formProps);
    if (unref(isKeyParmsHasValue)) {
      loading.value = true;
      const unrefkeyParms = unrefObject(keyParms);
      const data = await getApi?.(unrefkeyParms);
      formModel.value = data;
      loading.value = false;
    }
  }

  /**
   * 刷新数据
   */
  async function reloadData() {
    nextTick(() => {
      getData();
    });
  }

  /**
   * 保存数据
   */
  async function saveData() {
    const { saveApi } = unref(formProps);
    loading.value = true;
    await saveApi?.(unref(formModel));
    loading.value = false;
  }

  /**
   * 更新数据
   */
  async function updateData() {
    loading.value = true;
    const { updateApi } = unref(formProps);
    return new Promise((resolve, reject) => {
      updateApi?.(unref(formModel))
        .then(() => {
          return resolve(true);
        })
        .catch(() => {
          return reject();
        })
        .finally(() => {
          loading.value = false;
        });
    });
  }

  /**
   * 保存或更新数据，根据keyParms是否有值
   */
  async function saveOrUpdateData(): Promise<any> {
    if (formModel.id) {
      return updateData();
    } else {
      return saveData();
    }
  }

  /**
   * 获取formData数据
   */
  function getFormData(): Recordable {
    return formModel;
  }

  /**
   * 判断所有的keyParms是否包含值
   */
  const isKeyParmsHasValue = computed(() => {
    let r = false;
    for (const key in formProps.keyParms) {
      const var1 = unref(formProps.keyParms[key]);
      var1 != null && var1 != undefined && (r = true);
    }
    return r;
  });
  return {
    isKeyParmsHasValue,
    getData,
    saveData,
    updateData,
    saveOrUpdateData,
    getFormData,
    reloadData
  };
}
