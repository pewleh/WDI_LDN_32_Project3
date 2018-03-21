/* global navigator */

MainCtrl.$inject = ['$auth', '$state', '$rootScope', '$timeout', '$window'];

function MainCtrl($auth, $state, $rootScope, $timeout, $window) {
  const vm = this;

  vm.userId = null;
  vm.admin = null;

  function logout() {
    vm.userId = false;
    vm.admin = false;
    $auth.logout();
    $state.go('eventsIndex');
  }

  vm.logout = logout;

  $rootScope.$on('login', (e, data) => {
    vm.userId = data.content.userId;
    vm.admin = data.content.admin;
  });

  $rootScope.$on('flashMessage', (e, data) => {
    vm.flashMessage = data;

    $timeout(() => vm.flashMessage = null, 3000);
  });

  // Rootscope .$on(login/logout )
  // Broadcast stuff on auth

}

export default MainCtrl;
