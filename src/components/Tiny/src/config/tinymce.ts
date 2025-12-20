/**
 * Tiny插件配置
 *
 * @author zoulan
 * @since 2023-08-15
 */
export const plugins = [
  'advlist',
  'autolink',
  'lists',
  'link',
  'image',
  'charmap',
  'preview',
  'anchor',
  'searchreplace',
  'visualblocks',
  'code',
  'fullscreen',
  'insertdatetime',
  'media',
  'table',
  'wordcount'
];

/** 菜单栏 */
export const menu = {
  file: {
    title: 'File',
    items: 'newdocument restoredraft | preview | importword exportpdf exportword | print | deleteallconversations'
  },
  edit: {
    title: 'Edit',
    items: 'undo redo | cut copy paste pastetext | selectall | searchreplace'
  },
  view: {
    title: 'View',
    items:
      'code revisionhistory | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments'
  },
  insert: {
    title: 'Insert',
    items:
      'image link media addcomment pageembed codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime'
  },
  format: {
    title: 'Format',
    items:
      'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat'
  },
  tools: {
    title: 'Tools',
    items: ''
  },
  table: {
    title: 'Table',
    items: 'inserttable | cell row column | advtablesort | tableprops deletetable'
  },
  help: { title: 'Help', items: '' }
};

/** 工具栏 */
export const toolbar =
  'undo redo | blocks | ' +
  'bold italic backcolor | alignleft aligncenter ' +
  'alignright alignjustify | bullist numlist outdent indent | ' +
  'removeformat fullscreen';

/** 内容样式 */
export const content_style = 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }';
