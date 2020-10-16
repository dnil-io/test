import { Riba, textBinder } from '@ribajs/core';
import { PlaygroundExampleFormatter } from './playground-example.formatter';

const riba = new Riba();
riba.module.formatter.regist(PlaygroundExampleFormatter);
riba.module.binder.regist(textBinder);

interface Model {
  obj?: {
    value: string;
  };
}

describe('riba.formatters', () => {

  describe('playground-example', () => {
    let model: Model = {};

    beforeEach(() => {
      model = {};
    });

    it('The example string should be added to the value of the model', () => {
      model.obj = {
        value: 'Hello World',
      };
      const el = document.createElement('div');
      el.setAttribute('rv-text', 'obj.value | playground-example "!"');
      riba.bind(el, model);
      expect(el.textContent).toEqual('Hello World from playground-example <strong>formatter</strong> !');
    });
  });
});
