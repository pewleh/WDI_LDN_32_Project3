/* global navigator */

MainCtrl.$inject = ['$auth', '$state', '$rootScope', '$timeout', '$cookies'];

function MainCtrl($auth, $state, $rootScope, $timeout, $cookies) {
  const vm = this;
  vm.isAuthenticated = $auth.isAuthenticated;

  vm.userId = $cookies.get('userId');
  vm.admin = $cookies.get('admin');
  
  function logout() {
    $auth.logout();
    $state.go('eventsIndex');
  }

  $rootScope.$on('flashMessage', (e, data) => {
    vm.flashMessage = data;

    $timeout(() => vm.flashMessage = null, 3000);
  });

  function log() {
    console.log($cookies);
    console.log($cookies.get('userId'));
    console.log($cookies.get('admin'));
  }

  vm.logout = logout;
  vm.log = log;
}

export default MainCtrl;
