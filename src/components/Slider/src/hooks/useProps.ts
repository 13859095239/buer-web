/**
 * slider 组件 props hooks
 *
 * @author zoulan
 * @since 2024-05-11
 */
import { isString } from 'lodash-es';
import type { SliderProps } from 'tdesign-vue-next';
import { computed } from 'vue';

import type { BasicSliderProps } from '../types';

export function useProps(props: BasicSliderProps) {
  const sliderPropsComputed = computed((): SliderProps => {
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
  return { sliderPropsComputed };
}
