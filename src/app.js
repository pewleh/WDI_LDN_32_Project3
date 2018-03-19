// 3rd Party Dependencies
import angular from 'angular';
import '@uirouter/angularjs';
import 'angular-messages';
// import 'satellizer';

// 3rd Party Extras
import 'bulma';

// Config Files
import Router from './config/router';
// import Auth from './config/auth';

// Events Controllers
import EventsIndexCtrl from './controllers/events/index';
import EventsNewCtrl from './controllers/events/new';
import EventsShowCtrl from './controllers/events/show';
import EventsEditCtrl from './controllers/events/edit';

// Places Controllers
import PlacesIndexCtrl from './controllers/places/index';
import PlacesNewCtrl from './controllers/places/new';
import PlacesShowCtrl from './controllers/places/show';
import PlacesEditCtrl from './controllers/places/edit';

// Auth Controllers
import LoginCtrl from './controllers/auth/login';
import RegisterCtrl from './controllers/auth/register';

// Services
import Event from './services/Event';
import Place from './services/Place';

// Registrations on App
angular.module('starGazer', ['ui.router', 'ngMessages'])
  .config(Router)
  // .config(Auth)
  .controller('EventsIndexCtrl', EventsIndexCtrl)
  .controller('EventsNewCtrl', EventsNewCtrl)
  .controller('EventsShowCtrl', EventsShowCtrl)
  .controller('EventsEditCtrl', EventsEditCtrl)
  .controller('PlacesIndexCtrl', PlacesIndexCtrl)
  .controller('PlacesNewCtrl', PlacesNewCtrl)
  .controller('PlacesShowCtrl', PlacesShowCtrl)
  .controller('PlacesEditCtrl', PlacesEditCtrl)
  .controller('LoginCtrl', LoginCtrl)
  .controller('RegisterCtrl', RegisterCtrl)
  .service('Event', Event)
  .service('Place', Place);
