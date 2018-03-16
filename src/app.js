import angular from 'angular';
import '@uirouter/angularjs';
import 'angular-messages';

<<<<<<< HEAD
import angular from 'angular';
import '@uirouter/angularjs';
import 'angular-messages';

=======
>>>>>>> development
import Router from './config/router';

import EventsIndexCtrl from './controllers/events/index';
import EventsNewCtrl from './controllers/events/new';
import EventsShowCtrl from './controllers/events/show';
import EventsEditCtrl from './controllers/events/edit';

import 'bulma';
import Event from './services/Event';

angular.module('starGazer', ['ui.router', 'ngMessages'])
  .config(Router)
  .controller('EventsIndexCtrl', EventsIndexCtrl)
  .controller('EventsNewCtrl', EventsNewCtrl)
  .controller('EventsShowCtrl', EventsShowCtrl)
  .controller('EventsEditCtrl', EventsEditCtrl)
  .service('Event', Event);
