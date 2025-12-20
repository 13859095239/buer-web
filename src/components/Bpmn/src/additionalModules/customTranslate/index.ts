/**
 * 汉化
 *
 * @author zoulan
 * @since 2023-06-20
 */
import zhCN from './zh-cn';

export function customTranslate(template, replacements) {
  replacements = replacements || {};

  // Translate
  template = zhCN[template] || template;

  // Replace
  return template.replace(/\{([^}]+)\}/g, function (_, key) {
    return replacements[key] || `{${key}}`;
  });
}

export default {
  translate: ['value', customTranslate]
};
