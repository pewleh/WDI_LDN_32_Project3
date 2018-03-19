/* global navigator */

MainCtrl.$inject = ['$auth', '$state', '$rootScope', '$timeout'];

function MainCtrl($auth, $state, $rootScope, $timeout) {
  const vm = this;
  vm.isAuthenticated = $auth.isAuthenticated;

  function logout() {
    $auth.logout();
    $state.go('eventsIndex');
  }

  $rootScope.$on('flashMessage', (e, data) => {
    vm.flashMessage = data;

    $timeout(() => vm.flashMessage = null, 3000);
  });

  vm.logout = logout;
}

export default MainCtrl;
