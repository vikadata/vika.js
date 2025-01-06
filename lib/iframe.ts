import {IframeMessageName} from "./enums";
import {IEventFunc, ITriggerIframeMessage} from "./interface/iframe";

declare let window: any;

export class IframeManager {
  event: Map<string, Set<IEventFunc>>;

  private listener = (event: any) => {
    const data = event.data;
    const message = data.message;
    const _data = data.data;
    const stack = this.event.get(message);
    if (!stack) {
      return;
    }
    stack.forEach(func => {
      func(_data);
    });
  };

  constructor() {
    console.log('init iframe manager');

    this.event = new Map();

    if (typeof window == 'undefined') {
      console.log('window is undefined');
      return;
    }

    window.addEventListener('message', this.listener);
  }

  subscribe(eventName: IframeMessageName, func: IEventFunc) {
    if (!this.event.has(eventName)) {
      this.event.set(eventName, new Set([func]));
      return;
    }

    const stack = this.event.get(eventName) || new Set();

    if (stack.has(func)) {
      console.error('has same function');
      return;
    }

    stack.add(func);
    this.event.set(eventName, stack);
  }

  unSubscribe(eventName: IframeMessageName, func: IEventFunc) {
    if (!this.event.has(eventName)) {
      console.error('there are no subscribe');
      return;
    }

    const stack = this.event.get(eventName) || new Set();
    stack.delete(func);
    this.event.set(eventName, stack);
  }

  unSubscribeAll() {
    this.event = new Map();
  }

  // 看起来，这个方法应该是 embed 的容器向 iframe 发送消息
  // 比如说，页面有一个 export csv 的按钮，点击后，触发 vika 内部的导出操作
  triggerEvent({ iframeRef, eventName, data }: ITriggerIframeMessage) {
    iframeRef?.contentWindow?.postMessage(
      {
        msg: eventName,
        data
      },
      '*',
    );
  }
}
