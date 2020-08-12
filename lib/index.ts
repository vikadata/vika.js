declare const isBrowserEnv: boolean;
declare const window: any;

export class Vika {
  init() {
    console.log('vika init!');
  }
}

// for vika.browser.js 在全局挂载 Vika 变量
if (typeof isBrowserEnv !== "undefined") {
  window.Vika = Vika;
}
