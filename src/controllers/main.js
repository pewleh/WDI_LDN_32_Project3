/* global navigator */

MainCtrl.$inject = ['$auth', '$state', '$rootScope', '$timeout', '$cookies'];

function MainCtrl($auth, $state, $rootScope, $timeout, $cookies) {
  const vm = this;
  vm.isAuthenticated = $auth.isAuthenticated;

  vm.userId = $cookies.get('userId');
  vm.admin = $cookies.get('admin');

  function logout() {
    $cookies.remove('userId');
    $cookies.remove('admin');
    $auth.logout();
    $state.go('eventsIndex');
  }

  vm.logout = logout;

  $rootScope.$on('flashMessage', (e, data) => {
    vm.flashMessage = data;

    $timeout(() => vm.flashMessage = null, 3000);
  });

}

export default MainCtrl;
