/**
 * 菜单类型
 *
 * @author zoulan
 * @since 2023-05-22
 */
export interface SysMenu {
  id: string;
  /** 名称 */
  name: string;
  permission: string;
  /** 菜单父id */
  parentId: string;
  /** 路由地址 */
  path: string;
  /** 组件地址 */
  component: string;
  layout: string;
  /** 图标 */
  icon: string;
  /** 菜单类型 （0目录，1菜单，2权限） */
  menuType: string;
  /** 排序 */
  sort: string;
  /** 是否外链 */
  frameFlag: string;
  /** 外链地址 */
  frameUrl: string;
  /** 显示状态 */
  visibleFlag: string;
  /** 是否嵌入 */
  embedFlag: string;
  /** 子菜单 */
  children: Array<Menu>;
}
export interface Menu extends Omit<SysMenu, 'permission'> {
  parent: Menu;
}
