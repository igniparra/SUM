import { Element as PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/app-layout/app-drawer/app-drawer.js';
import '../node_modules/@polymer/app-layout/app-header/app-header.js';
import '../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../node_modules/@polymer/iron-icons/iron-icons.js';
import '../node_modules/@polymer/paper-icon-button/paper-icon-button.js';
import '../node_modules/@polymer/paper-styles/color.js';
import '../node_modules/@polymer/app-layout/app-header-layout/app-header-layout.js';
import '../node_modules/@polymer/app-route/app-route.js';
import '../node_modules/@polymer/app-route/app-location.js';
import '../node_modules/@polymer/iron-pages/iron-pages.js';
import '../node_modules/@polymer/paper-styles/typography.js';
import './header.js';
import './availability.js';
import './booking.js';
import './bookings.js';
import './home.js';
import './login.js';
import './profile.js';

export default class SumApp extends PolymerElement {
  static get properties() {
    return {
      user: Object,
      page: {
        type: String,
        reflectToAttribute: true,
      },
    };
  }

  _routePageChanged(page) {
    if (!this.user) {
      this.set('route.path', '/login');
    }
    this.page = page || 'home';
  }

  static get observers() {
    return ['_routePageChanged(routeData.page)'];
  }

  static get template() {
    return html`
      <style include="typography">
        :host {
          @apply --paper-font-common-base;
        }
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

      <app-header-layout fullbleed>

        <template is="dom-if" if="[[user]]">
          <app-header slot="header" fixed condenses effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="menu"></paper-icon-button>
              <div spacer main-title>SUM</div>
            </app-toolbar>
          </app-header>
        </template>

        <div>
          <app-location route="{{route}}"></app-location>
          <app-route
            route="{{route}}"
            pattern="/:page"
            data="{{routeData}}"
            tail="{{subroute}}"></app-route>

          <iron-pages role="main" selected="[[page]]" attr-for-selected="name" selected-attribute="visible">
            <sum-home route="[[subroute]]" name="home"></sum-home>
            <sum-login route="[[subroute]]" router="{{route}}" name="login" user="{{user}}"></sum-login>
            <sum-availability route="[[subroute]]" name="ver-disponibilidad"></sum-availability>
            <sum-booking route="[[subroute]]" name="reservar"></sum-booking>
            <sum-user-profile route="[[subroute]]" name="mi-perfil"></sum-user-profile>
            <sum-user-bookings route="[[subroute]]" name="mis-reservas"></sum-user-bookings>
          </iron-pages>
        </div>
      </app-header-layout>
    `;
  }
}

firebase.initializeApp({
  apiKey: 'AIzaSyAfInNjNCAedriaEZfmLEKDKhTXdqfoSi0',
  authDomain: 'sum-southpoint.firebaseapp.com',
  databaseURL: 'https://sum-southpoint.firebaseio.com',
  projectId: 'sum-southpoint',
  storageBucket: 'sum-southpoint.appspot.com',
  messagingSenderId: '794865693746',
});

customElements.define('sum-app', SumApp);
