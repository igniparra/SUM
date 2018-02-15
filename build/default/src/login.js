import { Element as PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '../node_modules/@polymer/paper-button/paper-button.js';
import '../node_modules/@polymer/paper-card/paper-card.js';
import '../node_modules/@polymer/paper-input/paper-input.js';
import '../node_modules/@polymer/paper-dialog/paper-dialog.js';
import '../node_modules/@polymer/paper-dialog-behavior/paper-dialog-behavior.js';

export default class Login extends PolymerElement {
  static get properties() {
    return {
      router: {
        type: Object,
        notify: true,
      },
      user: {
        type: Object,
        notify: true,
      },
      email: String,
      password: String,
      loginError: {
        code: String,
        message: String,
      }
    };
  }

  static get template() {
    return html`
        <style include="iron-flex">
          .fullbleed {
            height: 100vh;
            width: 100vw;
            position: fixed;
            top: 0;
            left: 0;
          }

          .login-box {
            width: 250px;
          }

          .login-button {
            width: 100%;
            margin: 0;
          }
        </style>
        <div class="fullbleed layout horizontal center-center">
          <paper-card class="login-box">
            <div class="card-content">
              <paper-input
                autofocus
                id="email"
                label="Correo Electr&oacute;nico"
                name="email"
                required
                auto-validate error-message="Debe ingresar un Correo Electrónico"
                type="email"
                value="{{email}}"
              ></paper-input>
              <paper-input
                id="password"
                label="Contrase&ntilde;a"
                name="password"
                required
                auto-validate error-message="Debe ingresar una Contraseña"
                type="password"
                value="{{password}}"
              ></paper-input>
            </div>
            <div class="card-actions">
              <paper-button class="login-button" on-tap="login">Ingresar</paper-button>
            </div>
          </paper-card>
        </div>

        <paper-dialog id='dialog'>
          {{error.message}}
          <div class="buttons">
            <paper-button dialog-confirm autofocus>Aceptar</paper-button>
          </div>
        </paper-dialog>
`;
  }

  login() {
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
      this.user = user;
      this.set('router.path', '/');
    }, function(error) {
      console.error('Sign In Error', error);
      this.$.dialog.open();
    });
  }
}

customElements.define('sum-login', Login);
