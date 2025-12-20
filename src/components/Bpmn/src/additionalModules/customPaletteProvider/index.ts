import type { ModuleDeclaration } from 'didi';

import customPaletteProvider from './customPaletteProvider';

// 覆盖默认paletteProvider构造函数
const RerenderPalette: ModuleDeclaration = {
  __init__: ['paletteProvider'],
  paletteProvider: ['type', customPaletteProvider]
};

export default RerenderPalette;
