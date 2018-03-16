// secureState.$inject = ['$state'];

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']
;
function Router($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);


  $stateProvider
    .state('eventsIndex', {
      url: '/events',
      templateUrl: 'views/events/index.html',
      controller: 'EventsIndexCtrl as eventsIndex'
    });
  
  $urlRouterProvider.otherwise('/events');
}

export default Router;
