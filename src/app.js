import { Element as PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/app-layout/app-drawer/app-drawer.js';
import '../node_modules/@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '../node_modules/@polymer/app-layout/app-header/app-header.js';
import '../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../node_modules/@polymer/iron-icons/iron-icons.js';
import '../node_modules/@polymer/paper-icon-button/paper-icon-button.js';
import '../node_modules/@polymer/paper-item/paper-item.js';
import '../node_modules/@polymer/paper-styles/color.js';
import '../node_modules/@polymer/app-layout/app-header-layout/app-header-layout.js';
import '../node_modules/@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '../node_modules/@polymer/app-route/app-route.js';
import '../node_modules/@polymer/app-route/app-location.js';
import '../node_modules/@polymer/iron-pages/iron-pages.js';
import '../node_modules/@polymer/iron-selector/iron-selector.js';
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
    };
    this.page = page || 'home';
  }


  static get observers() {
    return ['_routePageChanged(routeData.page)'];
  }

  static get template() {
    return html`
      <style>
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
        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }
      </style>

      <div>
        <app-location route="{{route}}"></app-location>
        <app-route
          route="{{route}}"
          pattern="/:page"
          data="{{routeData}}"
          tail="{{subroute}}">
        </app-route>
      </div>


 <app-drawer-layout responsive-width="1280px">
 <template is="dom-if" if="[[user]]">
        <app-drawer swipe-open slot="drawer">
          <app-toolbar>Menú</app-toolbar>
          <iron-selector class="drawer-list" selected="[[page]]" attr-for-selected="name" role="navigation">
              <paper-item><a name="ver-disponibilidad" href="/availability">Ver Disponibilidad</a></paper-item><br>
              <paper-item><a name="reservar" href="/booking">Reservar</a></paper-item><br>
              <paper-item><a name="mi-perfil" href="/profile">Mi Perfil</a></paper-item><br>
              <paper-item><a name="mis-reservas" href="/bookings">Mis Reservas</a></paper-item><br>
          </iron-selector>
        </app-drawer>

        <app-header-layout fullbleed>

          <app-header slot="header" condenses effects="waterfall">
              <app-toolbar>
                <paper-icon-button icon="menu" drawer-toggle></paper-icon-button>
                <div spacer main-title>SUM</div>
                <paper-icon-button icon="exit-to-app" on-tap="logout">Salir</paper-button>
              </app-toolbar>
            </app-header>

  </template>

          <iron-pages role="main" selected="[[page]]" attr-for-selected="name" selected-attribute="visible">
            <sum-home route="[[subroute]]" name="home"></sum-home>
            <sum-login route="[[subroute]]" router="{{route}}" name="login" user="{{user}}"></sum-login>
            <sum-availability route="[[subroute]]" name="ver-disponibilidad"></sum-availability>
            <sum-booking route="[[subroute]]" name="reservar"></sum-booking>
            <sum-user-profile route="[[subroute]]" name="mi-perfil"></sum-user-profile>
            <sum-user-bookings route="[[subroute]]" name="mis-reservas"></sum-user-bookings>
          </iron-pages>

      </app-header-layout>
 </app-drawer-layout>

    `;
  }
  logout () {
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
    this.user=null;
    this.set('route.path', '/login');
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
