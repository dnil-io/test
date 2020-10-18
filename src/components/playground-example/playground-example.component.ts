import { Component } from "@ribajs/core";

import template from "./playground-example.component.html";

interface Scope {
  open: boolean;
  transitioning: boolean;
  toggle: PlaygroundExampleComponent["toggle"];
}

export class PlaygroundExampleComponent extends Component {
  public static tagName: string = "rv-playground-example";

  protected autobind = true;
  protected flipcardEl?: HTMLElement;

  static get observedAttributes() {
    return [];
  }

  protected scope: Scope = {
    open: false,
    transitioning: false,
    toggle: this.toggle,
  };

  constructor(element?: HTMLElement) {
    super(element);
    console.debug("constructor", this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    return this.init(PlaygroundExampleComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
  }

  protected async beforeBind() {
    await super.beforeBind();
  }

  protected async afterBind() {
    await super.afterBind();
    this.flipcardEl = (this.el.getElementsByClassName("flip-card")[0] as HTMLElement);
  }

  protected requiredAttributes() {
    return [];
  }

  protected parsedAttributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null) {
    return super.parsedAttributeChangedCallback(attributeName, oldValue, newValue, namespace);
  }
  
  protected offset(el: HTMLElement) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  protected toggle() {
    if (this.scope.transitioning) {
      return;
    }
    if (!this.scope.open) {
      this.open();
    } else {
      this.close();
    }
  }

  protected open() {
    if (typeof this.flipcardEl === "undefined") {
      throw new Error("this.flipcardEl cannot be undefined");
    }
    //transition to open
    this.scope.transitioning = true;

    var viewportOffset = this.offset(this.flipcardEl);
    var top = viewportOffset.top;
    var left = viewportOffset.left;

    this.flipcardEl.style.transition = "none";
    this.flipcardEl.style.position = "fixed";
    this.flipcardEl.style.left = left + "px";
    this.flipcardEl.style.top = top + "px";
    this.flipcardEl.style.zIndex = "100000";
    //blur(true);

    setTimeout(() => {
      if (typeof this.flipcardEl === "undefined") {
        return;
      }
      this.flipcardEl.style.removeProperty("transition");
      this.scope.open = true;

      this.flipcardEl.addEventListener(
        "transitionend",
        () => {
          if (typeof this.flipcardEl === "undefined") {
            return;
          }
          this.scope.transitioning = false;
        },
        { once: true }
      );
    }, 1);
  }

  protected close() {
    //transition to closed
    if (typeof this.flipcardEl === "undefined") {
      throw new Error("this.flipcardEl cannot be undefined");
    }
    this.scope.open = false;
    this.scope.transitioning = true;

    this.flipcardEl.addEventListener(
      "transitionend",
      () => {
        if (typeof this.flipcardEl === "undefined") {
          return;
        }
        this.flipcardEl.style.transition = "none";
        this.flipcardEl.style.removeProperty("top");
        this.flipcardEl.style.removeProperty("left");
        this.flipcardEl.style.removeProperty("position");
        this.flipcardEl.style.removeProperty("z-index");
        this.scope.transitioning = false;

        setTimeout(() => {
          if (typeof this.flipcardEl === "undefined") {
            return;
          }
          this.flipcardEl.style.removeProperty("transition");
        });
      },
      { once: true }
    );
  }

  // deconstructor
  protected disconnectedCallback() {
    return super.disconnectedCallback();
  }

  protected template() {
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      return null;
    } else {
      return template;
    }
  }
}
