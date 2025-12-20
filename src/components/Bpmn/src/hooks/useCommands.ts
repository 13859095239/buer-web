/**
 * modeler 命令 hooks
 *
 * @author zoulan
 * @since 2023-06-21
 */
import type Modeler from 'bpmn-js/lib/Modeler';
import type CommandStack from 'diagram-js/lib/command/CommandStack';
import type { Ref } from 'vue';

export function useCommands(modeler: Ref<Modeler>) {
  const commandStack = modeler.value.get<CommandStack>('commandStack');
  /**
   * 重置画板内容
   */
  function redo() {
    commandStack.redo();
  }
  /**
   * 撤销上一步，画板内容
   */
  function undo() {
    commandStack.undo();
  }
  function restart() {
    // recoverable = false;
    // revocable = false;
    // createNewDiagram(null);
  }
  return {
    redo,
    undo,
    restart
  };
}
