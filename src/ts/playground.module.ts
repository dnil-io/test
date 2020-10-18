import { RibaModule } from '@ribajs/core';
import * as binders from '../binders';
import * as components from '../components';
import * as formatters from '../formatters';

export const PlaygroundModule: RibaModule = {
  binders,
  components,
  formatters,
  services: {},
};

export default PlaygroundModule;
