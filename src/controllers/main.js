/* global navigator */

MainCtrl.$inject = ['$auth', '$state', '$rootScope', '$timeout', '$window'];

function MainCtrl($auth, $state, $rootScope, $timeout, $window) {
  const vm = this;
  vm.isAuthenticated = $auth.isAuthenticated;

  vm.userId = $window.localStorage.getItem('userId');
  vm.admin = $window.localStorage.getItem('admin');

  function logout() {
    $window.localStorage.removeItem('userId');
    $window.localStorage.removeItem('admin');
    $auth.logout();
    $state.go('eventsIndex');
  }

  vm.logout = logout;

  $rootScope.$on('flashMessage', (e, data) => {
    vm.flashMessage = data;

    $timeout(() => vm.flashMessage = null, 3000);
  });

  // Rootscope .$on(login/logout )
  // Broadcast stuff on auth

}

export default MainCtrl;
