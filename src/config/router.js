// secureState.$inject = ['$state'];
// secureState.$inject = ['$q', '$auth', '$state' ,'$rootScope'];
//
// function secureState($q, $auth, $state, $rootScope) {
//   return new $q((resolve) => {
//     if($auth.isAuthenticated()) return resolve();
//
//     $rootScope.$broadcast('flashMessage', {
//       type: 'danger',
//       content: 'You must be logged in to make changes.'
//     });
//     $state.go('login');
//   });
// }


// Router.$inject = ['$stateProvider', '$urlRouterProvider'/*, '$locationProvider'*/];
// function Router($stateProvider, $urlRouterProvider/*, $locationProvider*/) {
Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {

  // $locationProvider.html5Mode({
  //   enabled: true,
  //   requireBase: false
  // });

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
      url: '/events/:id/edit',
      templateUrl: 'views/events/edit.html',
      controller: 'EventsEditCtrl as eventsEdit'
    })
    .state('placesIndex', {
      url: '/places',
      templateUrl: 'views/places/index.html',
      controller: 'PlacesIndexCtrl as placesIndex'
    })
    .state('placesNew', {
      url: '/places/new',
      templateUrl: 'views/places/new.html',
      controller: 'PlacesNewCtrl as placesNew'
    })
    .state('placesShow', {
      url: '/places/:id',
      templateUrl: 'views/places/show.html',
      controller: 'PlacesShowCtrl as placesShow'
    })
    .state('placesEdit', {
      url: '/places/:id/edit',
      templateUrl: 'views/places/edit.html',
      controller: 'PlacesEditCtrl as placesEdit'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/auth/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/auth/register.html',
      controller: 'RegisterCtrl as register'
    });

  $urlRouterProvider.otherwise('/events');
}

export default Router;
