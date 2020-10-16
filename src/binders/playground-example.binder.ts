import { Binder } from '@ribajs/core';

export const PlaygroundExampleBinder: Binder<string> = {
  name: 'playground-example',
  routine(el: HTMLUnknownElement, value: string) {
    el.innerHTML = (value ? value : '') + ' from playground-example <strong>binder</strong>!';
  },
};
