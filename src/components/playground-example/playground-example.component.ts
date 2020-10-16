import {
  Component,
} from '@ribajs/core';

import template from './playground-example.component.html';

interface Scope {
  hello?: string;
}

export class PlaygroundExampleComponent extends Component {

  public static tagName: string = 'rv-playground-example';

  protected autobind = true;

  static get observedAttributes() {
    return ['hello'];
  }

  protected scope: Scope = {
    hello: undefined,
  };

  constructor(element?: HTMLElement) {
    super(element);
    console.debug('constructor', this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    return this.init(PlaygroundExampleComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes)
    .then((view) => {
      return view;
    });
  }

  protected async beforeBind() {
    await super.beforeBind();
    console.debug('beforeBind', this.scope);
  }

  protected async afterBind() {
    await super.afterBind();
    console.debug('afterBind', this.scope);
  }

  protected requiredAttributes() {
    return [];
  }

  protected parsedAttributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null) {
    return super.parsedAttributeChangedCallback(attributeName, oldValue, newValue, namespace);
  }

  // deconstructor
  protected disconnectedCallback() {
    return super.disconnectedCallback();
  }

  protected template() {
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      console.debug('Do not use template, because element has child nodes');
      return null;
    } else {
      console.debug('Use template', template);
      return template;
    }
  }
}
