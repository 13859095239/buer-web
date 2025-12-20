import { getDictItemListByKey } from '/@/api/system/dict';
import type { BasicRadioProps } from '/@/components/Radio';

export function useDictRadio(dictKey: string): BasicRadioProps {
  const radioProps = {
    valueField: 'value',
    getApi: () => getDictItemListByKey(dictKey)
  };
  return radioProps;
}
