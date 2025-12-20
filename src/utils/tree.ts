/**
 * 树工具类
 *
 * @author zoulan
 * @since 2023-05-22
 */
import { cloneDeep } from 'lodash-es';

interface TreeHelperConfig {
  // 树id
  id: string;

  // 树自己点集合
  children: string;

  // 树父节点id
  parent: string;

  // 树父节点对象
  parentId: string;
}
const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  parentId: 'parentId',
  parent: 'parent'
};

const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config);

/**
 * 列表转树
 * @param 列表
 * @param 树配置
 * @returns 树对象
 */
export function listToTree<T = any>(list: T[], config: Partial<TreeHelperConfig> = {}): T[] {
  const listAssign = cloneDeep(list);
  const conf = getConfig(config) as TreeHelperConfig;
  const nodeMap = new Map();
  const result: T[] = [];
  const { id, children, parentId: pid, parent } = conf;
  // 初始化nodeMap
  for (const node of listAssign) {
    node[children] = node[children] || [];
    nodeMap.set(node[id], node);
  }
  // 遍历赋值
  for (const node of listAssign) {
    const parentNode = nodeMap.get(node[pid]);
    node[parent] = parentNode;
    (parentNode ? parentNode.children : result).push(node);
  }
  return result;
}

/**
 * 树转列表
 * @param 树对象
 * @param 树配置
 * @returns 列表
 */
export function treeToList<T = any>(tree: any, config: Partial<TreeHelperConfig> = {}): T {
  config = getConfig(config);
  const { children } = config;
  const result: any = [...tree];
  for (let i = 0; i < result.length; i++) {
    if (!result[i][children!]) continue;
    result.splice(i + 1, 0, ...result[i][children!]);
  }
  return result;
}

/**
 *获取树的父节点列表
 */
export function getNodeParents<T = any>(
  nodes: T | T[],
  func: Fn,
  include: boolean = false,
  config: Partial<TreeHelperConfig> = {}
): T[] {
  config = getConfig(config);
  const result: T[] = [];
  let node = findNode(nodes, func, config);
  const current = node;
  while (node[config.parent!]) {
    result.push(node.parent);
    node = node[config.parent!];
  }
  result.reverse();
  include && result.push(current);
  return result;
}

/**
 *获取树的第一个根节点
 */
export function getFirstLeafNode<T = any>(tree: any, config: Partial<TreeHelperConfig> = {}): T {
  config = getConfig(config);
  const { children } = config;
  let result: T;
  const list = Array.isArray(tree) ? [...tree] : [tree];
  result = list[0];
  while (result[children!]?.length > 0) {
    result = result[children!][0];
  }
  return result;
}

/**
 *
 * @param tree
 * @param func
 * @param config
 * @returns
 */
export function findNode<T = any>(tree: any, func: Fn, config: Partial<TreeHelperConfig> = {}): T | null {
  config = getConfig(config);
  const { children } = config;
  const list = [...tree];
  for (const node of list) {
    if (func(node)) return node;
    node[children!] && list.push(...node[children!]);
  }
  return null;
}

/**
 *
 * @param tree
 * @param func
 * @param config
 * @returns
 */
export function findNodeAll<T = any>(tree: any, func: Fn, config: Partial<TreeHelperConfig> = {}): T[] {
  config = getConfig(config);
  const { children } = config;
  const list = [...tree];
  const result: T[] = [];
  for (const node of list) {
    func(node) && result.push(node);
    node[children!] && list.push(...node[children!]);
  }
  return result;
}

/**
 *
 * @param tree
 * @param func
 * @param config
 * @returns
 */
export function searchNodes<T = any>(tree: any, func: Fn, config: Partial<TreeHelperConfig> = {}): T[] {
  config = getConfig(config);
  const { children } = config;
  const list = [...tree];
  const result: T[] = [];
  for (const node of list) {
    func(node) && result.push(node);
    node[children!] && list.push(...node[children!]);
  }
  return result;
}

/**
 *
 * @param tree
 * @param func
 * @param config
 * @returns
 */
export function findPath<T = any>(tree: any, func: Fn, config: Partial<TreeHelperConfig> = {}): T | T[] | null {
  config = getConfig(config);
  const path: T[] = [];
  const list = [...tree];
  const visitedSet = new Set();
  const { children } = config;
  while (list.length) {
    const node = list[0];
    if (visitedSet.has(node)) {
      path.pop();
      list.shift();
    } else {
      visitedSet.add(node);
      node[children!] && list.unshift(...node[children!]);
      path.push(node);
      if (func(node)) {
        return path;
      }
    }
  }
  return null;
}

/**
 *
 * @param tree
 * @param func
 * @param config
 * @returns
 */
export function findPathAll(tree: any, func: Fn, config: Partial<TreeHelperConfig> = {}) {
  config = getConfig(config);
  const path: any[] = [];
  const list = [...tree];
  const result: any[] = [];
  const visitedSet = new Set();
  const { children } = config;
  while (list.length) {
    const node = list[0];
    if (visitedSet.has(node)) {
      path.pop();
      list.shift();
    } else {
      visitedSet.add(node);
      node[children!] && list.unshift(...node[children!]);
      path.push(node);
      func(node) && result.push([...path]);
    }
  }
  return result;
}

/**
 * 树筛选
 *
 * @param tree
 * @param func
 * @param config
 * @returns
 */
export function filter<T = any>(tree: T[], func: (n: T) => boolean, config: Partial<TreeHelperConfig> = {}): T[] {
  config = getConfig(config);
  const children = config.children as string;
  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children]);
        return func(node) || (node[children] && node[children].length);
      });
  }
  return listFilter(tree);
}

export function forEach<T = any>(tree: T[], func: (n: T) => any, config: Partial<TreeHelperConfig> = {}): void {
  config = getConfig(config);
  const list: any[] = [...tree];
  const { children } = config;
  for (let i = 0; i < list.length; i++) {
    // func 返回true就终止遍历，避免大量节点场景下无意义循环，引起浏览器卡顿
    if (func(list[i])) {
      return;
    }
    children && list[i][children] && list.splice(i + 1, 0, ...list[i][children]);
  }
}

/**
 * @description: Extract tree specified structure
 */
export function treeMap<T = any>(treeData: T[], opt: { children?: string; conversion: Fn }): T[] {
  return treeData.map((item) => treeMapEach(item, opt));
}

/**
 * @description: Extract tree specified structure
 */
export function treeMapEach(data: any, { children = 'children', conversion }: { children?: string; conversion: Fn }) {
  const haveChildren = Array.isArray(data[children]) && data[children].length > 0;
  const conversionData = conversion(data) || {};
  if (haveChildren) {
    return {
      ...conversionData,
      [children]: data[children].map((i: number) =>
        treeMapEach(i, {
          children,
          conversion
        })
      )
    };
  } else {
    return {
      ...conversionData
    };
  }
}
