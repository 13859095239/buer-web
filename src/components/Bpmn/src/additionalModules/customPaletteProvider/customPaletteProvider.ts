/**
 * 自定义左边工具栏 PaletteProvider
 *
 * @author zoulan
 * @since 2023-06-24
 */

import type { Translate } from 'bpmn-js/lib/features/modeling/ElementFactory.js';
import type ElementFactory from 'bpmn-js/lib/features/modeling/ElementFactory.js';
import type {
  Create,
  GlobalConnect,
  HandTool,
  LassoTool,
  Palette,
  SpaceTool
} from 'bpmn-js/lib/features/palette/PaletteProvider';
import PaletteProvider from 'bpmn-js/lib/features/palette/PaletteProvider';
import { assign } from 'lodash-es';

class CustomPaletteProvider extends PaletteProvider {
  // 全局变量，按需定义

  // 创建元素方法
  private create: Create;
  // 元素工具类
  private elementFactory: ElementFactory;
  // 套索工具类
  private lassoTool: LassoTool;
  // 手型工具类
  private handTool: HandTool;
  // 全局连接工具类
  private globalConnect: GlobalConnect;
  // 控件调整工具类
  private spaceTool: SpaceTool;

  /**
   * 构造函数
   */
  constructor(
    palette: Palette,
    create: Create,
    elementFactory: ElementFactory,
    spaceTool: SpaceTool,
    lassoTool: LassoTool,
    handTool: HandTool,
    globalConnect: GlobalConnect,
    translate: Translate
  ) {
    super(palette, create, elementFactory, spaceTool, lassoTool, handTool, globalConnect, translate);
    this.create = create;
    this.elementFactory = elementFactory;
    this.lassoTool = lassoTool;
    this.handTool = handTool;
    this.globalConnect = globalConnect;
    this.spaceTool = spaceTool;
  }

  /**
   * 自定义Palette
   * @returns actions元素
   */
  getPaletteEntries() {
    const actions = {};
    const create = this.create;
    const elementFactory = this.elementFactory;
    const lassoTool = this.lassoTool;
    const handTool = this.handTool;
    const globalConnect = this.globalConnect;
    const spaceTool = this.spaceTool;

    /**
     * 创建自定义元素，先留着以后看看
     */
    function createSqlTask(event) {
      const sqlTask = elementFactory.createShape({ type: 'miyue:SqlTask' });
      create.start(event, sqlTask, {});
    }

    /**
     * 创建通用Action
     */
    function createAction(type, group, className, title) {
      function createListener(event) {
        const shape = elementFactory.createShape(assign({ type }));
        create.start(event, shape, {});
      }
      return {
        group,
        className,
        title,
        action: {
          dragstart: createListener,
          click: createListener
        }
      };
    }

    /**
     * 创建子流程Action
     */
    function createSubprocess(event) {
      const subProcess = elementFactory.createShape({
        type: 'bpmn:SubProcess',
        x: 0,
        y: 0,
        isExpanded: true
      });

      // 子流程中默认包含开始事件
      const startEvent = elementFactory.createShape({
        type: 'bpmn:StartEvent',
        x: 40,
        y: 82,
        parent: subProcess
      });

      create.start(event, [subProcess, startEvent], {
        hints: {
          autoSelect: [startEvent]
        }
      });
    }
    // 工具栏定义
    assign(actions, {
      'hand-tool': {
        group: 'tools',
        className: 'bpmn-icon-hand-tool',
        title: '手型工具',
        action: {
          click(event) {
            handTool.activateHand(event, null, null);
          }
        }
      },
      'space-tool': {
        group: 'tools',
        className: 'bpmn-icon-space-tool',
        title: '间距调整工具',
        action: {
          click(event) {
            spaceTool.activateSelection(event, true, true);
          }
        }
      },
      'lasso-tool': {
        group: 'tools',
        className: 'bpmn-icon-lasso-tool',
        title: '套索工具',
        action: {
          click(event) {
            lassoTool.activateSelection(event, false);
          }
        }
      },
      'global-connect-tool': {
        group: 'tools',
        className: 'bpmn-icon-connection-multi',
        title: '全局连线',
        action: {
          click() {
            globalConnect.toggle();
          }
        }
      },
      // 工具分割线
      'tool-separator': {
        group: 'tools',
        separator: true
      },
      'create.start-event': createAction('bpmn:StartEvent', 'events', 'bpmn-icon-start-event-none', '开始事件'),
      'create.end-event': createAction('bpmn:EndEvent', 'events', 'bpmn-icon-end-event-none', '结束事件'),
      // 事件分割线
      'events-separator': {
        group: 'events',
        separator: true
      },
      'create.exclusive-gateway': createAction(
        'bpmn:ExclusiveGateway',
        'gateway',
        'bpmn-icon-gateway-none',
        '排他网关'
      ),
      'create.parallel-gateway': createAction(
        'bpmn:ParallelGateway',
        'gateway',
        'bpmn-icon-gateway-parallel',
        '并行网关'
      ),
      'create.inclusive-gateway': createAction('bpmn:InclusiveGateway', 'gateway', 'bpmn-icon-gateway-or', '包容网关'),
      'create.event-base-gateway': createAction(
        'bpmn:EventBasedGateway',
        'gateway',
        'bpmn-icon-gateway-eventbased',
        '事件网关'
      ),
      // 网关分割线
      'gateway-separator': {
        group: 'gateway',
        separator: true
      },
      'create.user-task': createAction('bpmn:UserTask', 'activity', 'bpmn-icon-user-task', '用户任务'),
      'create.script-task': createAction('bpmn:ScriptTask', 'activity', 'bpmn-icon-script-task', '脚本任务'),
      'create.service-task': createAction('bpmn:ServiceTask', 'activity', 'bpmn-icon-service-task', '服务任务'),
      'create.sql-task': {
        group: 'activity',
        className: 'miyue-sql-task',
        title: '数据库任务',
        action: {
          click: createSqlTask,
          dragstart: createSqlTask
        }
      },
      'create.subprocess-expanded': {
        group: 'activity',
        className: 'bpmn-icon-subprocess-expanded',
        title: '子流程',
        action: {
          dragstart: createSubprocess,
          click: createSubprocess
        }
      },
      'create.group': createAction('bpmn:Group', 'artifact', 'bpmn-icon-group', '组')
    });

    return actions;
  }
}

export default CustomPaletteProvider;
