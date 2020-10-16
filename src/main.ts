import { coreModule, Riba } from '@ribajs/core';
import { PlaygroundModule } from './playground.module';

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(PlaygroundModule);

const bindToElement = document.getElementById('rv-playground');
if (bindToElement !== null) {
  riba.bind(bindToElement, model);
} else {
  console.warn(new Error('No element with id "rv-playground" found! Use body as fallback.'));
  riba.bind(document.body, model);
}

