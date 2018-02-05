import { Element as PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';

export default class Home extends PolymerElement {
  static get template() {
    return html`
<div>
  <h1>Home</h1>
</div>
`;
  }
}

customElements.define('sum-home', Home);
