import { Formatter } from '@ribajs/core';

export const PlaygroundExampleFormatter: Formatter = {
  name: 'playground-example',
  read(a: string, b: string) {
    return a + ' from playground-example <strong>formatter</strong> ' + b;
  },
};
