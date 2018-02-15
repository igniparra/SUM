import { Element as PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/app-layout/app-drawer/app-drawer.js';
import '../node_modules/@polymer/app-layout/app-header/app-header.js';
import '../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../node_modules/@polymer/iron-icons/iron-icons.js';
import '../node_modules/@polymer/paper-icon-button/paper-icon-button.js';
import '../node_modules/@polymer/paper-button/paper-button.js';
import '../node_modules/@polymer/paper-styles/color.js';

export default class SumHeader extends PolymerElement {
  static get template() {
    return html`
      <style include="typography">
        app-toolbar {
          background-color: var(--google-blue-500);
          color: #fff;
        }
        app-header {
          @apply --layout-fixed-top;
        }
        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }
      </style>

      <app-header condenses reveals fixed>
        <app-toolbar>
          <paper-icon-button icon="menu" drawer-toggle></paper-icon-button>
          <div spacer main-title>SUM</div>
        </app-toolbar>
      </app-header>

      <app-drawer id="drawer" swipe-open></app-drawer>
    `;
  }
}

customElements.define('sum-header', SumHeader);
