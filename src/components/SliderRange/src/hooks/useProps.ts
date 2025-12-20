/**
 * slider range 组件 props hooks
 *
 * @author zoulan
 * @since 2024-05-11
 */
import { isString } from 'lodash-es';
import type { SliderProps } from 'tdesign-vue-next';
import { computed } from 'vue';

import type { BasicSliderRangeProps } from '../types';

export function useProps(props: BasicSliderRangeProps) {
  const sliderRangePropsComputed = computed((): SliderProps => {
    const { min, max, step, tipFormatter } = props;
    const sliderProps: SliderProps = {
      min,
      max,
      step,
      tipFormatter: tipFormatter
        ? (value) => {
            if (isString(tipFormatter)) {
              return value + tipFormatter!;
            } else {
              return tipFormatter!(value);
            }
          }
        : undefined
    };
    return sliderProps;
  });
  return { sliderRangePropsComputed };
}
