import { Element as PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';

export default class Availability extends PolymerElement {
  static get template() {
    return html`
<div>
  <h1>Ver Disponibilidad</h1>
</div>
`;
  }
}

customElements.define('sum-availability', Availability);
