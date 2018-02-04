import { Element as PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';

export default class Booking extends PolymerElement {
  static get template() {
    return html`
<div>
  <h1>Reservar</h1>
</div>
`;
  }
}

customElements.define('sum-booking', Booking);
