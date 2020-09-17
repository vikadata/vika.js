declare const isBundleForBrowser: boolean;
declare const window: any;
import { Vika } from './vika';
export * from './vika';
export * from './interface';
export * from './request';
export * from './datasheet';

// for vika.browser.js 在全局挂载 Vika 变量
if (typeof isBundleForBrowser !== 'undefined') {
  window.Vika = Vika;
}

export default Vika;
