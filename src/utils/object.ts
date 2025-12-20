import { assign } from 'lodash-es';
import { unref } from 'vue';

import { isNullOrUnDefOrBlank } from './is';

export function unrefObject(obj: Recordable<any> | undefined) {
  if (isNullOrUnDefOrBlank(obj)) return {};
  const queryParams = {};
  assign(queryParams, obj);
  for (const queryParam in queryParams) {
    queryParams[queryParam] = unref(queryParams[queryParam]);
  }
  return queryParams;
}
