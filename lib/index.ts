declare const isBundleForBrowser: boolean;
declare const window: any;
import { Vika } from './vika';
export * from './vika';

// for vika.browser.js 在全局挂载 Vika 变量
if (typeof isBundleForBrowser !== 'undefined') {
  window.Vika = Vika;
}
