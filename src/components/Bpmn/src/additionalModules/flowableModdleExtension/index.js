/*
 * @author igdianov
 * address https://github.com/igdianov/activiti-bpmn-moddle
 * */
import FlowableExtension from './flowableExtension.js';

export default {
  __init__: ['FlowableModdleExtension'],
  name: 'FlowableModdleExtension',
  FlowableModdleExtension: ['type', FlowableExtension]
};
