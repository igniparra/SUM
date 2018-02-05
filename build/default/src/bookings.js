import { Element as PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';

export default class UserBookings extends PolymerElement {
  static get template() {
    return html`
<div>
  <h1>Mis Reservas</h1>
</div>
`;
  }
}

customElements.define('sum-user-bookings', UserBookings);
