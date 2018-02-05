import { Element as PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';

export default class UserProfile extends PolymerElement {
  static get template() {
    return html`
<div>
  <h1>Mi Perfil</h1>
</div>
`;
  }
}

customElements.define('sum-user-profile', UserProfile);
