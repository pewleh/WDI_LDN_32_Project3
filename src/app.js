import angular from 'angular';
import '@uirouter/angularjs';
import 'angular-messages';


import Router from './config/router';

import EventsIndexCtrl from './controllers/events/index';
import EventsNewCtrl from './controllers/events/new';
import EventsShowCtrl from './controllers/events/show';
import EventsEditCtrl from './controllers/events/edit';
import AuthLoginCtrl from './controllers/auth/login';
import AuthRegisterCtrl from './controllers/auth/register';


import 'bulma';
import Event from './services/Event';

angular.module('starGazer', ['ui.router', 'ngMessages'])
  .config(Router)
  .controller('EventsIndexCtrl', EventsIndexCtrl)
  .controller('EventsNewCtrl', EventsNewCtrl)
  .controller('EventsShowCtrl', EventsShowCtrl)
  .controller('EventsEditCtrl', EventsEditCtrl)
  .controller('AuthLoginCtrl', AuthLoginCtrl)
  .controller('AuthRegisterCtrl', AuthRegisterCtrl)
  .service('Event', Event);
