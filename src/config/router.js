// secureState.$inject = ['$state'];
secureState.$inject = ['$q', '$auth', '$state' ,'$rootScope'];

function secureState($q, $auth, $state, $rootScope) {
  return new $q((resolve) => {
    if($auth.isAuthenticated()) return resolve();

    $rootScope.$broadcast('flashMessage', {
      type: 'danger',
      content: 'You must be logged in to make changes.'
    });
    $state.go('login');
  });
}


Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']
;
function Router($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('eventsIndex', {
      url: '/events',
      templateUrl: 'views/events/index.html',
      controller: 'EventsIndexCtrl as eventsIndex'
    })
    .state('eventsNew', {
      url: '/events/new',
      templateUrl: 'views/events/new.html',
      controller: 'EventsNewCtrl as eventsNew'
    })
    .state('eventsShow', {
      url: '/events/:id',
      templateUrl: 'views/events/show.html',
      controller: 'EventsShowCtrl as eventsShow'
    })
    .state('eventsEdit', {
      url: '/events/edit/id/edit',
      templateUrl: 'views/events/edit.html',
      controller: 'EventsEditCtrl as eventsEdit'
    });

  $urlRouterProvider.otherwise('/events');
}

export default Router;
