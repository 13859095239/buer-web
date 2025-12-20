/**
 * dom工具类
 *
 * @author zoulan
 * @since 2023-05-22
 */
export interface ViewportOffsetResult {
  left: number;
  top: number;
  right: number;
  bottom: number;
  rightIncludeBody: number;
  bottomIncludeBody: number;
}

export function getBoundingClientRect(element: Element): DOMRect | number {
  if (!element || !element.getBoundingClientRect) {
    return 0;
  }
  return element.getBoundingClientRect();
}

function trim(string: string) {
  return (string || '').replace(/^\s+|\s+$/g, '');
}

/**
 * 是否包含样式
 * @param element
 * @param cls
 * @returns
 */
export function hasClass(element: Element, cls: string) {
  if (!element || !cls) return false;
  if (cls.includes(' ')) throw new Error('className should not contain space.');
  if (element.classList) {
    return element.classList.contains(cls);
  } else {
    return ` ${element.className} `.includes(` ${cls} `);
  }
}

/**
 * 添加样式
 * @param element
 * @param cls
 * @returns
 */
export function addClass(element: Element, cls: string) {
  if (!element) return;
  let curClass = element.className;
  const classes = (cls || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (element.classList) {
      element.classList.add(clsName);
    } else if (!hasClass(element, clsName)) {
      curClass += ` ${clsName}`;
    }
  }
  if (!element.classList) {
    element.className = curClass;
  }
}

/* 移除样式 */
export function removeClass(element: Element, cls: string) {
  if (!element || !cls) return;
  const classes = cls.split(' ');
  let curClass = ` ${element.className} `;

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (element.classList) {
      element.classList.remove(clsName);
    } else if (hasClass(element, clsName)) {
      curClass = curClass.replace(` ${clsName} `, ' ');
    }
  }
  if (!element.classList) {
    element.className = trim(curClass);
  }
}

export function getViewportOffset(element: Element): ViewportOffsetResult {
  // 如果元素不存在
  if (!element) {
    return {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      rightIncludeBody: 0,
      bottomIncludeBody: 0
    };
  }
  const doc = document.documentElement;

  const docScrollLeft = doc.scrollLeft;
  const docScrollTop = doc.scrollTop;
  const docClientLeft = doc.clientLeft;
  const docClientTop = doc.clientTop;

  const pageXOffset = window.pageXOffset;
  const pageYOffset = window.pageYOffset;

  const box = getBoundingClientRect(element);

  const { left: retLeft, top: rectTop, width: rectWidth, height: rectHeight } = box as DOMRect;

  const scrollLeft = (pageXOffset || docScrollLeft) - (docClientLeft || 0);
  const scrollTop = (pageYOffset || docScrollTop) - (docClientTop || 0);
  const offsetLeft = retLeft + pageXOffset;
  const offsetTop = rectTop + pageYOffset;

  const left = offsetLeft - scrollLeft;
  const top = offsetTop - scrollTop;

  const clientWidth = window.document.documentElement.clientWidth;
  const clientHeight = window.document.documentElement.clientHeight;
  return {
    left,
    top,
    right: clientWidth - rectWidth - left,
    bottom: clientHeight - rectHeight - top,
    rightIncludeBody: clientWidth - left,
    bottomIncludeBody: clientHeight - top
  };
}

/**
 * 获取相邻节点的总高度
 *
 * @param element HTMLElement
 * @returns number
 */
export function getSiblingsHeight(element: HTMLElement): number {
  // 如果元素不存在
  if (!element) {
    return 0;
  }
  let siblingsHeight = 0;
  const parentChildrenElement = element.parentElement?.children;
  if (!parentChildrenElement) {
    return siblingsHeight;
  }
  for (let i = 0; i < parentChildrenElement!.length; i++) {
    const childrenElement = parentChildrenElement[i] as HTMLElement;
    if (childrenElement !== element) {
      const height = childrenElement.offsetHeight;
      siblingsHeight += height || 0;
    }
  }
  return siblingsHeight;
}

/**
 * 获取padding
 *
 * @param element HTMLElement
 * @param pseudoElt 伪元素拉取样式信息 比如, ::after, ::before, ::marker, ::line-marker。非必需
 * @returns padding
 */
export function getPadding(element: Element, pseudoElt?: string) {
  // 如果元素不存在
  if (!element) {
    return {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0
    };
  }
  const style = getComputedStyle(element, pseudoElt);
  const paddingTop = Number.parseInt(style.paddingTop);
  const paddingBottom = Number.parseInt(style.paddingBottom);
  const paddingLeft = Number.parseInt(style.paddingLeft);
  const paddingRight = Number.parseInt(style.paddingRight);
  return {
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight
  };
}

/**
 * 获取margin
 *
 * @param element HTMLElement
 * @param pseudoElt 伪元素拉取样式信息 比如, ::after, ::before, ::marker, ::line-marker。非必需
 * @returns margin
 */
export function getMargin(element: Element, pseudoElt?: string) {
  // 如果元素不存在
  if (!element) {
    return {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0
    };
  }
  const style = getComputedStyle(element, pseudoElt);
  const marginTop = Number.parseInt(style.marginTop);
  const marginBottom = Number.parseInt(style.marginBottom);
  const marginLeft = Number.parseInt(style.marginLeft);
  const marginRight = Number.parseInt(style.marginRight);
  return {
    marginTop,
    marginBottom,
    marginLeft,
    marginRight
  };
}

/**
 * 获取border
 *
 * @param element HTMLElement
 * @param pseudoElt 伪元素拉取样式信息 比如, ::after, ::before, ::marker, ::line-marker。非必需
 * @returns border
 */
export function getBorder(element: Element, pseudoElt?: string) {
  // 如果元素不存在
  if (!element) {
    return {
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0
    };
  }
  const style = getComputedStyle(element, pseudoElt);
  const borderTopWidth = Number.parseInt(style.borderTopWidth);
  const borderBottomWidth = Number.parseInt(style.borderBottomWidth);
  const borderLeftWidth = Number.parseInt(style.borderLeftWidth);
  const borderRightWidth = Number.parseInt(style.borderRightWidth);
  return {
    borderTopWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderRightWidth
  };
}

/**
 * 获取外围大小，包含size+margin+padding+border
 *
 * @param element HTMLElement
 * @param pseudoElt 伪元素拉取样式信息 比如, ::after, ::before, ::marker, ::line-marker。非必需
 * @returns 外围大小
 */
export function getOuterSize(element: Element, pseudoElt?: string) {
  // 如果元素不存在
  if (!element) {
    return { outerWidth: 0, outerHeight: 0 };
  }
  const style = getComputedStyle(element, pseudoElt);
  const { paddingTop, paddingBottom, paddingLeft, paddingRight } = getPadding(element, pseudoElt);
  const { marginTop, marginBottom, marginLeft, marginRight } = getMargin(element, pseudoElt);
  const { borderTopWidth, borderBottomWidth, borderLeftWidth, borderRightWidth } = getBorder(element, pseudoElt);
  const height = Number.parseInt(style.height);
  const width = Number.parseInt(style.width);
  let outerWidth = width;
  let outerHeight = height;
  outerHeight += marginTop + marginBottom;
  outerWidth += marginLeft + marginRight;
  if (style.boxSizing === 'content-box') {
    outerHeight += paddingTop + paddingBottom + borderTopWidth + borderBottomWidth;
    outerWidth += paddingLeft + paddingRight + borderLeftWidth + borderRightWidth;
  }
  return { outerWidth, outerHeight };
}
